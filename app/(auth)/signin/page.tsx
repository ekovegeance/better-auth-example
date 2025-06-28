import React from 'react';
import {ShieldUser} from "lucide-react";
import {SignInForm} from "@/components/auth/signin-form";
import Image from "next/image";
import placeholder from "@/public/placeholder.png";
import Link from "next/link";

export default function SignInPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <div
                            className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <ShieldUser className="size-4"/>
                        </div>
                        Better Auth
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignInForm/>
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src={placeholder}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}