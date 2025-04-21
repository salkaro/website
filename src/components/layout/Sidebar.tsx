// External Imports
import React from 'react'

// Local Imports
import NavbarLinks from './NavbarLinks';


interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
}


const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
    return (
        <div
            className={`fixed z-50 bg-black top-0 right-0 h-full w-64 shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300`}
        >
            <div className="flex flex-col p-6 space-y-6 text-white font-semibold">
                {/* Close button */}
                <button
                    className="self-end focus:outline-hidden"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Navigation Links */}
                <NavbarLinks />
            </div>
        </div>
    )
}

export default Sidebar
