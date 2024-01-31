import CustomAvatar from "./CustomAvatar";
import {ModeToggle} from "../Themes/mode-toggle";
import { AlarmClockCheckIcon } from "lucide-react";

export default function Header(): React.ReactElement {
    return (
        <header className="flex justify-between items-center py-4 px-6 bg-white border-b-2 dark:bg-gray-800 dark:border-gray-700">
            <a className="font-semibold text-xl tracking-tight dark:text-white" href="/">
                <AlarmClockCheckIcon className="inline-block h-6 w-6 text-sky-500 dark:text-sky-400 mr-2" />
                Task Management
            </a>
            <div className="flex items-center space-x-4">
                <ModeToggle />
                <CustomAvatar name="Suyash Shrestha" src="https://avatars.githubusercontent.com/u/29686102?v=4" />
            </div>
        </header>
    );
}
