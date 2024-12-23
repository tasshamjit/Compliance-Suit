"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import the router
import { DropdownMenuDemo } from '@/components/dropdown-menu'
import axios from 'axios';
import { Button } from '@/components/ui/button'; 
import { jwtDecode } from 'jwt-decode';
import FilterModal from '@/components/modal/FilterModal';
import api from '@/services/axios';
import { ClassificationResult,LedgerClassification } from '@/types/userType';

const categories = ["Asset", "Liability", "Expenses", "Income", "Equity"];



const UploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [ledgerclassification, setLedgerClassifications] =useState<LedgerClassification[]>([])
    const [results, setResults] = useState<ClassificationResult[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);

    const router = useRouter(); 

    useEffect(() => {

        const checkUserBusinessData = async () => {
            console.log('entering in to the userEffect')
            const token: string = localStorage.getItem("access") || "";
            const decoded_token = jwtDecode<{ sub: number }>(token);
            console.log(decoded_token.sub,'this is the user id')
            try {
              const response = await api.get("/api/user/get-user-business-data", {params:{user_id:decoded_token.sub}} ); // API call to get user business data
              console.log(response)
              const { status } = response.data; // Extract the status from the response
      
              if (status === "incomplete") {
                router.push("/validation-upload"); // Redirect to validation-upload page if status is incomplete
              }
              // Else, do nothing and stay on the current page
            } catch (error) {
              console.error("Error fetching user business data:", error);
              // Handle the error as needed, e.g., show an error message
            }
          };
      
          checkUserBusinessData();        
    }, [router]); 

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file first.");
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        const token: string = localStorage.getItem("access") || "";
        const decoded_token = jwtDecode<{ sub: number }>(token);
        
        try {
            const response = await axios.post(`http://localhost:8000/api/classification/classify_ledgers?user_id=${decoded_token.sub || ''}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Check if the response data is in the expected format
            if (Array.isArray(response.data)) {
                console.log(response.data)
                setResults(response.data);
            } else {
                throw new Error('Unexpected response format');
            }
            setError(null);
        } catch (err: any) {
            const errorMessage = err.response?.data?.detail || 'Something went wrong!';
            setError(typeof errorMessage === 'string' ? errorMessage : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleClassificationChange = async (index: number, newClassification: string,ledger_name:string) => {
        console.log('inside the handle classfication change funciton ')
        // if (results) {
        //     const updatedResults = results.map((item, idx) =>
        //         idx === index ? { ...item, classification: newClassification } : item
        //     );
        //     setResults(updatedResults);
        // }
        console.log(newClassification,ledger_name)
        setLedgerClassifications(prev => {
            // Find if the ledger_name already exists in the array
            const existingLedger = prev.find(item => item.ledger_name === ledger_name);
            
            if (existingLedger) {
                // If the ledger_name exists, update its classification
                return prev.map(item =>
                    item.ledger_name === ledger_name
                        ? { ...item, classification: newClassification }
                        : item
                );
            } else {
                // If the ledger_name doesn't exist, add a new entry
                console.log(ledger_name,newClassification);
                return [...prev, { ledger_name:ledger_name, classification: newClassification }];
            }
        });
        console.log(ledgerclassification,'thiis is the ledgerclassification list')
    };

    const handleSaveChanges = async() =>{
        const token: string = localStorage.getItem("access") || "";
        const decoded_token = jwtDecode<{ sub: number }>(token);
        console.log('this is the items we are giving to the backend')
        console.log(ledgerclassification,'this is')
        try{
            
            
            const response = await api.patch(`/api/classification/update-classification/${decoded_token.sub}/`,
                
                // ledger_classification:ledgerclassification
                [
                    { 'ledger_name': 'ASSETS', 'classification': 'Cash and Cash Equivalents' },
                    { 'ledger_name': 'Accounts Receivable', 'classification': 'Due from related parties' }
                ]
            );
            
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="upload-page bg-card p-6 shadow-md rounded-lg">
            <h1 className="text-lg font-bold mb-4">Upload Trial Balance</h1>
            {/* <DropdownMenuDemo onSelectClassification={(classification) => handleClassificationChange(index,classification)}/> */}
            <div className="mb-4">
                <a 
                    href="/Book2.xlsx" 
                    download 
                    className="text-blue-500 hover:underline"
                >
                    Download Example File
                </a>
            </div>

            <input type="file" onChange={handleFileChange} className="file-input mb-4" />
            <div className="flex space-x-4">
                <Button onClick={handleUpload} disabled={isLoading} variant={isLoading ? 'destructive' : 'default'}>
                    {isLoading ? 'Uploading...' : 'Upload'}
                </Button>
                {
                    isEditing?
                    <Button onClick={()=>handleSaveChanges()} variant="secondary">Save changes</Button>
                    :
                    <Button onClick={handleEditToggle} variant="secondary">
                    Edit
                    </Button>
                }
              
            </div>
            {error && <p className="text-destructive">{error}</p>}
            {results && (
                <div>
                    <h2 className="text-lg font-semibold mt-4 mb-2">Classification Results</h2>
                    <ul className="list-none">
                        <p>
                            
                        </p>
                        {results.map((item, index) => (
                            <li key={index} className="bg-background p-2 rounded-md mb-1">
                                {item.ledger_name}:
                                {isEditing ? (
                                    // <select 
                                    //     value={item.main_classification}
                                    //     onChange={(e) => handleClassificationChange(index, e.target.value)}
                                    //     className="bg-input p-2 rounded border border-border"
                                    // >
                                    //     {categories.map(category => (
                                    //         <option key={category} value={category}>{category}</option>
                                    //     ))}
                                    // </select>
                                    <DropdownMenuDemo  onSelectClassification={(classification) => handleClassificationChange(index, classification,item.ledger_name)}/>
                                ) : (
                                    <span> {item.classification} </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UploadPage;
