import CustomAvatar from "./CustomAvatar";
import {ModeToggle} from "../Themes/mode-toggle";

export default function Header(): React.ReactElement {
    return (
        <header className="flex justify-between items-center py-4 px-6 bg-white border-b-2 dark:bg-gray-800 dark:border-gray-700">
            <ModeToggle />
            <CustomAvatar name="Suyash Shrestha" src="https://avatars.githubusercontent.com/u/29686102?v=4" />
        </header>
    );
}
