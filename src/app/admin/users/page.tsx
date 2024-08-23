"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Appdispatch } from "@/Redux/store";
import { Users } from "@/types/userType";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { blockUser, getUsers } from "@/Redux/slices/userSlice";

const Page = () => {
  const [users, SetUsers] = useState<Users[]>([]);
  const dispatch = useDispatch<Appdispatch>();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await dispatch(getUsers()).unwrap();
      if (response) {
        console.log(response);
        const sortingUser = response.data.sort((a:any, b:any) => a.id - b.id)
        SetUsers(sortingUser);
      }
    };
    fetchUsers();
  },[]);

  const handleBlockStatus = async (user_id: number, status: boolean) => {
    console.log(user_id, "user_id", status, "status");
    try {
      const response = await dispatch(blockUser({ user_id, status })).unwrap();
      if (response) {
        SetUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === user_id ? { ...user, is_blocked: status } : user
          )
        );
      }
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };
  

  return (
    <div className="px-10">
      <div className="flex justify-start mt-4 mb-6">
        <Button variant={"secondary"} className="text-xl font-extrabold">
          Users
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full text-center">
          <TableCaption>List of Users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Edit Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="text-sm">
                <TableCell className="font-normal text-lg py-2 px-4">
                  {user.email}
                </TableCell>
                <TableCell className="py-2 px-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {user.is_active ? (
                          <Button className="bg-green-400 px-2 py-1 text-sm">
                            Active now
                          </Button>
                        ) : (
                          <Button
                            variant={"destructive"}
                            className="px-2 py-1 text-sm"
                          >
                            Not Active
                          </Button>
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        {user.is_active ? (
                          <p>User verified successfully</p>
                        ) : (
                          <p>User is registered but not verified</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="py-2 px-4">
                  {user.is_blocked ? (
                    <Button
                      variant={"default"}
                      className="px-2 py-1 text-sm"
                      onClick={() => handleBlockStatus(user.id, !user.is_blocked)}
                    >
                      Unblock
                    </Button>
                  ) : (
                    <Button
                      variant={"secondary"}
                      className="px-2 py-1 text-sm"
                      onClick={() => handleBlockStatus(user.id, !user.is_blocked)}
                    >
                      Block
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Page;