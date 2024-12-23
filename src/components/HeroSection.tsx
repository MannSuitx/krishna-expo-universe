import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="hero-gradient absolute inset-0" />
      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-effect">
            Business Expo 2.0
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Lord Krishna School of Science
          </p>
          <div className="flex justify-center gap-4">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-6 bg-opacity-10 bg-white backdrop-blur-lg rounded-xl"
            >
              <h3 className="text-xl font-semibold mb-2">Fun Zone</h3>
              <p className="text-gray-400">Experience the excitement</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="p-6 bg-opacity-10 bg-white backdrop-blur-lg rounded-xl"
            >
              <h3 className="text-xl font-semibold mb-2">Food Court</h3>
              <p className="text-gray-400">Delicious delights</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="p-6 bg-opacity-10 bg-white backdrop-blur-lg rounded-xl"
            >
              <h3 className="text-xl font-semibold mb-2">InfoTech & Gaming</h3>
              <p className="text-gray-400">Future of technology</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};