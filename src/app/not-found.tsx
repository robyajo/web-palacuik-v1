'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center sm:px-6 lg:px-8">
            <div className="animate-bounce">
                <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[8rem] sm:text-[10rem] font-extrabold leading-none text-transparent animate-pulse">
                    404
                </span>
            </div>
            <h2 className="my-2 text-xl font-bold sm:text-2xl font-heading animate-fade-in-up">
                Halaman Tidak Ditemukan
            </h2>
            <p className="text-sm delay-100 animate-fade-in-up sm:text-base">
                Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
            </p>
            <div className="flex flex-col justify-center gap-2 mt-8 delay-200 sm:flex-row animate-fade-in-up">
                <Button
                    onClick={() => router.back()}
                    variant="default"
                    size="lg"
                    className="w-full hover:animate-pulse sm:w-auto"
                >
                    Kembali
                </Button>
                {/* <Button
          onClick={() => router.push('/dashboard')}
          variant="ghost"
          size="lg"
          className="w-full mt-2 hover:animate-pulse sm:w-auto sm:mt-0"
        >
          Kembali ke Beranda
        </Button> */}
            </div>
        </div>
    );
}