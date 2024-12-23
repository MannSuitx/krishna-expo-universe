import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Alert, AlertDescription } from "@/components/ui/alert";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

interface Stall {
  id: number;
  stall_number: string;
  members: string[];
}

export const StallMenu = () => {
  const [stalls, setStalls] = useState<Stall[]>([]);

  if (!supabase) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-6">
        <AlertDescription>
          Unable to connect to database. Please ensure Supabase is properly connected to your project.
        </AlertDescription>
      </Alert>
    );
  }

  useEffect(() => {
    const fetchStalls = async () => {
      const { data, error } = await supabase
        .from('stalls')
        .select('*')
        .order('stall_number');

      if (data) setStalls(data);
    };

    fetchStalls();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel('stalls')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'stalls' }, fetchStalls)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center glow-effect">Registered Stalls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stalls.map((stall) => (
          <motion.div
            key={stall.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-opacity-10 bg-white backdrop-blur-lg rounded-xl border border-gray-800 hover:border-primary/50 transition-colors"
          >
            <div className="text-xl font-bold mb-4 glow-effect">Stall #{stall.stall_number}</div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-400">Team Members:</h3>
              <ul className="space-y-1">
                {stall.members.map((member, index) => (
                  <li key={index} className="text-sm text-gray-300">
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};