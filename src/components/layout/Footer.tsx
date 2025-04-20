import Link from 'next/link'
import React from 'react'


interface FooterlinkProps {
    text: string;
    href: string;
    target?: string | undefined;
}

const FooterLink: React.FC<FooterlinkProps> = ({ text, href, target }) => {
    return (
        <Link className="hover:underline text-center" href={href} target={target}>{text}</Link>
    );
}

const FooterColumn = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className='col-span-1 text-center flex flex-col gap-3'>{children}</div>
    )
}

const Footer = () => {
    return (
        <footer className='w-full bg-darkGrey text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-16 gap-8 mt-96'>
            {/* About Section */} 
            <FooterColumn>
                <FooterLink text="About Us" href="/about" />
                <FooterLink text="Attributions" href="/attributions" />
                <FooterLink text="Privacy Policy" href="/privacy-policy" />
                <FooterLink text="FAQs" href="/faq" />
            </FooterColumn>

            {/* Resources Section */}
            <FooterColumn>
                <FooterLink text="Flippify" href="https://flippify.io?ref=salkaro" />
                <FooterLink text="Discord" href="https://discord.gg/aHXVSMkmpk" />
                <FooterLink text="Code Online" href="/write-code" />
                <FooterLink text="Copy Text" href="/copy-text?p=Paste%20Your%20Text" />
            </FooterColumn>

            {/* Other websites Section */}
            <FooterColumn>
                <FooterLink text="Is It Down?" href="https://isitdown.salkaro.com" />
                <FooterLink text="Games" href="https://games.salkaro.com" />
                <FooterLink text="Study" href="/study-materials" />
                <FooterLink text="Word Finder" href="https://wordfinder.salkaro.com" />
            </FooterColumn>

            {/* Social Media Section */}
            <FooterColumn>
                <FooterLink target="_blank" text="Github" href="https://github.com/salkaro" />
                <FooterLink target="_blank" text="Twitter" href="https://x.com/_itsnickjames" />
                <FooterLink target="_blank" text="LinkedIn" href="https://www.linkedin.com/in/nickjames-info/" />
                <FooterLink target="_blank" text="Instagram" href="https://www.instagram.com/_flippify" />
            </FooterColumn>
        </footer>
    )
}



export default Footer

