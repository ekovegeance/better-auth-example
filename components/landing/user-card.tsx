"use client";
import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Session} from '@/lib/auth-types';
import {useRouter} from 'next/navigation';
import {authClient, useSession} from "@/lib/auth-client";
import {UAParser} from "ua-parser-js";
import {Laptop, Loader2, Smartphone} from 'lucide-react';
import {toast} from "sonner";

export default function UserCard(props: { session: Session, activeSessions: Session["session"][] }) {

    const router = useRouter();
    const {data} = useSession();
    const session = data || props.session;
    const [isTerminating, setIsTerminating] = useState<string>();
    const [activeSessions, setActiveSessions] = useState(props.activeSessions);

    const removeActiveSession = (id: string) => setActiveSessions(activeSessions.filter((session) => session.id !== id));

    const handleTerminateSession = async (sessionId: string, sessionToken: string) => {
        setIsTerminating(sessionId);
        const res = await authClient.revokeSession({
            token: sessionToken,
        });

        if (res.error) {
            toast.error(res.error.message);
        } else {
            toast.success("Session terminated successfully");
            removeActiveSession(sessionId);
        }
        if (sessionId === props.session.session.id) {
            router.refresh();
        }
        setIsTerminating(undefined);
    }


    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>User Detail</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row justify-between items-center gap-2">
                    <div className="flex flex-row items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={session?.user.image || ""} alt={session?.user.name}/>
                            <AvatarFallback>{session?.user.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-foreground truncate text-sm font-medium">{session?.user.name}</span>
                            <span
                                className="text-muted-foreground truncate text-xs font-normal">{session?.user.email}</span>
                        </div>
                    </div>
                    <Button variant="secondary">Edit</Button>
                </div>
                <div className="border-1-2 px-2 w-max gap-1 flex flex-col mt-8">
                    <p className="text-xs font-medium">Active Sessions</p>
                    {activeSessions
                        ?.filter((session) => session.userAgent)
                        .map((session) => {
                            return (
                                <div key={session.id}>
                                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                        {new UAParser(session.userAgent || "").getDevice().type === "mobile" ? (
                                            <Smartphone size={16}/>) : (<Laptop size={16}/>)}
                                        {new UAParser(session.userAgent || "").getOS().name},{" "}
                                        {new UAParser(session.userAgent || "").getBrowser().name}
                                        <button
                                            className="text-destructive opacity-80 cursor-pointer text-xs border-muted-foreground "
                                            onClick={() => handleTerminateSession(session.id, session.token)}>
                                            {isTerminating === session.id ? (
                                                <Loader2 size={15} className="animate-spin"/>
                                            ) : session.id === props.session?.session.id ? ("Sign Out") : ("Terminate")}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </CardContent>
        </Card>
    );
}