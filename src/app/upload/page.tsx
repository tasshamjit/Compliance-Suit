// src/pages/upload.tsx
"use client"
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const categories = ["Asset", "Liability", "Expenses", "Income", "Equity"];

interface ClassificationResult {
    ledger_name: string;
    classification: string;
}

const UploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<ClassificationResult[] | null>(null);
    const [error, setError] = useState<string | null>(null);

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
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/classify_ledgers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
            setError(null);
        } catch (err: any) { // Type assertion here
            setError(err.response?.data?.detail || 'Something went wrong!');
        }
    };

    const handleClassificationChange = (index: number, newClassification: string) => {
        if (result) {
            const updatedResult = [...result];
            updatedResult[index].classification = newClassification;
            setResult(updatedResult);
        }
    };

    const handleAddNewClassification = () => {
        if (result) {
            const newClassification: ClassificationResult = {
                ledger_name: '',
                classification: ''
            };
            setResult([...result, newClassification]);
        } else {
            setResult([{ ledger_name: '', classification: '' }]);
        }
    };

    return (
        <div>
            <h1>Upload Trial Balance</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <div>
                    <h2>Classification Results</h2>
                    <button onClick={handleAddNewClassification}>Add New Classification</button>
                    <ul>
                        {result.map((item, index) => (
                            <li key={index}>
                                <input 
                                    type="text" 
                                    value={item.ledger_name} 
                                    onChange={(e) => {
                                        const updatedResult = [...result];
                                        updatedResult[index].ledger_name = e.target.value;
                                        setResult(updatedResult);
                                    }} 
                                    placeholder="Ledger Name"
                                />
                                <select 
                                    value={item.classification} 
                                    onChange={(e) => handleClassificationChange(index, e.target.value)}
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UploadPage;
