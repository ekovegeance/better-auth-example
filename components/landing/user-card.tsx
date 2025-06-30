import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {User} from "better-auth";
import {Button} from "@/components/ui/button";

export default function UserCard({user}: { user: User }) {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>User Detail</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={user?.image || ""} alt={user?.name}/>
                        <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-foreground truncate text-sm font-medium">{user?.name}</span>
                        <span className="text-muted-foreground truncate text-xs font-normal">{user?.email}</span>
                    </div>
                </div>
                    <Button variant="secondary">Edit</Button>
                </div>
            </CardContent>
        </Card>
    );
}