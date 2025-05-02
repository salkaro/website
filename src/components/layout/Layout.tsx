"use client"

// External Imports
import React, { Suspense, useState } from 'react'

// Local Imports
import LoadingSpinner from '../ui/LoadingSpinner'
import Footer from './Footer'
import { Separator } from '../ui/separator'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import AtlasFooter from '../atlas/AtlasFooter'


const Layout = ({ className, footerClassName, isAtlasLayout, children }: Readonly<{ className?: string, footerClassName?: string, isAtlasLayout?: boolean, children: React.ReactNode }>) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Separator orientation="vertical" className="hidden xl:block fixed top-0 2xl:left-48 min-h-screen w-px border-l border-border border-dashed z-50" />
            <Separator orientation="vertical" className="hidden xl:block fixed top-0 2xl:right-48 min-h-screen w-px border-l border-border border-dashed z-50" />
            <Separator className='fixed top-16 left-0 border-dashed' />

            {/* Navbar */}
            <div className='fixed top-0 left-0 w-full bg-(--color-off-black)/50 backdrop-blur z-50 xl:z-40 2xl:px-48 h-16'>
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            {/* Main Content */}
            <main className={`${className} min-h-screen flex flex-col p-4 justify-center items-center overflow-x-hidden mt-16 2xl:mx-48 scrollbar-hide`}>
                <Suspense fallback={<LoadingSpinner />}>
                    {children}
                </Suspense>
            </main>

            {/* Footer */}
            <div className={`${footerClassName} w-full bottom-0 mt-96 z-20`}>
                <Separator className='left-0 border-dashed' />

                {isAtlasLayout && (
                    <AtlasFooter />
                )}

                {!isAtlasLayout && (
                    <Footer />
                )}
            </div>
        </div>
    )
}

export default Layout
