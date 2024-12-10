// External Imports
import React from 'react'

// Local Imports
import NavbarSidebar from './NavbarSidebar'
import Footer from './Footer'


const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
		<div className="flex flex-col min-h-screen w-full">
			{/* Navbar */}
			<div className='stick top-0 p-2'>
				<NavbarSidebar />
			</div>
            
			{/* Main Content */}
			<main className="min-h-screen flex flex-grow flex-col p-4 justify-center items-center">{children}</main>

            {/* Footer */}
            <div className='stick bottom-0 mt-48'>
				<Footer />
			</div>
        </div>
    )
}

export default Layout
