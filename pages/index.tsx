import Banner from '@/components/Banner';
import Modal from '@/components/Modal';
import Slider from '@/components/Slider';
import { Movie } from '@/types/types';
import requests from '@/utils/requests';
import { useContext, useEffect } from 'react';
import ModalContext from '@/contexts/ModalContext';
import useAuth from '@/hooks/useAuth';
import useList from '@/hooks/useList';
import { useRouter } from 'next/router';

interface IProps {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

function Home({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: IProps) {
  const { showModal, setShowModal } = useContext(ModalContext);
  const { user, isLoading } = useAuth();
  const list = useList(user?.uid);
  const router = useRouter()

  // if (!user) {
  //   router.push('/login');
  // }


  return (
    <div className='relative h-screen bg-gradient-to-b lg:h-[140vh]'>
      <div className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals} />
        <section className='md:space-y-24'>
          <Slider title='Trending Now' movies={trendingNow} />
          <Slider title='Top Rated' movies={topRated} />
          <Slider title='Action Thrillers' movies={actionMovies} />
          {/* My List Component */}
          {list.length > 0 && <Slider title='My List' movies={list} />}
          <Slider title='Comedies' movies={comedyMovies} />
          <Slider title='Scary Movies' movies={horrorMovies} />
          <Slider title='Romance Movies' movies={romanceMovies} />
          <Slider title='Documentaries' movies={documentaries} />
        </section>
      </div>
      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
  );
}

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
