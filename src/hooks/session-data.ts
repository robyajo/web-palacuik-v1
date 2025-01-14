'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";



export async function getToken() {
    const session: any | null = await getServerSession(authOptions);
    if (!session) return null
    return session?.user?.access_token
}