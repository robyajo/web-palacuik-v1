'use client';
import useSWR from 'swr';
import axios from 'axios';
import { getToken } from './session-data';
import { API_MARKET, API_PROFILE } from '@/lib/api';

// Fungsi fetcher menggunakan axios
const fetcher = async (url: string, token: string) => {
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
// Permohonan Admin
export const SWRProfile = () => {
    const { data, error, mutate } = useSWR(
        API_PROFILE,
        async (url) => {
            const token = await getToken();
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
        {
            revalidateOnFocus: true,
            shouldRetryOnError: false,
        }
    );
    const invalidateData = () => mutate();
    return {
        data,
        error,
        isLoading: !error && !data,
        invalidateData,
    };
};
export const SWRMarketPlace = () => {
    const { data, error, mutate } = useSWR(
        API_MARKET,
        async (url) => {
            const token = await getToken();
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
        {
            revalidateOnFocus: true,
            shouldRetryOnError: false,
        }
    );
    const invalidateData = () => mutate();
    return {
        data,
        error,
        isLoading: !error && !data,
        invalidateData,
    };
};

// Custom hook useData
export const useData = (url: string, token: string) => {
    const { data, error, isLoading, mutate } = useSWR([url, token], ([url, token]) => fetcher(url, token), {
        revalidateOnFocus: true,
    });

    return { data, error, isLoading, mutate };
};

