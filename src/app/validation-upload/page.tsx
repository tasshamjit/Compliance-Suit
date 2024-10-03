"use client";

import React, { useState } from "react";
import { updateUserBusiness } from "@/Redux/slices/userSlice";
import { Button } from "@/components/ui/button";
import { Appdispatch } from "@/Redux/store";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const ValidationPage: React.FC = () => {
  const [formData, setFormData] = useState<{
    is_mainland: boolean | null;
    is_freezone: boolean | null;
    separate_books_for_mainland_and_freezone: boolean | null;
  }>({
    is_mainland: null,
    is_freezone: null,
    separate_books_for_mainland_and_freezone: null,
  });

  const dispatch = useDispatch<Appdispatch>();
  const router = useRouter();
  const [sector,setSector] = useState('')
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const handleMainlandSelection = (value: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      is_mainland: value,
    }));
    setError(null); // Clear error when selecting values
  };

  // Function to handle the selection of is_freezone
  const handleFreezoneSelection = (value: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      is_freezone: value,
    }));
    setError(null);
  };

  // Function to handle separate books selection
  const handleSeparateBooksSelection = (value: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      separate_books_for_mainland_and_freezone: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log(sector)
    if (formData.is_mainland === false && formData.is_freezone === false) {
      setError(
        "There should be at least business in either mainland or freezone."
      );
    } else if (
      formData.is_mainland === true &&
      formData.is_freezone === true &&
      formData.separate_books_for_mainland_and_freezone === false
    ) {
      setError("There should be separate books for each zone");
    } else {
      setError(null);
      // Add submission logic here
      const token: string = localStorage.getItem("access") || "";
      const decoded_token = jwtDecode<{ sub: number }>(token);
      setIsLoading(true);
      dispatch(
        updateUserBusiness({
          user_id: decoded_token.sub,
          is_mainland: formData.is_mainland,
          is_freezone: formData.is_freezone,
          separate_books_for_mainland_and_freezone:
          formData.separate_books_for_mainland_and_freezone,
          sector:sector
        })
      ).then(() => {
        setIsLoading(false);
        router.push("/upload");
      });
      setIsLoading(false);
      console.log("Form data submitted:", formData);
    }
  };

  return (
    <div className="validation-page">
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Business Information</DialogTitle>
            <DialogDescription>
              Please answer the questions below to proceed.
            </DialogDescription>
          </DialogHeader>
          {formData.is_mainland === false && formData.is_freezone === false && (
            <p className="text-red-500">
              There should be at least business in either mainland or freezone.
            </p>
          )}

          {formData.is_mainland === true &&
            formData.is_freezone === true &&
            formData.separate_books_for_mainland_and_freezone === false && (
              <p className="text-red-500">
                There should be separate books for each zone
              </p>
            )}
          <Select onValueChange={setSector}>
            <SelectTrigger className="my-4" >
              <SelectValue placeholder="which sector does your business belongs to?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="hospitality">Hospitality</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
              <SelectItem value="energy">Energy</SelectItem>
              <SelectItem value="telecommunications">
                Telecommunications
              </SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              <SelectItem value="media-entertainment">
                Media & Entertainment
              </SelectItem>
              <SelectItem value="transportation-logistics">
                Transportation & Logistics
              </SelectItem>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="consulting">Consulting</SelectItem>
            </SelectContent>
          </Select>

          <div className="my-4">
            <p className="my-4">Do you have business in mainland?</p>
            <Button
              className="mx-2"
              onClick={() => handleMainlandSelection(true)}
            >
              Yes
            </Button>
            <Button onClick={() => handleMainlandSelection(false)}>No</Button>
          </div>

          {/* Question 2: Business in freezone */}
          <div className="my-4">
            <p className="my-4">Do you have business in freezone?</p>
            <Button
              className="mx-2"
              onClick={() => handleFreezoneSelection(true)}
            >
              Yes
            </Button>
            <Button onClick={() => handleFreezoneSelection(false)}>No</Button>
          </div>

          {/* Question for separate books if both are 'Yes' */}
          {formData.is_mainland && formData.is_freezone && (
            <div className="my-4">
              <p className="my-4">
                Do you have separate books for mainland and freezone?
              </p>
              <Button
                onClick={() => handleSeparateBooksSelection(true)}
                className="mx-2"
              >
                Yes
              </Button>
              <Button
                onClick={() => handleSeparateBooksSelection(false)}
                className=""
              >
                No
              </Button>
            </div>
          )}

          <DialogFooter>
            {/* Show submit button if conditions are met */}
            {(formData.is_mainland === true || formData.is_freezone === true) &&
              (isLoading ? (
                <Button onClick={handleSubmit}>Submiting....</Button>
              ) : (
                <Button onClick={handleSubmit}>Next</Button>
              ))}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ValidationPage;
