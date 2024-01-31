import CustomAvatar from "./CustomAvatar";
import { ModeToggle } from "../Themes/mode-toggle";
import { AlarmClockCheckIcon } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { getUser } from "@/slices/authSlice";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";



export default function Header(): React.ReactElement {
    const navigate = useNavigate();
    const userProfileInfo = useAppSelector(state => state.auth.userProfileData);

    const dispatch = useAppDispatch();

    const basicUserInfo = useAppSelector(state => state.auth.basicUserInfo);

    useEffect(() => {
        if (basicUserInfo) {
            dispatch(getUser(basicUserInfo.id));
        }
    }, [basicUserInfo]);

   
    
    return (
        <header className="dark:border-gray-700 border-b-2 px-0 lg:px-20 bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center py-4 px-4 ">
                <a className="font-semibold text-xl tracking-tight dark:text-white" href="/">
                    <AlarmClockCheckIcon className="inline-block h-6 w-6 text-sky-500 dark:text-sky-400 mr-2" />
                    Task Management
                </a>
                <div className="flex items-center space-x-4">
                    <ModeToggle />
                    {basicUserInfo ? (
                        <CustomAvatar name={`${basicUserInfo.name}`} src="https://avatars.githubusercontent.com/u/29686102?v=4" />
                    ) : (
                        <button
                            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
