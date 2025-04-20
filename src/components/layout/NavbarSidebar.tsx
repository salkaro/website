"use client"

// External Imports
import React from 'react'
import { useState } from 'react';

// Local Imports
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const NavbarSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </>
    )
}


export default NavbarSidebar
