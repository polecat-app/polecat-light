import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
// @ts-ignore
import { SUPABASE_URL } from "react-native-dotenv";
// @ts-ignore
import { SUPABASE_KEY } from "react-native-dotenv";

// Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false, // Prevents Supabase from evaluating window.location.href, breaking mobile
});
