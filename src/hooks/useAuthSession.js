// hooks/useAuthSession.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

export default function useAuthSession() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      console.log(
        "[useAuthSession] Checking session at",
        new Date().toISOString()
      );
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      console.log("[useAuthSession] Session:", { session, sessionError });

      if (sessionError || !session) {
        console.log("[useAuthSession] No session found, redirecting to login");
        router.push("/admin/login");
        return;
      }

      const { data: adminUser, error: adminUserError } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", session.user.id)
        .single();
        console.log("[useAuthSession] Admin User:", { adminUser, adminUserError });

      if (adminUserError || !adminUser) {
        console.log("[useAuthSession] No Admin user found, signing out");
        await supabase.auth.signOut();
          router.push("/admin/login");
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // console.log("[useAuthSession] Auth State Change:", { event, session });
        if (event === "SIGNED_OUT" || !session) {
          router.push("/admin/login");
        }
      }
    );

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, [router]);
}
