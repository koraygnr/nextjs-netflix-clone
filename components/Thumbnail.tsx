import { Movie } from '@/types/types';
import Image from 'next/image';
import React, { useContext } from 'react';
import { baseUrl } from '@/constans/movie';
import ModalContext from '@/contexts/ModalContext';
import { DocumentData } from 'firebase/firestore';

interface ITumbnail {
  movie: Movie | DocumentData;
}

function Thumbnail({ movie }: ITumbnail) {
  const { setShowModal, setCurrentMovie } = useContext(ModalContext);

  const handleClick = () => {
    setShowModal(true);
    setCurrentMovie(movie);
  };

  return (
    <div
      className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'
      onClick={handleClick}
    >
      <Image
        src={`${baseUrl}/w500${movie.backdrop_path || movie.poster_path}`}
        className='object-cover rounded-sm md:rounded'
        alt='thumbnail'
        fill
        priority
        sizes='(max-width: 260px) 100vw'
      />
    </div>
  );
}

export default Thumbnail;
