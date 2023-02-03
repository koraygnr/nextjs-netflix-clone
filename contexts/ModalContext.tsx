import React, { createContext, useState, Dispatch, SetStateAction } from "react"
import { DocumentData } from "firebase/firestore"
import { Movie } from "@/types/types"

interface IModalContextProvider {
   children: JSX.Element
}

interface IModalContext {
   showModal: boolean
   setShowModal: React.Dispatch<React.SetStateAction<boolean>>
   currentMovie: Movie | DocumentData | null
   setCurrentMovie: React.Dispatch<React.SetStateAction<Movie | DocumentData | null>>
}


const ModalContext = React.createContext<IModalContext>({} as IModalContext)

export const ModalContextProvider = ({ children }: IModalContextProvider) => {
   const [showModal, setShowModal] = useState(false)
   const [currentMovie, setCurrentMovie] = useState<Movie | DocumentData | null>(null)

   const values =
   {
      showModal,
      setShowModal,
      currentMovie,
      setCurrentMovie
   }

   return (
      <ModalContext.Provider value={values}>
         {children}
      </ModalContext.Provider>
   )
}

export default ModalContext