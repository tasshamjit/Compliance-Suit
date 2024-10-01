// "use client";
// import React, { useState, ChangeEvent, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from '@/components/ui/button'; 
// import {jwtDecode} from 'jwt-decode';
// import FilterModal from '@/components/modal/FilterModal';

// const categories = ["Asset", "Liability", "Expenses", "Income", "Equity"];

// interface ClassificationResult {
//     ledger_name: string;
//     classification: string;
// }

// const UploadPage: React.FC = () => {
//     const [file, setFile] = useState<File | null>(null);
//     const [results, setResults] = useState<ClassificationResult[] | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [isEditing, setIsEditing] = useState<boolean>(false);
//     const [userId, setUserId] = useState<string | null>(null);

//     useEffect(() => {
//         // Retrieve the token from localStorage and decode it
//         console.log('use effect is working');
//         const token = localStorage.getItem('access');
//         if (token) {
//             try {
//                 const decodedToken: any = jwtDecode(token);
//                 console.log('Decoded token:', decodedToken);
//                 setUserId(decodedToken.sub); // Set the userId in state
//             } catch (error) {
//                 console.error('Failed to decode token:', error);
//             }
//         } else {
//             console.log('No token found');
//         }
//     }, []);

//     const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setFile(event.target.files[0]);
//         }
//     };

//     const handleUpload = async () => {
//         if (!file) {
//             setError("Please select a file first.");
//             return;
//         }
//         setIsLoading(true);
//         const formData = new FormData();
//         formData.append('file', file);
        
//         try {
//             const response = await axios.post(`http://localhost:8000/classify_ledgers?user_id=${userId || ''}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     // 'user_id': userId || '', // Ensure user_id is a string
//                 },
//             });
//             // Check if the response data is in the expected format
//             if (Array.isArray(response.data)) {
//                 setResults(response.data);
//             } else {
//                 throw new Error('Unexpected response format');
//             }
//             setError(null);
//         } catch (err: any) {
//             // Ensure error message is a string
//             const errorMessage = err.response?.data?.detail || 'Something went wrong!';
//             setError(typeof errorMessage === 'string' ? errorMessage : 'Unknown error');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleEditToggle = () => {
//         setIsEditing(!isEditing);
//     };

//     const handleClassificationChange = (index: number, newClassification: string) => {
//         if (results) {
//             const updatedResults = results.map((item, idx) =>
//                 idx === index ? { ...item, classification: newClassification } : item
//             );
//             setResults(updatedResults);
//         }
//     };

//     return (
//         <div className="upload-page bg-card p-6 shadow-md rounded-lg">
//             <h1 className="text-lg font-bold mb-4">Upload Trial Balance</h1>
            
//             <div className="mb-4">
//                 <a 
//                     href="/Book2.xlsx" 
//                     download 
//                     className="text-blue-500 hover:underline"
//                 >
//                     Download Example File
//                 </a>
//             </div>

//             <input type="file" onChange={handleFileChange} className="file-input mb-4" />
//             <div className="flex space-x-4">
//                 <Button onClick={handleUpload} disabled={isLoading} variant={isLoading ? 'destructive' : 'default'}>
//                     {isLoading ? 'Uploading...' : 'Upload'}
//                 </Button>
//                 <Button onClick={handleEditToggle} variant="secondary">
//                     {isEditing ? 'Save Changes' : 'Edit'}
//                 </Button>
//             </div>
//             {error && <p className="text-destructive">{error}</p>}
//             {results && (
//                 <div>
//                     <h2 className="text-lg font-semibold mt-4 mb-2">Classification Results</h2>
//                     <ul className="list-none">
//                         {results.map((item, index) => (
//                             <li key={index} className="bg-background p-2 rounded-md mb-1">
//                                 {item.ledger_name}:
//                                 {isEditing ? (
//                                     <select 
//                                         value={item.classification}
//                                         onChange={(e) => handleClassificationChange(index, e.target.value)}
//                                         className="bg-input p-2 rounded border border-border"
//                                     >
//                                         {categories.map(category => (
//                                             <option key={category} value={category}>{category}</option>
//                                         ))}
//                                     </select>
//                                 ) : (
//                                     <span> {item.classification} </span>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UploadPage;
"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import the router
import axios from 'axios';
import { Button } from '@/components/ui/button'; 
import { jwtDecode } from 'jwt-decode';
import FilterModal from '@/components/modal/FilterModal';
import api from '@/services/axios';

const categories = ["Asset", "Liability", "Expenses", "Income", "Equity"];

interface ClassificationResult {
    ledger_name: string;
    classification: string;
}

const UploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
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
            const response = await axios.post(`http://localhost:8000/classify_ledgers?user_id=${decoded_token.sub || ''}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Check if the response data is in the expected format
            if (Array.isArray(response.data)) {
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

    const handleClassificationChange = (index: number, newClassification: string) => {
        if (results) {
            const updatedResults = results.map((item, idx) =>
                idx === index ? { ...item, classification: newClassification } : item
            );
            setResults(updatedResults);
        }
    };

    return (
        <div className="upload-page bg-card p-6 shadow-md rounded-lg">
            <h1 className="text-lg font-bold mb-4">Upload Trial Balance</h1>
            
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
                <Button onClick={handleEditToggle} variant="secondary">
                    {isEditing ? 'Save Changes' : 'Edit'}
                </Button>
            </div>
            {error && <p className="text-destructive">{error}</p>}
            {results && (
                <div>
                    <h2 className="text-lg font-semibold mt-4 mb-2">Classification Results</h2>
                    <ul className="list-none">
                        {results.map((item, index) => (
                            <li key={index} className="bg-background p-2 rounded-md mb-1">
                                {item.ledger_name}:
                                {isEditing ? (
                                    <select 
                                        value={item.classification}
                                        onChange={(e) => handleClassificationChange(index, e.target.value)}
                                        className="bg-input p-2 rounded border border-border"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
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
