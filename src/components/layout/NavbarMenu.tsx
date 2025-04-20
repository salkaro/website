import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils"
import React from "react";
import AnimationArrow from "../ui/animation-arrow";

const tools: { title: string; href: string; description: string }[] = [
    {
        title: "Code Online",
        href: "/write-code",
        description:
            "Online code editor to write, run, and test code",
    },
    {
        title: "Word Finder",
        href: "/wordfinder",
        description:
            "Word finder for Wordle, Scrabble, Anagrams & More",
    },
    {
        title: "Games",
        href: "/games",
        description: "Explore a fun collection of interactive and engaging games for all ages!",
    },
    {
        title: "Website Status",
        href: "/isitdown",
        description:
            "Check if a website is running by quickly checking its status.",
    },
    {
        title: "Copy Text",
        href: "/copy-text?p=some random text",
        description:
            "Quickly share and copy any text with a simple link.",
    },
]

const learning: { title: string; href: string; description: string }[] = [
    {
        title: "Study Materials",
        href: "/write-code",
        description:
            "Study materials & questions to help you with exams.",
    },
    {
        title: "Online Timer",
        href: "/online-timer",
        description:
            "Exam timer used for exams, studying etc.",
    },
]

const NavbarMenu = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">Tools</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {tools.map((tool) => (
                                <ListItem
                                    key={tool.title}
                                    title={tool.title}
                                    href={tool.href}
                                >
                                    {tool.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">Learning</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {learning.map((tool) => (
                                <ListItem
                                    key={tool.title}
                                    title={tool.title}
                                    href={tool.href}
                                >
                                    {tool.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none flex flex-row items-center gap-1">
                        <span>{title}</span>
                        <span><AnimationArrow className="scale-75" /></span>
                        </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default NavbarMenu
