// External Imports
import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

// Local Imports
import AnimatedCheckMark from "./AnimatedCheckMark";


interface ButtonToCircleProps {
    text: string;
    onClick: () => void;
    style?: React.CSSProperties;
}

const ButtonToCircle: React.FC<ButtonToCircleProps> = ({ text, onClick, style }) => {
    const [clicked, setClicked] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    // Animation for the button with overshoot effect
    const animationStyles = useSpring({
        width: clicked ? 50 : 150,             // Shrink to 50px when clicked
        height: clicked ? 50 : 40,             // Keep height as 40px when not clicked, and 50px when clicked
        borderRadius: clicked ? "50%" : "8px", // Circular shape when clicked
        config: {
            tension: clicked ? 500 : 400,   // Higher tension for overshoot
            friction: 20,                   // Standard friction
            mass: 1.1,                      // Mass of the spring, controls the overshoot bounce
            clamp: false,                   // Allows overshooting
            precision: 0.1,                 // Precision of the animation's progress
        },
        onRest: () => {
            if (clicked) setAnimationComplete(true);
        },
    });

    const handleClick = () => {
        setClicked(!clicked); // Toggle clicked state
        onClick(); // Run the onClick prop function
    };

    return (
        <animated.button
            onClick={handleClick}
            style={{ ...animationStyles, ...style }} // Merge custom styles with animation styles
            className="bg-neonCyan hover:bg-[#00dddd] transition duration-200 text-deepBlue flex justify-center items-center border-none cursor-pointer"
        >
            {clicked && animationComplete ? (
                <AnimatedCheckMark />
            ) : clicked && !animationComplete ? (
                ""
            ) : (
                text
            )}
        </animated.button>
    );
};

export default ButtonToCircle;



