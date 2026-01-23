import { authOptions } from "@/custom-auth";
import { AuthInit } from "@hbasports/auth";

const { handlers } = AuthInit(authOptions);

export const { GET, POST } = handlers;
