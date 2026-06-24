import React, { useState } from 'react';
import axios from 'axios';

export default function FileUpload({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setError(null);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFileChange({ target: { files: e.dataTransfer.files } });
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8000/dashboard/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            onUploadSuccess(response.data);
            setIsUploading(false);
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to upload file");
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F7FB] dark:bg-[#0A0B0F] text-slate-900 dark:text-slate-50 font-sans transition-colors duration-500 relative overflow-hidden">
            
            {/*lighting layers*/}
            <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-[#4F46E5]/20 dark:bg-[#7C3AED]/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen dark:mix-blend-lighten" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-[#06B6D4]/20 dark:bg-[#22D3EE]/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen dark:mix-blend-lighten" />

            <div className="relative flex flex-col items-center justify-center px-6 py-16 min-h-screen z-10">
                
                {/* Hero Section */}
                <div className="text-center max-w-3xl mb-14">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight" style={{ fontFamily: 'Inter, SF Pro Display, sans-serif' }}>
                        <span className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] dark:from-[#7C3AED] dark:to-[#22D3EE] bg-clip-text text-transparent">
                            Transform Raw Data
                        </span>
                        <br />
                        <span className="text-slate-800 dark:text-white">
                            Into Intelligence.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium tracking-wide">
                        Initialize your AI workspace. Upload your dataset to generate predictive models and real-time visual analytics.
                    </p>
                </div>

                {/*Upload Card */}
                <div className="w-full max-w-2xl group">
                    {/*outer border effect*/}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4F46E5]/30 to-[#06B6D4]/30 dark:from-[#7C3AED]/30 dark:to-[#22D3EE]/30 rounded-[2.5rem] blur-lg opacity-0 group-hover:opacity-100 transition duration-700 ease-in-out pointer-events-none" />

                    <div 
                        className="relative bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(20,25,35,0.65)] backdrop-blur-[40px] border border-[rgba(255,255,255,0.7)] dark:border-[rgba(255,255,255,0.08)] rounded-[2rem] p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex flex-col transition-all duration-500"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <form onSubmit={handleUpload} className="w-full flex flex-col items-center">
                            {isUploading ? (
                                <div className="flex flex-col items-center justify-center py-16 gap-6">
                                    <div className="relative w-20 h-20">
                                        {/*spinner */}
                                        <div className="absolute inset-0 rounded-full border-[3px] border-slate-200 dark:border-slate-800" />
                                        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#4F46E5] dark:border-t-[#22D3EE] animate-spin" />
                                        {/* Inner glow */}
                                        <div className="absolute inset-2 bg-[#4F46E5]/10 dark:bg-[#22D3EE]/10 rounded-full blur-md animate-pulse" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Processing Dataset</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Our AI models are analyzing your structure...</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Dropzone Area */}
                                    <label 
                                        htmlFor="file-input" 
                                        className="w-full flex flex-col items-center justify-center p-10 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl bg-white/30 dark:bg-black/10 hover:bg-white/50 dark:hover:bg-black/20 hover:border-[#4F46E5]/50 dark:hover:border-[#22D3EE]/50 cursor-pointer transition-all duration-300 group/dropzone"
                                    >
                                        <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-[#F5F7FB] to-[#EEF2F7] dark:from-[#111827] dark:to-[#161B22] border border-white/50 dark:border-white/5 flex items-center justify-center text-[#4F46E5] dark:text-[#22D3EE] shadow-sm group-hover/dropzone:scale-110 group-hover/dropzone:shadow-lg transition-all duration-300">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-3 text-slate-800 dark:text-slate-100 text-center">
                                            {file ? file.name : "Drag & Drop Data"}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium text-center">
                                            {file ? "Click to replace file" : "Supports .xlsx and .xls formats for AI processing"}
                                        </p>
                                    </label>

                                    <input
                                        id="file-input"
                                        type="file"
                                        accept=".xlsx,.xls, .csv"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />

                                    {/*Error Alert */}
                                    {error && (
                                        <div className="w-full mt-6 bg-[rgba(239,68,68,0.1)] dark:bg-[rgba(239,68,68,0.05)] backdrop-blur-md border border-red-500/20 dark:border-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-xl text-center text-sm font-medium shadow-sm flex items-center justify-center gap-2 transition-all">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {error}
                                        </div>
                                    )}

                                    {/*Analyse Button */}
                                    <div className="w-full mt-8 flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={!file || isUploading}
                                            className={`relative overflow-hidden px-8 py-3.5 font-semibold text-sm tracking-wide rounded-full transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 ${
                                                !file || isUploading
                                                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-transparent'
                                                    : 'bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] dark:from-[#7C3AED] dark:to-[#22D3EE] text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] dark:shadow-[0_4px_14px_0_rgba(124,58,237,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] dark:hover:shadow-[0_6px_20px_rgba(124,58,237,0.23)] hover:-translate-y-0.5'
                                            }`}
                                        >
                                            <span>Initialize Analysis</span>
                                            {!(!file || isUploading) && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}