// Shim: previously used @lovable.dev/cloud-auth-js which proxied OAuth through
// Lovable's /auth/initiate endpoint. That only works inside Lovable Cloud.
// On Vercel (or any non-Lovable host) it causes a 404. This file now delegates
// directly to supabase.auth.signInWithOAuth so the same interface still works.

import { supabase } from "../supabase/client";

type SignInOptions = {
  redirect_uri?: string;
  extraParams?: Record<string, string>;
};

export const lovable = {
  auth: {
    signInWithOAuth: async (
      provider: "google" | "apple" | "microsoft" | "lovable",
      opts?: SignInOptions,
    ) => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider === "lovable" ? "google" : provider,
        options: {
          redirectTo: opts?.redirect_uri ?? window.location.origin,
          queryParams: opts?.extraParams,
        },
      });

      if (error) {
        return { error, redirected: false };
      }

      // Supabase.auth.signInWithOAuth triggers a full browser redirect,
      // so the code below this point never executes.
      return { redirected: true, error: null };
    },
  },
};
