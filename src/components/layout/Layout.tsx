// External Imports
import React, { Suspense } from 'react'

// Local Imports
import LoadingSpinner from '../ui/LoadingSpinner'
import NavbarSidebar from './NavbarSidebar'
import Footer from './Footer'


const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="flex flex-col min-h-screen w-full">
            {/* Navbar */}
            <div className='w-full p-2'>
                <NavbarSidebar />
            </div>

            {/* Main Content */}
            <main className="min-h-screen flex flex-grow flex-col p-4 justify-center items-center overflow-x-hidden">
                <Suspense fallback={<LoadingSpinner />}>
                    {children}
                </Suspense>
            </main>

            {/* Footer */}
            <div className='w-full bottom-0 mt-48'>
                <Footer />
            </div>
        </div>
    )
}

export default Layout
