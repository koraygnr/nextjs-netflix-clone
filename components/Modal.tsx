import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
} from 'react';
import Button from './Button';
import { MdClose } from 'react-icons/md';
import {
  FaCheckCircle,
  FaPlay,
  FaPlus,
  FaRegThumbsUp,
  FaVolumeMute,
  FaVolumeUp,
} from 'react-icons/fa';
import { Genre, Movie } from '@/types/types';
import ModalContext from '@/contexts/ModalContext';
import { BASE_URL } from '../utils/requests';
import { Element } from '@/types/types';
import ReactPlayer from 'react-player/lazy';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/utils/firebase';
import useAuth from '@/hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { hostname } from 'os';

interface IModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>> | any; // any??
}

function Modal({ setShowModal }: IModalProps) {
  const { currentMovie } = useContext(ModalContext);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>();
  const [muted, setMuted] = useState(true);
  const { user } = useAuth();
  const [addedToList, setAddedToList] = useState(false);
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);

  const toastStyle = {
    background: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '15px',
    borderRadius: '100px',
    maxWidth: '1000px',
  };

  useEffect(() => {
    if (!currentMovie) return;

    async function fetchMovie() {
      const data = await fetch(
        `${BASE_URL}/${currentMovie?.media_type === 'tv' ? 'tv' : 'movie'}/${
          currentMovie?.id
        }?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((res) => res.json())
        .catch((error) => console.log(error.message));

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }
    fetchMovie();
  }, [currentMovie]);

  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myList'),
        (snapshot) => setMovies(snapshot.docs)
      );
    }
  }, [db, currentMovie?.id]);

  // Check if the movie is already in the user's list
  useEffect(() => {
    setAddedToList(
      movies.findIndex((result) => result.data().id === currentMovie?.id) !== -1
    );
  }, [movies]);

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, 'customers', user!.uid, 'myList', currentMovie?.id.toString()!)
      );
      toast(
        `${
          currentMovie?.title || currentMovie?.original_name
        } has been removed from My List`,
        {
          duration: 5000,
          style: toastStyle,
        }
      );
    } else {
      await setDoc(
        doc(db, 'customers', user!.uid, 'myList', currentMovie?.id.toString()!),
        { ...currentMovie }
      );
      toast(
        `${
          currentMovie?.title || currentMovie?.original_name
        } has been added to My List`,
        {
          duration: 5000,
          style: toastStyle,
        }
      );
    }
  };

  return (
    // Modal Overlay
    <div
      className='fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-50 w-full h-full bg-black/70'
      onClick={() => setShowModal(false)}
    >
      <Toaster position='bottom-center' />
      {/* Modal Container */}
      <div
        className='fixed top-7 bg-black w-full max-w-5xl md:rounded-md'
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant='icon'
          size='icon'
          onClick={() => setShowModal(false)}
          className='absolute right-5 top-5 z-40'
        >
          <MdClose />
        </Button>

        <div className='relative pt-[56.25%]'>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width='100%'
            height='100%'
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className='absolute bottom-10 px-10 flex w-full items-center justify-between'>
            <div className='flex space-x-2'>
              <Button size='sm'>
                <FaPlay className='md:h-7 md:w-7' />
                <span>Play</span>
              </Button>
              <Button
                onClick={handleList}
                variant='icon'
                size='icon'
                className='border-2 border-gray-400 hover:border-white'
              >
                {addedToList ? <FaCheckCircle /> : <FaPlus />}
              </Button>
              <Button
                variant='icon'
                size='icon'
                className='border-2 border-gray-400 hover:border-white'
              >
                <FaRegThumbsUp />
              </Button>
            </div>
            <Button
              variant='icon'
              size='icon'
              className='border-2 border-gray-400 hover:border-white'
              onClick={() => setMuted(!muted)}
            >
              {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </Button>
          </div>
        </div>

        <div className='flex-col space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
          <div className='space-y-6 text-lg'>
            <div className='flex items-center space-x-2 text-sm'>
              <p className='font-semibold text-green-400'>
                {currentMovie?.vote_average * 10} % Match
              </p>
              <p className='font-light'>
                {currentMovie?.release_date || currentMovie?.first_air_date}
              </p>
              <div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs'>
                HD
              </div>
            </div>

            <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
              <p className='w-5/6'>{currentMovie?.overview}</p>
              <div className='flex flex-col space-y-3 text-sm'>
                <div>
                  <span className='text-[gray]'>Genres: </span>
                  {genres?.map((genre) => genre.name).join(', ')}
                </div>
                <div>
                  <span className='text-[gray]'>Original language: </span>
                  {currentMovie?.original_language.toUpperCase()}
                </div>
                <div>
                  <span className='text-[gray]'>Total votes: </span>
                  {currentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
