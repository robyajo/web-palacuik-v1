import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/options';

export default async function LayoutAuth({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/dashboard");
    }
    return (
        <div className="relative w-full h-full bg-background" vaul-drawer-wrapper="">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f0f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0f_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]"></div>
            <div className="relative z-10">
                <div className="flex min-h-svh flex-col items-center justify-center  p-6 md:p-10">
                    <div className="w-full max-w-sm md:max-w-3xl">
                        <div className="absolute top-2 right-2">
                            <ThemeToggle />
                        </div>
                        {children}
                    </div>
                    <div className="z-10 text-xs text-center mt-4">
                        <div className="text-balance mb-4 text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                            and <a href="#">Privacy Policy</a>.
                        </div>
                        ©{new Date().getFullYear()} {process.env.NEXT_APP_NAME}.
                    </div>
                </div>

            </div>
        </div>

    )
}
