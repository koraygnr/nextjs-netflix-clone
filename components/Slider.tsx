import { Movie } from '@/types/types'
import React, { useEffect, useRef, useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import Thumbnail from './Thumbnail'

interface ISlider {
  title: string,
  // When using firebase
  // movie: Movie | DocumentData[]
  movies: Movie[]
}

function Slider({ title, movies }: ISlider) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: string) => {
    setIsMoved(true)    
    if (sliderRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current
      const scrollTo = direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth
      
      sliderRef.current.scrollTo({left: scrollTo, behavior:"smooth"})
    }
  }

  
  
  return (
    <div className='h-40 space-y-0.5'>
      <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#E5E5E5] transition duration-200 hover:text-white md:text-2xl'>{title}</h2>
      <div className='group relative md:-ml-2'>
        <HiChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && "hidden"}`}
          onClick={() => handleClick("left")}
        />
        <div ref={sliderRef} className='flex items-center space-x-0.5 scrollbar-hide overflow-x-scroll md:space-x-2.5 md:p-2'>
          {
            movies.map(movie => (
              <Thumbnail key={movie.id} movie={movie} />
            ))
          }
        </div>
        <HiChevronRight
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  )
}

export default Slider