import { Movie } from '@/types/types'
import Image from 'next/image'
import React from 'react'
import { baseUrl } from '@/constans/movie'

interface ITumbnail {
   // When using firebase
   // movie: Movie | DocumentData
   movie: Movie
}

function Thumbnail({ movie }: ITumbnail) {
   return (
      <div className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'>
         <Image
            src={`${baseUrl}/w500${movie.backdrop_path || movie.poster_path}`}
            className='object-cover rounded-sm md:rounded'
            alt="thumbnail"
            fill
            priority
            sizes='(max-width: 260px) 100vw'
         />
      </div>
   )
}

export default Thumbnail