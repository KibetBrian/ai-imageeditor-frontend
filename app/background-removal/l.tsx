/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BGvjeihZo8Z
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function Component() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };
  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };
  const handleUpload = () => {
    setUploading(true);
    files.forEach((file, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [index]: progress,
        }));
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);
    });
    setTimeout(() => {
      setUploading(false);
      setUploadProgress({});
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div
        className="bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <UploadIcon className="w-12 h-12 text-gray-500 dark:text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
          Drag and drop your files here
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Or click to select files
        </p>
        <input
          multiple
          className="hidden"
          type="file"
          onChange={handleFileSelect}
        />
      </div>
      {files.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
            Uploaded Files
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative">
                  <img
                    alt={file.name}
                    className="w-full h-48 object-cover"
                    height={300}
                    src="/placeholder.svg"
                    width={400}
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4">
                        <div
                          className="bg-blue-500 h-4 rounded-full"
                          style={{ width: `${uploadProgress[index] || 0}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">
                    {file.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 dark:text-gray-400">
                      {file.size > 1024 * 1024
                        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                        : `${(file.size / 1024).toFixed(2)} KB`}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost">
                        <FilePenIcon className="w-5 h-5" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <TrashIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {files.length > 0 && (
            <div className="mt-8 flex justify-end">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpload}
              >
                Upload Files
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
