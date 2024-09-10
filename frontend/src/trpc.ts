import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../backend/routes";
import { baseBackendURI } from "./config";

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: baseBackendURI,
            // headers: () => {
                // const token = getToken();
                // return token ? { Authorization: `Bearer ${token}` } : {};
            // }
        })
    ]
}) 
