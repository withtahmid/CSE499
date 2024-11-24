import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../backend/routes";
import { baseBackendURI } from "./config";

const getToken = ()=>{
    const token = localStorage.getItem("conversationId") ?? null;
    return token;
}

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: baseBackendURI,
            headers: () => {
                const token = getToken();
                return token ? { Authorization: `Bearer ${token}` } : {};
            }
        })
    ],
    transformer: undefined
}) 
