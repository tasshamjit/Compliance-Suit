"use client";
import React, { useState } from "react";
import {
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Select as ChakraSelect } from "@chakra-ui/react";

import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Loader from "..//../components/loader/loader";
import api from "@/services/axios";
import { jwtDecode } from "jwt-decode";
import { SelectGroup } from "@radix-ui/react-select";

interface Message {
  // role: "user" | "assistant";
  content: string;
  response: string;
}

export function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("zaid");
  const [loading, setLoading] = useState(false);

  const handleValueChange = (value: string) => {
    console.log("entering");
    setOption(value);
    console.log("Selected law:", value); // Debugging purposes
    // Here you can update more states or trigger additional actions based on the selection
  };
  // const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedValue = event.target.value;
  //   console.log("Selected law:", selectedValue); // For debugging
  //   setOption(selectedValue);
  // };
  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const userMessage: Message = { content: input, response: "" };
    setMessages([...messages, userMessage]);
    console.log(messages);

    const token: string = localStorage.getItem("access") || "";
    const decoded_token = jwtDecode<{ sub: number }>(token);

    console.log(decoded_token, "decoded token is here");

    const response = await api.get("api/assistant", {
      params: {
        query: input,
        sender: decoded_token.sub,
        option: option,
      },
    });
    setInput("");
    console.log(response, "this is just response only");
    console.log(response.data, "this is the exact response ");
    setMessages((prevMessages) =>
      prevMessages.map((message, index) =>
        index === prevMessages.length - 1
          ? { ...message, response: response.data }
          : message
      )
    );
    console.log(messages, "messages");
    setLoading(false);
  };

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <TooltipProvider>
        <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
          <div className="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
              <Triangle className="size-5 fill-foreground" />
            </Button>
          </div>
          {/* <nav className="grid gap-1 p-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg bg-muted"
                    aria-label="Playground"
                  >
                    <SquareTerminal className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Playground
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Models"
                  >
                    <Bot className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Models
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="API"
                  >
                    <Code2 className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  API
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Documentation"
                  >
                    <Book className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Documentation
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Settings"
                  >
                    <Settings2 className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Settings
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav> */}
          <nav className="mt-auto grid gap-1 p-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-auto rounded-lg"
                    aria-label="Help"
                  >
                    <LifeBuoy className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Help
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-auto rounded-lg"
                    aria-label="Account"
                  >
                    <SquareUser className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Account
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
      </TooltipProvider>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Playground</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-4" />
                <span className="sr-only">Settings</span>
                
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader>
              <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Settings
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="country">Country</Label>
                    <Select>
                      <SelectTrigger
                        id="country"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select another country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saudi-arabia">
                          Saudi Arabia
                        </SelectItem>
                        <SelectItem value="united-arab-emirates">
                          United Arab Emirates
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="law">Law</Label>

                    <Select onValueChange={setOption}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vat">Option 1</SelectItem>
                        <SelectItem value="ct">Option 2</SelectItem>
                        <SelectItem value="interact with zaid">
                          Zaid 3
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Messages
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="You are a a..." />
                  </div>
                </fieldset>
              </form>
            </DrawerContent>
          </Drawer>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
            Share
          </Button>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Settings
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger
                      id="country"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saudi-arabia">Saudi Arabia</SelectItem>
                      <SelectItem value="united-arab-emirates">
                        United Arab Emirates
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="law">Law</Label>
                  <Select>
                    <SelectTrigger
                      id="law"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select a law" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vat">VAT</SelectItem>
                      <SelectItem value="zaid">Interact with Zaid</SelectItem>
                      <SelectItem value="ct">CT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Messages
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="You are a..."
                    className="min-h-[9.5rem]"
                  />
                </div>
              </fieldset>
            </form>
            <div>
              <p className="">
                Ask any financial related doubts to cmple ai your go to
                financial AI.
              </p>
            </div>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <div className="flex-1 overflow-auto">
              {messages.map((msg, index) => (
                <div>
                  <div
                    key={index}
                    className={`p-2 my-1 rounded-md w-fit self-center text-right bg-slate-700`}
                  >
                    {msg.content}
                  </div>
                  {msg.response == "" ? (
                    <>
                      <Loader />
                    </>
                  ) : (
                    <div
                      key={index}
                      className={`p-2 my-1 rounded-md w-fit self-start text-left bg-blue-400 mb-6`}
                    >
                      {msg.response}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              onSubmit={handleSendMessage}
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="flex items-center p-3 pt-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
