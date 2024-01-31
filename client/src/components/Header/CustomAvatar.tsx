import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";

import { logout } from "@/slices/authSlice";

type AvatarProps = {
    name: string;
    src: string;
};

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux-hooks";

export default function CustomAvatar({ name, src }: AvatarProps) {
    const initials = name ? name.match(/\b\w/g) || [] : []; // Get initials

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            navigate("/login");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Avatar>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <AvatarFallback>{initials.slice(0, 2)}</AvatarFallback>
                    <AvatarImage src={src} alt={name} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link to={`/profile`}>Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem>Tasks</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500" onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </Avatar>

    );
}
