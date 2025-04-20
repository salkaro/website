// External Imports
import Link from 'next/link';

// Local Imports


interface LanguageSelectionProps {
    name: string;
    link: string;
}


const LanguageSelection:React.FC<LanguageSelectionProps> = ({ name, link }) => {
    return (
        <Link href={link}>{name}</Link>
    )
}

export default LanguageSelection

