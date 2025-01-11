import { API_LOGIN } from "@/lib/api";
import axios from "@/lib/axios";
import { isAxiosError } from "axios";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
        error: "/api/auth/error", // Tambahan halaman error
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = {
                    ...token,
                    id: Number(user.id),
                    uuid: user.uuid,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    access_token: user.access_token,
                    token_type: user.token_type
                };
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: Number(token.id),
                    uuid: token.uuid,
                    name: token.name,
                    email: token.email,
                    role: token.role,
                    access_token: token.access_token,
                    token_type: token.token_type
                };
            }
            return session;
        },
    },

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24, // 24 jam
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "nama@email.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('Email dan password diperlukan');
                    }

                    const res = await axios.post(API_LOGIN, {
                        email: credentials.email,
                        password: credentials.password
                    });

                    const response = res.data;

                    if (!response.success) {
                        throw new Error(response.message || 'Autentikasi gagal');
                    }

                    const userData = response.data.user;
                    const tokenData = response.data.access_token;

                    if (!userData || !tokenData) {
                        throw new Error('Data response tidak lengkap');
                    }

                    // Return data user yang sudah disesuaikan dengan interface User
                    return {
                        id: userData.id,
                        uuid: userData.uuid,
                        name: userData.name,
                        email: userData.email,
                        role: userData.role,
                        access_token: tokenData.token,
                        token_type: tokenData.token_type
                    } as User;

                } catch (error) {
                    console.error('Login error:', error);
                    if (isAxiosError(error)) {
                        throw new Error(error.response?.data?.message || error.message);
                    }
                    throw error;
                }
            },
        }),
    ],
};