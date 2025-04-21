// External Imports
// ...

// Local Imports
import NavbarTitle from './NavbarTitle';
import NavbarMenu from './NavbarMenu';


interface NavbarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
}


const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
    return (
        <nav className="px-6 py-4 flex flex-col justify-center items-center h-16">
            <div className="w-full flex justify-start items-center gap-6 max-w-7xl">
                {/* Logo or Brand Name */}
                <NavbarTitle />

                {/* Navigation Links for larger screens */}
                <div className='hidden md:block'>
                    <NavbarMenu />
                </div>

                <div className='md:hidden w-full flex justify-end items-center'>
                    {/* Hamburger Icon for smaller screens */}
                    <button
                        className="focus:outline-hidden"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
