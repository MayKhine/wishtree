import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { FC, PropsWithChildren, useState } from "react"
import type { AppRouter } from "src/backend/router"
//     👆 **type-only** import because we don't want to pull in actual server-side deps to frontend!

export const trpc = createTRPCReact<AppRouter>()
const VITE_API_URL = import.meta.env.VITE_API_URL ?? "/trpc"

export const TrpcQueryContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: VITE_API_URL,
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              //              authorization: getAuthCookie(),
            }
          },
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
