"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const Page = () => {
  // State to ensure client-side rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set the state to true after component mounts
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render nothing or a placeholder on the server side
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#fffff",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
        style={{ fontSize: "1.5rem" }}
      >
        <Alert>
          <AlertTitle className="mb-10">Check your email</AlertTitle>
          <AlertDescription className="mb-20 font-semibold">
            We have sent an email to your account. Please click on the link to verify your
            account instantly.
          </AlertDescription>
          <Button className="bg-neutral-500">Didn't receive an email</Button>
        </Alert>
      </motion.p>
    </motion.div>
  );
};

export default Page;
