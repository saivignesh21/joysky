import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 blur-[180px]" />

      <div className="absolute right-0 top-40 w-[500px] h-[500px] bg-blue-500/20 blur-[180px]" />

      <Navbar />

      <Hero />

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-3 gap-6">

          <FeatureCard
            title="AI Moderation"
            description="Detect harmful behavior and create a safer environment."
          />

          <FeatureCard
            title="Instant Matching"
            description="Connect with people globally in seconds."
          />

          <FeatureCard
            title="Video + Text"
            description="Enjoy video calling and messaging on one screen."
          />

        </div>

      </section>

    </div>
  );
}