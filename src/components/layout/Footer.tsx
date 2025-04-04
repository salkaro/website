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
        <footer className='w-full bg-darkGrey text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-16 gap-8'>
            {/* About Section */} 
            <FooterColumn>
                <FooterLink text="About Us" href="/about" />
                <FooterLink text="Attributions" href="/attributions" />
                <FooterLink text="Careers" href="/careers" />
                <FooterLink text="Privacy Policy" href="/privacy" />
            </FooterColumn>

            {/* Resources Section */}
            <FooterColumn>
                <FooterLink text="Blog" href="/blog" />
                <FooterLink text="Help Center" href="/help" />
                <FooterLink text="FAQs" href="/faq" />
                <FooterLink text="Documentation" href="/docs" />
            </FooterColumn>

            {/* Contact Section */}
            <FooterColumn>
                <FooterLink text="Contact Us" href="/contact" />
                <FooterLink text="Support" href="/support" />
                <FooterLink text="Request a Demo" href="/demo" />
                <FooterLink text="Sales Inquiries" href="/sales" />
            </FooterColumn>

            {/* Social Media Section */}
            <FooterColumn>
                <FooterLink target="_blank" text="Github" href="https://github.com/salkaro" />
                <FooterLink target="_blank" text="Twitter" href="https://x.com/_itsnickjames" />
                <FooterLink target="_blank" text="LinkedIn" href="https://www.linkedin.com/in/nickjames-info/" />
                <FooterLink target="_blank" text="Instagram" href="https://www.instagram.com/yourprofile" />
            </FooterColumn>
        </footer>
    )
}



export default Footer

