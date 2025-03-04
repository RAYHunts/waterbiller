import { TypedSupabaseClient } from "@/utils/supabase";

export const loginQuery = async (client: TypedSupabaseClient, email: string, password: string) => {
    return client.auth.signInWithPassword({
        email,
        password,
    });
}