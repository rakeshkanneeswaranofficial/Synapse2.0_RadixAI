import React from 'react';

const   Progressbar = ({ c1, c2, c3, c4 }: { c1: string, c2: string, c3: string, c4: string }) => {

    console.log(c1, c2, c3, c4);
    return (
        <ol className="flex items-center">
        <li className="relative w-full mb-6">
            <div className="flex items-center">
                <div className={`z-10 flex items-center justify-center w-6 h-6 bg-${c1} rounded-full ring-0 ring-white  sm:ring-8 dark:ring-gray-900 shrink-0`}>
                    <svg className="w-2.5 h-2.5 text-blue-100  dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                </div>
                <div className={`flex w-full bg-${c2} h-0.5 `}></div>
            </div>
            <div className="mt-3">
                <h3 className="font-medium text-white">File uploaded</h3>
            </div>
        </li>
        <li className="relative w-full mb-6">
            <div className="flex items-center">
                <div className={`z-10 flex items-center justify-center w-6 h-6 bg-${c2}  rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0`}>
                    <svg className="w-2.5 h-2.5 text-blue-100  dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                </div>
                <div className={`flex w-full bg-${c3}  h-0.5 `}></div>
            </div>
            <div className="mt-3">
                <h3 className="font-medium text-white ">Processing Image</h3>
            </div>
        </li>
        <li className="relative w-full mb-6">
            <div className="flex items-center">
                <div className={`z-10 flex items-center justify-center w-6 h-6 bg-${c3} rounded-full ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0`}>
                    <svg className="w-2.5 h-2.5 text-blue-100 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                </div>
                <div className={`flex w-full bg-${c4} h-0.5 `}></div>
            </div>
            <div className="mt-3">
                <h3 className="font-medium text-white ">Performing diagnosis</h3>
            </div>
        </li>
        <li className="relative w-full mb-6">
            <div className="flex items-center">
                <div className={`z-10 flex items-center justify-center w-6 h-6 bg-${c4} rounded-full ring-0 ring-white  sm:ring-8 dark:ring-gray-900 shrink-0`}>
                    <svg className="w-2.5 h-2.5 text-blue-100 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                </div>
            </div>
            <div className="mt-3">
                <h3 className="font-medium text-white ">Compiling results</h3>
            </div>
        </li>
    </ol>
    );
};

export default Progressbar;
