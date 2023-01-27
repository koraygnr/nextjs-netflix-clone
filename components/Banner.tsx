import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Movie } from '@/types/types'
import { baseUrl } from '@/constans/movie'
import Button from './Button'
import { FaPlay } from "react-icons/fa"
import { HiInformationCircle } from "react-icons/hi"

interface IProps {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: IProps) {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  }, [netflixOriginals])
   
  return (
    <div className='flex flex-col space-y-4 py-16 transition-all lg:h-[65vh] lg:justify-end lg:pb-12'>
      <div className='absolute top-0 left-0 h-[95vh] w-screen -z-10'>
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt="banner"
          fill
          className='object-cover'
        />
      </div>

      <h1 className='text-2xl font-bold md:text-4xl lg:text-7xl '>{movie?.title || movie?.name || movie?.original_title}</h1>
      <p className='max-w-xs text-xs drop-shadow-sm md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl '>{movie?.overview}</p>

      <div className='flex space-x-3'>
          <Button className="bg-white text-black">
            <FaPlay className='md:h-7 md:w-7'/>
            <span>Play</span>
          </Button>
          <Button className='bg-[gray]/70 text-white'>
            <p>More Info</p>
            <HiInformationCircle className='h-5 w-5 md:h-7 md:w-7'/>
          </Button>
      </div>

    </div>
  )
}

export default Banner