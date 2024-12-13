import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                darkBlue: "#090a25",
                deepBlue: "#000011",
                darkGrey: "#1c1c1c",
                hoverDarkGrey: "#191919",
                lightGrey: "#4c4c4c",
                hoverLightGrey: "#393939",
                offBlack: "#070707",
                neonCyan: "#00FFFF",
                neonOrange: "#FA4616",
                neonGreen: "#00ffa5",
                neonYellow: "#ffe62d",
                neonPink: "#fd4499",
                neonPurple: "#df19fb"
            },
            keyframes: {
                checkmark: {
                    '0%': { 'stroke-dashoffset': '100px' },
                    '100%': { 'stroke-dashoffset': '0px' },
                },
                'checkmark-circle': {
                    '0%': { 'stroke-dashoffset': '480px' },
                    '100%': { 'stroke-dashoffset': '960px' },
                },
                'colored-circle': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                checkmark: 'checkmark 0.25s ease-in-out 0.7s backwards',
                'checkmark-circle': 'checkmark-circle 0.6s ease-in-out backwards',
                'colored-circle': 'colored-circle 0.3s ease-in-out 0.4s backwards',
            },
        },
    },
    plugins: [],
} satisfies Config;
