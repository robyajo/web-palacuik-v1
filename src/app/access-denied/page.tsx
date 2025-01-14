'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function AccessDeniedPage() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 1
                    }}
                    className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent inline-block"
                >
                    403
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        type: "tween",
                        ease: "easeOut",
                        duration: 0.8,
                        delay: 0.5
                    }}
                    className="my-2 text-2xl font-bold font-heading"
                >
                    Access Denied
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mx-auto"
                >
                    Anda mencoba mengakses URL yang memiliki batasan izin. Ini bisa berarti Anda tidak memiliki izin untuk mengakses sumber daya tersebut.
                </motion.p>
                <div className="flex justify-center gap-2 mt-8">
                    <Button onClick={() => router.back()} variant="default" size="lg">
                        Kembali
                    </Button>
                </div>
            </div>
        </div>
    );
}