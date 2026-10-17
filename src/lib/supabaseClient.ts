import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jclzrvizljglhhndkmvo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_aNaTQ6i8BqDkS3gwGyE9mQ_lOjwQfaj';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);