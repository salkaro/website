import React from 'react'
import Link from 'next/link'

const NavbarLinks = () => {
    return (
        <>
            <Link href="code-demos" className="hover:text-gray-400 transition duration-200">
                Code Demos
            </Link>
            <Link href="https://github.com/salkaro" className="hover:text-gray-400 transition duration-200" target="blank_">
                Github
            </Link>
        </>
    )
}

export default NavbarLinks
