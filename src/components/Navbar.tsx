"use client";
import Link from "next/link";
import { ThemeToggle } from "./Themetoggle";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/Redux/store";
import { useRouter } from "next/navigation";
import { logout } from "@/Redux/slices/userSlice";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Navbar() {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.user.is_authenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    confirmAlert({
      title: 'Confirm to logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            dispatch(logout()); 
            router.push('/');
          }
        },
        {
          label: 'No,go back',
          onClick: () => {
          }
        }
      ]
    });
  };

  return (
    <nav className="border-b bg-background h-14 flex items-center">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className='flex z-60 font-semibold'>
            Compliance<span className="text-primary"> Suit</span>
          </h1>
        </Link>

        <div className="flex items-center gap-x-5">
          {isAuthenticated ? (
            <Button onClick={handleLogout}>Log out</Button>
          ) : (
            <div className="flex items-center gap-x-5">
              <Link href='/signin'>
                <Button>Sign in here</Button>
              </Link>
              <Link href='/register'>
                <Button variant="secondary">Get Started</Button>
              </Link>
              <ThemeToggle />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
