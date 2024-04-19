"use client"
import React from 'react'
import { useState } from 'react';
export default function Alzheimer() {


    const [userSelectedFile, setUserSelectedFile] = useState(null);
    function onFileChange(event: any) {
        setUserSelectedFile(event.target.files[0]);
        console.log(userSelectedFile)
    }
    async function onFileUpload() {
        if (!userSelectedFile) {
            return;
        }
        console.log("File upload started");
        const reader = new FileReader();
        reader.onload = function () {
            let base64Data = reader.result
            // @ts-ignore
            base64Data = base64Data.replace(/^data:image\/[a-z]+;base64,/, "");
            console.log(base64Data)

        };
        reader.readAsDataURL(userSelectedFile);
    }


    return (
        <div>
            <h1>image input box</h1>
            <input
                className="bg-slate-950 text-white w-30 px-4 py-2 rounded mx-4"
                type="file"
                onChange={onFileChange}
            />
            <button onClick={onFileUpload}>
                Process
            </button>
        </div>
    )
}
