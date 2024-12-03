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
                neonCyan: "#00FFFF",
                neonOrange: "#FA4616",
                neonGreen: "#00ffa5",
                neonYellow: "#ffe62d",
                neonPink: "#fd4499",
                neonPurple: "#df19fb"
            },
        },
    },
    plugins: [],
} satisfies Config;
