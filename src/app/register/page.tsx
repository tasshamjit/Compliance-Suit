"use client";
import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { RootState, Appdispatch } from "@/Redux/store";
import { registerUser } from "@/Redux/slices/userSlice";
import type { TypedUseSelectorHook } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import {Form, useFormik} from 'formik'
import  {ProgressBar} from 'react-loader-spinner'
import  {Oval} from 'react-loader-spinner'
import validationSchema from "@/schemas/registrationSchmea";
import { selectLoading } from "@/Redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from 'next/navigation';

const RegisterPage:React.FC = () => {

  const dispatch = useDispatch<Appdispatch>();
  const { error } = useSelector((state: RootState) => state.user);
  const loading = useSelector(selectLoading)
  const [isMounted,setIsMounted] = useState(false)
  const router = useRouter()
  interface FormValues {
    email: string,
    password: string
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema:validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("registsering user is here")
        const result = await dispatch(registerUser(values)).unwrap();
        if (result.success) {
          router.push('/register/successPage')
        }
        router.push('/register/successPage')


      } catch (error) {
        console.log("this is the error",error)
      }
    } })
  

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <form onSubmit={formik.handleSubmit} className="flex flex-col justify-items-center w-1/4 gap-2 mt-10 border-neutral-100 border-t-4 p-10 shadow-md shadow-zinc-700 rounded-md">
          <p className="font-bold text-2xl text-center mb-4">Join CmpleAI today</p>
          <Input type="email" placeholder="Email"   {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null} 
          <Input type="password" placeholder="Password"  {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
        {loading?
        <Button variant="ghost"><Oval height={30} width={30} color="#FFFFFF" secondaryColor=''/></Button>
        :
          <Button type="submit">Sign up</Button>}
          <div className="flex justify-around">
            <Link href='/signin' passHref>
            <Button variant="link" className="text-blue-500">{'click here to sign in'}</Button>
            </Link>
          </div>
          <p className="flex justify-center">or</p>
          <Button variant="secondary">
            <FcGoogle className="mr-2 mt-1" size={20} /> Sign up with Google{" "}
          </Button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
