"use client"
import axios from "axios"
import React from 'react'
import { useState } from 'react';
export default function Alzheimer() {
    const [userSelectedFile, setUserSelectedFile] = useState(null);
    const tempurl = process.env.GOJORADIXURL;
    const  ACK = process.env.api_key;
    const [leftImage, setLeftImage] = useState<any>(null);

    // user changes the file 
    function onFileChange(event: any) {
        setUserSelectedFile(event.target.files[0]);
        console.log(userSelectedFile)
    }
    //on Process 
    async function onProcess() {
        if (!leftImage) {

          return;
        } else {

        console.log("ran on process funciton")
    
          const response = await axios({
            method: "POST",
            url:process.env.tempurl,
            params: {
              api_key:process.env.ACK,
            },
            data: leftImage,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
    
          if (response.data) {
            console.log("got response");
          } 
        }
      }


    //user uploaded a file
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
            setLeftImage(base64Data);
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
                Upload file
            </button>
             <button onClick={onProcess}>
                Processing file
            </button>
            <div>
                <div className="bg-slate-100 flex justify-center items-center py-5 h-full border-black border-4 rounded-lg">
                    <img
                        className="mt-8 w-min h-96"
                        src={`data:image/jpeg;base64,${leftImage}`}
                        alt="Uploaded"
                    />
                </div>
            </div>
        </div>
    )
}
