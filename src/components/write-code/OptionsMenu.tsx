import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"


interface OptionsMenuProps {
    gridVertical: boolean;
    handleGridChange: () => void;
    miniMap: boolean;
    setMinimap: (value: boolean) => void;
}


const OptionsMenu: React.FC<OptionsMenuProps> = ({ gridVertical, handleGridChange, miniMap, setMinimap }) => {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>Options</MenubarTrigger>
                <MenubarContent align="end">
                    <MenubarItem onClick={() => handleGridChange()}>
                        {gridVertical ? "Output Right" : "Output Bottom"}
                    </MenubarItem>
                    <MenubarItem onClick={() => setMinimap(!miniMap)}>
                        {miniMap ? "Hide Mini Map": "Show Mini Map"}
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default OptionsMenu
