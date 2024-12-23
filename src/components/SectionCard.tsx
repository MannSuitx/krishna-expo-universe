import { motion } from "framer-motion";

interface SectionCardProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export const SectionCard = ({ title, description, image, reverse }: SectionCardProps) => {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 py-16`}>
      <motion.div
        initial={{ opacity: 0, x: reverse ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1"
      >
        <h2 className="text-4xl font-bold mb-4 glow-effect">{title}</h2>
        <p className="text-gray-300 text-lg">{description}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: reverse ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1"
      >
        <img
          src={image}
          alt={title}
          className="rounded-xl shadow-lg shadow-primary/20"
        />
      </motion.div>
    </div>
  );
};