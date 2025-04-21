import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavbarTitle = () => {
  return (
    <div className='flex flex-row items-center gap-2'>
        <Image src="/favicon-orange.svg" width={25} height={25} alt="Image"></Image>
        <Link href="/" className='text-md font-semibold hover:text-gray-400 transition duration-200'>Salkaro</Link>
    </div>
  )
}

export default NavbarTitle
