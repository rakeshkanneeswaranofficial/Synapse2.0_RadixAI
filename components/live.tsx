import React from 'react'

export default function Live() {
    return (
        <div className='animate-pulse'>
            <ul role="list" className="max-w-sm divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                            Conneted to Server
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    )
}
