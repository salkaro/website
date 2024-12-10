// External Imports
// ...

// Local Imports
import NavbarLinks from './NavbarLinks';
import NavbarTitle from '../ui/NavbarTitle';


interface NavbarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
}


const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
    return (
        <nav className="bg-darkGrey text-white px-6 py-4 rounded-full">
            <div className="w-full flex justify-between items-center">
                {/* Logo or Brand Name */}
                <NavbarTitle />

                {/* Navigation Links for larger screens */}
                <div className="hidden space-x-4 md:flex justify-center items-center">
                    <NavbarLinks />
                </div>

                {/* Hamburger Icon for smaller screens */}
                <button
                    className="md:hidden focus:outline-none"
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
        </nav>
    );
};

export default Navbar;
