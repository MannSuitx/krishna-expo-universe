import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface MemberInput {
  name: string;
}

export const StallRegistration = () => {
  const { toast } = useToast();
  const [stallNumber, setStallNumber] = useState('');
  const [members, setMembers] = useState<MemberInput[]>([{ name: '' }]);
  const [loading, setLoading] = useState(false);

  const handleAddMember = () => {
    if (members.length < 6) {
      setMembers([...members, { name: '' }]);
    }
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index].name = value;
    setMembers(newMembers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('stalls').insert([
        {
          stall_number: stallNumber,
          members: members.map(m => m.name),
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your stall has been registered successfully.",
      });

      // Reset form
      setStallNumber('');
      setMembers([{ name: '' }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register stall. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-opacity-10 bg-white backdrop-blur-lg rounded-xl border border-gray-800"
    >
      <h2 className="text-3xl font-bold mb-6 text-center glow-effect">Stall Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Stall Number</label>
          <Input
            type="text"
            value={stallNumber}
            onChange={(e) => setStallNumber(e.target.value)}
            required
            className="bg-opacity-10 bg-white"
            placeholder="Enter stall number"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium mb-2">Members (4-6)</label>
          {members.map((member, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="text"
                value={member.name}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                required
                className="bg-opacity-10 bg-white"
                placeholder={`Member ${index + 1} name`}
              />
              {members.length > 4 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemoveMember(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>

        {members.length < 6 && (
          <Button
            type="button"
            onClick={handleAddMember}
            variant="outline"
            className="w-full"
          >
            Add Member
          </Button>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading || members.length < 4}
        >
          {loading ? "Registering..." : "Register Stall"}
        </Button>
      </form>
    </motion.div>
  );
};