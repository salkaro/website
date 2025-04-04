import React from 'react'
import Link from 'next/link'

const NavbarLinks = () => {
    return (
        <>
            <Link href="/write-code" className="hover:text-gray-400 transition duration-200">
                Code Online
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
