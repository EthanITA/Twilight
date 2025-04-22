import { createAuthClient } from "better-auth/client";
import { adminClient, passkeyClient } from "better-auth/client/plugins";
import type { User, Session } from "~~/server/database/schema/auth";

export const useAuth = defineStore("auth", () => {
  const client = createAuthClient({
    plugins: [passkeyClient(), adminClient()],
  });
  const session = ref<Session>();
  const user = ref<User>();
  const isAdmin = computed<boolean>(() => user.value?.role === "admin");
  const login = {
    google: () =>
      client.signIn.social({
        provider: "google",
      }),
    passkey: client.signIn.passkey,
    email: client.signIn.email,
  };
  const register = {
    email: client.signUp.email,
  };

  const signOut = () => client.signOut().then(() => window.location.reload());

  const getSession = async () => {
    const { data, error } = await client.getSession();
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      session.value = data.session as Session;
      user.value = data.user as User;
    }
    return { data, error };
  };

  return {
    user,
    session,
    isAdmin,
    login,
    register,
    signOut,
    getSession,
    addPasskey: () => client.passkey.addPasskey(),
  };
});
