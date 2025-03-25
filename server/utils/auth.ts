import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./drizzle";
import { admin } from "better-auth/plugins";
import { useEnv } from "./env";
import { H3Event } from "h3";
import { passkey } from "better-auth/plugins/passkey";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    additionalFields: {
      searchType: {
        defaultValue: "default",
        type: "string",
        required: true,
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: useEnv().GOOGLE_CLIENT_ID,
      clientSecret: useEnv().GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [passkey(), admin()],
});

export const getAuthSession = (event: H3Event, force = false) =>
  auth.api.getSession({
    headers: event.headers,
    query: { disableCookieCache: force },
  });

export const checkSession = async (event: H3Event) => {
  const authSession = await getAuthSession(event);
  if (!authSession?.user)
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
};

export const checkAdmin = async (event: H3Event) => {
  const authSession = await getAuthSession(event, true);
  if ((authSession?.user as User)?.role !== "admin")
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    });
};

export type AuthSession = Awaited<ReturnType<typeof getAuthSession>>;
