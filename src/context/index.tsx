import {ReactNode} from "react";
import {AuthProvider} from "./auth-context";
import {QueryClient, QueryClientProvider} from 'react-query'
import {ThemeProvider} from "./theme-context";

export const AppProviders = ({children}: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <AuthProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}
