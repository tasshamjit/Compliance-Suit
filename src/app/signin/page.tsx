"use client";
import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "@/Redux/slices/userSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

const page = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [formData, setformData] = useState({
    email: '',
    password: '',
  });


  const handleLogin = async(e:React.FormEvent) => {
    e.preventDefault()
    try {
      await dispatch(loginUser(formData) as any);
      if (localStorage.getItem('access') && (localStorage.getItem('refresh'))){
          router.push('/dashboard')
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };


  const handleChange = (e:any) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(e.target.value)
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-items-center w-1/4 gap-2 mt-10 border-neutral-100 border-t-4 p-10 shadow-md shadow-zinc-700 rounded-md">
          <p className="font-bold text-2xl text-center mb-4">
            Login to Cmple AI
          </p>
          <Input type="email" placeholder="Email"  name="email"
            value={formData.email}
            onChange={handleChange}/>
          <Input type="password" placeholder="Password" name="password"
            value={formData.password}
            onChange={handleChange}/>
          <Button onClick={(e)=>handleLogin(e)}>Sign in</Button>
          <div className="flex justify-around">
            <Link href="/register" passHref>
              <Button variant="link" className="text-blue-500">
                click here to sign up
              </Button>
            </Link>
          </div>
          <p className="flex justify-center">or</p>
          <Button variant="secondary">
            <FcGoogle className="mr-2 mt-1" size={20} /> Sign in with Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default page;
