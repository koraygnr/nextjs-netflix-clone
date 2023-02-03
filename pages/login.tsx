import React from 'react'
import Logo from '@/assets/Logo'
import Image from 'next/image'
import bgImage from "../assets/bgImage.jpg"
import Button from '@/components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/router'

interface IForm {
  email: string,
  password: string
}

function login() {
  const { signIn } = useAuth()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<IForm>()
  
  const onSubmit: SubmitHandler<IForm> = async ({ email, password }) => {
    await signIn( email, password )
  }

  return (
    <div className='relative flex flex-col w-screen h-screen bg-black md:items-center md:justify-center md:bg-transparent'>
      <Image
        src={bgImage}
        className="-z-10 object-cover opacity-60 hidden sm:!inline"
        alt="bgImage"
        fill
        priority
      />
      <div className='absolute left-4 top-4 cursor-pointer'>
        <Logo width={167} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative mt-24 space-y-8 bg-black/75 py-10 px-6 rounded md:mt-8 md:max-w-md md:px-14'
      >
        <h1 className='text-3xl font-medium'>Sign In</h1>
        <div className='space-y-4'>
          <label className='inline-block w-full'>
            <input
              type="email"
              placeholder='Email'
              className='input'
              {...register("email", { required: true })}
            />
            { errors.email && (
              <p className='p-1 text-[13px] text-orange-500'>
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className='inline-block w-full'>
            <input
              type="password"
              placeholder='Password'
              className='input'
              {...register("password", { required: true })}
            />
            { errors.password && (
              <p className='p-1 text-[13px] text-orange-500'>
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <Button
          type='submit'
          colors="red"
          fullWidth
        >
          Sign In
        </Button>

        <div className='flex space-x-2'>
          <p className='text-[gray]'>New to Netflix?</p>
          <button
            type='button'
            className='font-medium hover:underline'
            onClick={() => router.push("/signup")}
          >
            Sign up now
          </button>
        </div>
      </form>

    </div>
  )
}

export default login