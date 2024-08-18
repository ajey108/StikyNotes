import { createClient } from "@supabase/supabase-js";

const supbaseUrl = import.meta.env.VITE_SUPABASE_URL
const supbasekey = import.meta.env.VITE_SUPABASE_KEY


export const supabase = createClient(supbaseUrl,supbasekey)