import React from 'react'
import Link from 'next/link'

const NavbarLinks = () => {
    return (
        <>
            <Link href="/coding-learn" className="hover:text-gray-400 transition duration-200">
                Learn To Code
            </Link>
            <Link href="/study-material" className="hover:text-gray-400 transition duration-200">
                Study Materials
            </Link>
            <Link href="/code-demos" className="hover:text-gray-400 transition duration-200">
                Code Demos
            </Link>
        </>
    )
}

export default NavbarLinks
