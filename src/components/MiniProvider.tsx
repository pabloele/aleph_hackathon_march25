import { useEffect, ReactNode,} from "react";
import {  MiniKit,  } from "@worldcoin/minikit-js";


export default function MiniKitProvider({ children }: { children: ReactNode }) {

    useEffect(() => {
        MiniKit.install(import.meta.env.VITE_APP_ID);
    }, []);
    return (
        <>
            {children}
        </>
    );
}
