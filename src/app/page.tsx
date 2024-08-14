import React from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import {RegisterLink} from '@kinde-oss/kinde-auth-nextjs/server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation';
// import ClientLayout from "./clientLayout";

export const metadata: Metadata = {
  title: "Home Page Title",
  description: "Description for the home page",
};

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if(await isAuthenticated()) {
    return redirect('/dashboard')
  }
  return (

      <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
        <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
          Compliance Suit{' '}
          <span className='text-blue-600'><br/>Tass and Hamjit</span>
        </h1>
        <Link href='/register'
          className={buttonVariants({
            size: 'lg',
            className: 'mt-5',
          })}>
          Get started{' '}
          <ArrowRight className='ml-2 h-5 w-5' />
        </Link>
      </MaxWidthWrapper>

  );
}
