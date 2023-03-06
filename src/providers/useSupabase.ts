import { createClient, SupabaseClient } from "@supabase/supabase-js";
import AppConfig from "../config/AppConfig";

let supabase: SupabaseClient;

const useSupabase = () => {
  if (!supabase) {
    const { URL, KEY } = AppConfig.Libs.Supabase;
    supabase = createClient(URL, KEY);
  }

  return supabase;
};

export default useSupabase;
