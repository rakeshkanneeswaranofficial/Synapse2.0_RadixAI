import React from 'react';

export default function TextSkeleton() {
    return (
        <div>
            <div role="status" className="animate-pulse">
                {/* Increase the height and width of these skeleton elements */}
                <div className="h-6 rounded-full bg-gray-300 w-96 mb-4"></div>
                <div className="h-6 rounded-full bg-gray-300 w-96 mb-4"></div>
                <div className="h-6 rounded-full bg-gray-300 w-96 mb-4"></div>
                <div className="h-6 rounded-full bg-gray-300 w-96 mb-4"></div>
                <p className='text-gray-300'>waiting for the response....</p>
                <div className="h-6 rounded-full bg-gray-300 w-96 mb-4"></div>
                <div className="h-6 rounded-full bg-gray-300 w-96 mb-4"></div>
                <div className="h-6 rounded-full bg-gray-300 w-96 mb-4"></div>
                <div className="h-6 rounded-full bg-gray-300 w-96 mb-4"></div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
