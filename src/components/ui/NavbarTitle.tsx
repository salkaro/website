import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavbarTitle = () => {
  return (
    <div className='flex flex-row items-center gap-2'>
        <Image src="/favicon-orange.svg" width={40} height={40} alt="Image"></Image>
        <Link href="/" className='text-lg hover:text-gray-400 transition duration-200'>Salkaro</Link>
    </div>
  )
}

export default NavbarTitle
