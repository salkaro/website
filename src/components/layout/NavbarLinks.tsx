import React from 'react'
import Link from 'next/link'

const NavbarLinks = () => {
    return (
        <>
            <Link href="/write-code" className="hover:text-gray-400 transition duration-200">
                Code Online
            </Link>
            <Link href="/wordfinder" className="hover:text-gray-400 transition duration-200">
                Word Finder
            </Link>
            <Link href="/online-timer" className="hover:text-gray-400 transition duration-200">
                Online Timer
            </Link>
            <Link href="/games" className="hover:text-gray-400 transition duration-200">
                Games
            </Link>
            <Link href="/isitdown" className="hover:text-gray-400 transition duration-200">
                Website Status
            </Link>
            <Link href="/study-material" className="hover:text-gray-400 transition duration-200">
                Study Materials
            </Link>
        </>
    )
}

export default NavbarLinks
