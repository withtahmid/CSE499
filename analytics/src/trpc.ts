import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../backend/routes";
import { baseBackendURI } from "./config";

const ADMIN_KEY = "1b1bb25a-af5d-11ef-907d-a7095a88293e";

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
                return token ? { Authorization: `Bearer ${ADMIN_KEY}` } : {};
            }
        })
    ],
    transformer: undefined
}) 
