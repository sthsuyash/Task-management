import {useState} from "react";

import {cn} from "@/lib/utils";
import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Link} from "react-router-dom";
import {toast} from "sonner";
import {useAppDispatch} from "@/hooks/redux-hooks";
import {login} from "@/slices/authSlice";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Login({className, ...props}: LoginFormProps) {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        if (!email || !password) {
            toast.error("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        try {
            await dispatch(login({email, password})).unwrap();
            toast.success("Login successful");
        } catch (e: any) {
            toast.error(e.message);
        }
    }

    return (
        <div
            className={`px-10 md:p-0 w-full sm:w-[400px] mx-auto flex flex-col justify-center space-y-6 min-h-screen ${cn(className)}`}
            {...props}
        >
            <form onSubmit={onSubmit} className="flex flex-col space-y-4 lg:p-8">
                {/* Logo */}
                <div className="flex justify-center">
                    <Icons.logo className="h-8 w-auto" />
                </div>

                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
                    <p className="text-sm text-muted-foreground">Enter your details to login to your account</p>
                </div>
                <div className="grid gap-5">
                    {/* Email  */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="john@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password  */}
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="********"
                            type="password"
                            autoComplete="current-password"
                            disabled={isLoading}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <Button disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>

                    <div className="flex flex-col space-y-2 text-center">
                        <p className="text-sm text-muted-foreground">Don't have an account?</p>
                        <Link to="/register" className="text-sm text-primary hover:underline">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </form>

            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
