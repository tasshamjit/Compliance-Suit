"use client";
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'; 

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

        try {
            const response = await axios.post('http://localhost:8000/classify_ledgers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResults(response.data);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Something went wrong!');
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
