'use client';
import { SWRConfig } from 'swr';

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SWRConfig
            value={{
                refreshInterval: 0, // Menonaktifkan auto refresh
                revalidateOnFocus: false, // Menonaktifkan revalidasi saat focus
                fetcher: (resource, init) =>
                    fetch(resource, {
                        ...init,
                        method: 'GET', // Memastikan method GET
                        headers: {
                            ...init?.headers,
                            'Content-Type': 'application/json',
                        },
                    }).then(res => {
                        if (!res.ok) {
                            throw new Error('An error occurred while fetching the data.')
                        }
                        return res.json()
                    }),
            }}
        >
            {children}
        </SWRConfig>
    );
};