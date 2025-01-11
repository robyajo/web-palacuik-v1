import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            uuid: string;
            name: string;
            email: string;
            role: string;
            access_token: string;
            token_type: string;
        } & DefaultSession["user"],
        access_token: {
            token: string;
            token_type: string
        }
    }

    interface User {
        id: number;
        uuid: string;
        name: string;
        email: string;
        role: string;

        access_token: string;
        token_type: string;
    }
    interface Tokens {
        token: string;
        token_type: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: number;
        uuid: string;
        name: string;
        email: string;
        role: string;
        access_token: string;
        token_type: string;
    }
}