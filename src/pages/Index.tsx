import { motion } from "framer-motion";
import { HeroSection } from "../components/HeroSection";
import { SectionCard } from "../components/SectionCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#030014] text-white">
      <HeroSection />
      
      <main className="container mx-auto px-4">
        <SectionCard
          title="Fun Zone"
          description="Immerse yourself in exciting activities, games, and entertainment. Experience joy and create lasting memories with your friends and classmates."
          image="/placeholder.svg"
        />
        
        <SectionCard
          title="Food Court"
          description="Savor a diverse range of culinary delights. From local favorites to international cuisine, treat your taste buds to an unforgettable experience."
          image="/placeholder.svg"
          reverse
        />
        
        <SectionCard
          title="InfoTech & Gaming"
          description="Explore the latest in technology and gaming. Experience cutting-edge innovations, participate in gaming tournaments, and discover the future of tech."
          image="/placeholder.svg"
        />
      </main>
      
      <footer className="section-gradient mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 Lord Krishna School of Science. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;