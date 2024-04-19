"use client"
import axios from "axios"
import React from 'react'
import { useState } from 'react';
export default function Alzheimer() {
    const [userSelectedFile, setUserSelectedFile] = useState(null);
    const [inference , setInference] = useState("you will see the prediction here")

    const ACK = process.env.api_key;
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
                url: "https://detect.roboflow.com/mri-detection-synapse/1",
                params: {
                    api_key:"MDUmhShkcQTpnD7H6ZtL",
                },
                data: leftImage,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            if (response.data) {
                console.log("got response");
                setInference(JSON.stringify(response.data))
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
        <div className="bg-white">
            <h1>image input box</h1>
            <div>
                <div className="flex flex-row h-3/5 justify-between items-stretch py-10 px-10 space-x-20 ">
                    <div className="w-1/2 flex flex-col text-center justify-center space-y-3">
                        <div className="rounded-lg border-black border-4 text-xl bold font-mono font-bold bg-slate-100">
                            <h1>findings</h1>
                        </div>

                        <div>

                        </div>


                        <div className="bg-slate-100 flex justify-center items-center py-5 h-full border-black border-4 rounded-lg">
                            {!leftImage ? (
                                <img className="w-96 h-96" src="https://uxwing.com/wp-content/themes/uxwing/download/file-and-folder-type/file-upload-icon.png" />
                            ) : (
                                <img


                                
                                    className="mt-8 w-min h-96"
                                    src={`data:image/jpeg;base64,${leftImage}`}
                                    alt="Uploaded"
                                />
                            )}
                        </div>
                    </div>

                    <div className="w-1/2 flex flex-col text-center justify-center space-y-3">
                        <div className="rounded-lg border-black border-4 text-xl bold font-mono font-bold bg-slate-100">
                            <h1>diagnosis Result</h1>
                        </div>
                        <div className="bg-slate-100 flex justify-center items-center  h-full border-black border-4 rounded-lg overflow-y-scroll ">
                            {inference}
                        </div>
                    </div>
                </div>
            </div>


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

            </div>
        </div>
    )
}
