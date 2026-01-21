import { authConfig } from "@/auth";
import NextAuth from "next-auth";

const { handlers } = NextAuth(authConfig);

export const { GET, POST } = handlers;
