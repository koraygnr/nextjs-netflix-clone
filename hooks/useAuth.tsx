import React, { useState, useEffect, createContext, useContext, useMemo } from 'react'
import { useRouter } from 'next/router'
import {
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signOut,
   User
} from "firebase/auth"
import { auth } from '@/utils/firebase'

interface IAuth {
   user: User | null
   signUp: (email: string, password: string) => Promise<void>
   signIn: (email: string, password: string) => Promise<void>
   logout: () => Promise<void>
   error: string | null
   isLoading: boolean
}

const AuthContext = createContext<IAuth>({
   user: null,
   signUp: async () => {},
   signIn: async () => {},
   logout: async () => {},
   error: null,
   isLoading: false,
})


interface IAuthProviderProps {
   children: React.ReactNode
}

export const AuthProvider = ( {children}:IAuthProviderProps ) => {
   const [ user, setUser ] = useState<User | null>(null)
   const [ isLoading, setIsLoading ] = useState(false)
   const [ initialLoading, setInitialLoading ] = useState(false) // true 
   const [ error, setError ] = useState(null)
   const router = useRouter()


   useEffect(() => (
      onAuthStateChanged(auth, (user) => {
         if(user) {
            // Logged in
            setUser(user)
            router.push("/") 
            setIsLoading(false)
         } else {
            // Not logged in
            setUser(null)
            setIsLoading(true)
            router.push("/login") 
         }
         setInitialLoading(false)
      })
   ),[auth])

   const signUp = async (email: string, password: string) => {
      setIsLoading(true)
      await createUserWithEmailAndPassword(auth, email, password)
         .then((res) => {
            setUser(res.user)
            router.push("/")
            setIsLoading(false)
         })
         .catch((error) => alert(error.message))
         .finally(() => setIsLoading(false))
   }

   const signIn = async (email: string, password: string) => {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
         .then((res) => {
            setUser(res.user)
            router.push("/")
            setIsLoading(false)
         })
         .catch((error) => alert(error.message))
         .finally(() => setIsLoading(false))
   }

   const logout = async () => {
      setIsLoading(true)
      await signOut(auth)
         .then(() => setUser(null))
         .catch((error) => alert(error.message))
         .finally(() => setIsLoading(false))
   }

   const memoedValue = useMemo(()=> ({ 
      user, signUp, signIn, isLoading, logout, error
   }),[user, isLoading])

   return (
      <AuthContext.Provider value={memoedValue}>
         { !initialLoading &&  children}
      </AuthContext.Provider>
   )
}

export default function useAuth() {
   return useContext(AuthContext)
}