"use client";
import Link from "next/link";
import { ThemeToggle } from "./Themetoggle";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/Redux/store";
import { useRouter } from "next/navigation";
import { logout } from "@/Redux/slices/userSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Navbar() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.is_authenticated
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    confirmAlert({
      title: "Confirm to logout",
      message: "Are you sure you want to log out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(logout());
            router.push("/");
          },
        },
        {
          label: "No,go back",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <nav className="border-b bg-background h-14 flex items-center">
      <Link href="/">
        <h1 className="flex z-60 font-semibold mx-10">
          Compliance<span className="text-primary"> Suit</span>
        </h1>
      </Link>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-x-5">
          {isAuthenticated ? (
            <>
              <div className="flex flex-row gap-5">
                <Link href="/dashboard">
                  <p>Dashboard</p>
                </Link>
                <Link href="/chatbot">
                  <p>Chat bots</p>
                </Link>
                <Link href="/upload">
                  <p>Classification of ledgers</p>
                </Link>
              </div>
              <Button onClick={handleLogout}>Log out</Button>
            </>
          ) : (
            <div className="flex items-center gap-x-5">
              <Link href="/signin">
                <Button>Sign in here</Button>
              </Link>
              <Link href="/register">
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
