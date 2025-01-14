'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { UserApi } from "../../types";



export async function getToken() {
    const session: UserApi | null = await getServerSession(authOptions);
    if (!session) return null
    return session?.user?.access_token
}