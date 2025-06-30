"use client";
import {
    BoltIcon,
    BookOpenIcon,
    Layers2Icon,
    LogOutIcon,
    PinIcon,
    UserPenIcon,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {User} from "better-auth";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation"

export default function UserMenu({user}: { user: User }) {

    // Function to handle logout
    const router = useRouter();

    async function handleLogout() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/signin");
                }
            }
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                    <Avatar>
                        <AvatarImage src={user?.image || ""} alt={user?.name}/>
                        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64" align="end">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {user?.name}
          </span>
                    <span className="text-muted-foreground truncate text-xs font-normal">
            {user?.email}
          </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <BoltIcon size={16} className="opacity-60" aria-hidden="true"/>
                        <span>Option 1</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Layers2Icon size={16} className="opacity-60" aria-hidden="true"/>
                        <span>Option 2</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <BookOpenIcon size={16} className="opacity-60" aria-hidden="true"/>
                        <span>Option 3</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <PinIcon size={16} className="opacity-60" aria-hidden="true"/>
                        <span>Option 4</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <UserPenIcon size={16} className="opacity-60" aria-hidden="true"/>
                        <span>Option 5</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon size={16} className="opacity-60" aria-hidden="true"/>
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
