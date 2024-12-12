'use client';

import React from "react";
import {useRouter} from "next/navigation";

interface Props {
    children: React.ReactNode;
    mode?:"model" | 'redirect';
    asChild?:boolean;
}
function LoginButton({children, mode='redirect', asChild}:Props) {
    const router = useRouter();

    const onClick = () => router.push('/auth/login');


    if(mode === "model"){
        return (<span>TODO</span>)
    }
    return (
        <span onClick={onClick}>
            {children}
        </span>
    );
}

export default LoginButton;