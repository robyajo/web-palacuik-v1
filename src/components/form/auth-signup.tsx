'use client'

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginValues } from "@/lib/validation/auth-login-schema"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { PasswordInput } from "../input/password-input"
import LoadingButton from "../button/loading-button"

export function FormAuthSignUp({ className, ...props }: React.ComponentProps<"div">) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: LoginValues) => {
        startTransition(async () => {
            try {
                const result = await signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                })

                if (!result?.ok) {
                    throw new Error(result?.error || 'Login gagal')
                }

                toast.success('Login berhasil!')
                router.replace("/dashboard")
                router.refresh()
            } catch (error: any) {
                toast.error(error.message || 'Terjadi kesalahan')
            }
        })
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
                            <div className="text-center">
                                <h1 className="text-2xl font-bold">Sign Up</h1>
                                <p className="text-muted-foreground">Daftarkan ke akun Anda</p>
                            </div>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <LoadingButton
                                type="submit"
                                className="w-full"
                                loading={isPending}
                            >
                                {isPending ? "Memproses..." : "Login"}
                            </LoadingButton>

                            <div className="text-center text-sm">
                                Belum punya akun?{" "}
                                <Link href="/" className="underline underline-offset-4">
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    </Form>

                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="https://images.unsplash.com/photo-1514820402329-de527fdd2e6d?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Login background"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
