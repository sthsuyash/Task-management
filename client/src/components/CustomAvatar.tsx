import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

type AvatarProps = {
    name: string;
    src: string;
};

export default function CustomAvatar({name, src}: AvatarProps) {
    return (
        <Avatar>
            <AvatarFallback>{name}</AvatarFallback>
            <AvatarImage src={src} alt={name} />
        </Avatar>
    );
}
