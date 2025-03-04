import { supabase, supaClient } from "@/utils/supabase"
import { useMemo } from "react"

export const useSupabase = () => {
    return useMemo(supaClient, [])
}