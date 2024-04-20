"use client"
import Textskeleton from "@/components/textskeleton";
import Chart, { ArcElement } from 'chart.js/auto';
import BarChartWithPredictions from "@/components/piechart";
Chart.register(ArcElement);
import { Button } from "@/components/ui/button";
import PDFile from "@/components/pdfmaker";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Progressbar from "@/components/progressbar";
import Live from "@/components/live";

const api_key = "MDUmhShkcQTpnD7H6ZtL"
// const roboURL = "https://detect.roboflow.com/mri-detection-synapse/1"
const roboURL = "https://detect.roboflow.com/alzheimer-detection-synapse-29dth/2"
const segmentationURL = "https://l02lxkvf-3030.inc1.devtunnels.ms/alzhimer"
type Prediction = {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
  class_id: number;
  detection_id: string;
};
// Define a type for the entire predictions object (myobject.predictions)
type PredictionsData = Prediction[];
export default function BrainTumor() {
  //defining the states
  const [userSelectedFile, setUserSelectedFile] = useState(null);
  const [status, setStatus] = useState(false)
  const [colorObject, setColorObject] = useState({
    c1: "red-400",
    c2: "red-400",
    c3: "red-400",
    c4: "red-400",
  })
  const [chardata, setChartData] = useState<PredictionsData>(
    [
      {
        "x": 369.5,
        "y": 440.5,
        "width": 75,
        "height": 97,
        "confidence": 0.8977515697479248,
        "class": "CN",
        "class_id": 0,
        "detection_id": "22045ad0-6335-42d6-a324-e7c64ab54e03"
      },
      // Additional predictions...
    ]
  )
  const [robochartres, Setrobochartres] = useState<PredictionsData>(
    [
      {
        "x": 369.5,
        "y": 440.5,
        "width": 75,
        "height": 97,
        "confidence": 0.8977515697479248,
        "class": "CN",
        "class_id": 0,
        "detection_id": "22045ad0-6335-42d6-a324-e7c64ab54e03"
      },
      // Additional predictions...
    ]
  )
  const [leftImage, setLeftImage] = useState<any>(null);
  const [inference, setInference] = useState<any>(" The diagnosis result will be displayed here after the image processing is completed. Once the analysis is done, you will see detailed findings and insights.");
  const [roboflowResponse, setRoboflowResponse] = useState<any>(null);
  const [skeleton, setSkeleton] = useState<any>(<Textskeleton></Textskeleton>);

  useEffect(() => {
    async function segmentationFunction() {
      if (!leftImage || !roboflowResponse) {
        console.log(
          "Either left image is not available or roboflow response is not available"
        );
      } else {
        console.log("segmentation function ran");
        const response = await axios({
          method: "POST",
          url: segmentationURL,
          data: {
            base64: leftImage,
            disease: "Brain Tumor",
            predictions: roboflowResponse,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        setColorObject({
          c1: "green-400",
          c2: "green-400",
          c3: "green-400",
          c4: "green-400",

        })

        console.log(response.data);
        setLeftImage(response.data.base64);
        console.log(leftImage);
        setInference(response.data.inference);
        setChartData(robochartres);
        setStatus(true);
      }
    }

    segmentationFunction();
  }, [roboflowResponse]);

  function onFileChange(event: any) {
    setUserSelectedFile(event.target.files[0]);
    console.log(setUserSelectedFile);
    setStatus(false)


    // Reset coordinates when a new file is selected
  }

  async function onProcess() {
    if (!leftImage) {
      toast.error("Please upload a file before processing ");
      return;
    } else {

      const response = await axios({
        method: "POST",
        url: roboURL,
        params: {
          api_key: api_key,
        },
        data: leftImage,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data) {
        toast.success("received Model Response");
        toast.info("request sent to segmentation server ");
        console.log(response.data);
        setRoboflowResponse(JSON.stringify(response.data));
        setInference(skeleton)
        Setrobochartres(response.data.predictions)
        setColorObject({
          c1: "green-400",
          c2: "green-400",
          c3: "red-500",
          c4: "red-500",

        })

      } else {
        toast.error("something went wrong with the model");
      }
    }
  }

  async function onFileUpload() {
    if (!userSelectedFile) {
      toast.error("Select a file before uploading.");
      return;
    }

    console.log("File upload started");

    const reader = new FileReader();

    // Add an event listener to handle the completion of the read operation
    reader.onload = function () {
      let base64Data = reader.result;

      if (!base64Data) {
        toast.error("Please select a valid image file.");
      } else {
        // @ts-ignore
        base64Data = base64Data.replace(/^data:image\/[a-z]+;base64,/, "");
        setLeftImage(base64Data);
        setInference(null);
        setColorObject({
          c1: "green-400",
          c2: "red-400",
          c3: "red-400",
          c4: "red-400",

        })
      }
    };
    // Read the file as a data URL
    reader.readAsDataURL(userSelectedFile);
  }
  return (
    <div className="flex flex-col h-screen bg-gray-400 ">
      <div className="pt-6 pl-20  bg-black ">
        <Progressbar c1={colorObject.c1} c2={colorObject.c2} c3={colorObject.c3} c4={colorObject.c4} ></Progressbar>
      </div>
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

      <div className="flex flex-row space-y-4 justify-around">
        <input
          className="bg-slate-950 text-white w-30 px-4 py-2 rounded mx-4"
          type="file"
          onChange={onFileChange}
        />
        <div>

        </div>
        <Button variant={"default"} onClick={onFileUpload}> <h1 className="text-xl">Upload Image
        </h1> </Button>
        <Button variant={"default"} onClick={onProcess}><h1 className="text-xl">Process Image
        </h1></Button>
        {status && (
          <PDFDownloadLink document={<PDFile findings={inference} base64Data={leftImage} title="Brain Tumor Report" />} fileName="Report.pdf">
            {({ loading }) => (loading ? <button>Loading doc</button> : <button>Download Now</button>)}
          </PDFDownloadLink>
        )}
      </div>
      <div className="text-center justify-center mt-3 pt-10  border-t-black bg-slate-50 border-t-4  text-4xl">
        <h1>Analytics</h1>
      </div>
      <div className="h-96 pb-10 flex justify-center  pt-10 bg-slate-50 ">

        <BarChartWithPredictions predictions={chardata} />
      </div>
    </div>
  );
}
