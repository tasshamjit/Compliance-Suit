"use client";
import React, { useEffect, useState } from "react";
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
import Loader from "../../components/loader/loader";
import api from "@/services/axios";
import { jwtDecode } from "jwt-decode";
import { SelectGroup } from "@radix-ui/react-select";

interface Message {
  // role: "user" | "assistant";
  content: string;
  response: string;
}


export default function sample() {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("zaid");
  const [loading, setLoading] = useState(false);
    useEffect(()=>{
      console.log('there is change in option')
    },[option])
  const handleValueChange = (value: string) => {
    console.log("entering");
    setOption(value);
    console.log("Selected law:", value); // Debugging purposes
    // Here you can update more states or trigger additional actions based on the selection
  };
  
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

  console.log(selectedValue)

  return (
    <>
  <div className="max-w-4xl mx-auto p-4 space-y-6 h-screen">
    <div className="relative flex flex-col h-full rounded-xl bg-muted/50 p-6 lg:col-span-2 shadow-lg">
    <h1 className="text-white font-bold text-2xl animate-bounce">Ask anything</h1>
    <Select onValueChange={(value)=>{
      console.log('value is changing', value) 
      setOption(value)}}>
      <SelectTrigger className="w-full md:w-1/2 mx-auto">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ct">CT</SelectItem>
        <SelectItem value="vat">VAT</SelectItem>
        <SelectItem value="zaid">Zaid</SelectItem>
      </SelectContent>
    </Select>
      {/* Scrollable messages section */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, index) => (
          <div key={index} className="space-y-2">
            <div className="self-center bg-slate-700 text-white p-3 rounded-md w-fit ml-auto">
              {msg.content}
            </div>
            {msg.response === "" ? (
              <Loader />
            ) : (
              <div className="self-start bg-blue-400 text-white p-3 rounded-md w-fit mr-auto">
                {msg.response}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message input form */}
      <form
        className="relative mt-4 flex flex-col border rounded-lg p-3 bg-background focus-within:ring-1 focus-within:ring-ring"
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
        <div className="flex items-center mt-3 gap-1">
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="w-5 h-5" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
          </TooltipProvider> */}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Mic className="w-5 h-5" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  </div>
</>


  );
}