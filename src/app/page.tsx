import React from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import {RegisterLink} from '@kinde-oss/kinde-auth-nextjs/server'

export default function Home() {
  return (
    <>
      <Navbar /> {/* This includes the Navbar only on this page */}
      <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
        <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
          Compliance Suit{' '}
          <span className='text-blue-600'><br/>Tass and Hamjit</span>
        </h1>
        <RegisterLink
          className={buttonVariants({
            size: 'lg',
            className: 'mt-5',
          })}>
          Get started{' '}
          <ArrowRight className='ml-2 h-5 w-5' />
        </RegisterLink>
      </MaxWidthWrapper>
    </>
  );
}
