import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

type AvatarProps = {
    name: string;
    src: string;
};

export default function CustomAvatar({name, src}: AvatarProps) {
    const initials = name ? name.match(/\b\w/g) || [] : []; // Get initials

    return (
        <Avatar>
            <AvatarFallback>{initials.slice(0, 2)}</AvatarFallback>
            <AvatarImage src={src} alt={name} />
        </Avatar>
    );
}
