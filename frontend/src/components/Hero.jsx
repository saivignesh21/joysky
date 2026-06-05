import { useState } from "react";
import { Video, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const [interest, setInterest] = useState("");

  const startVideoChat = () => {
    localStorage.setItem("joysky_interest", interest);
    navigate("/video-chat");
  };

  return (
    <section className="flex flex-col items-center text-center py-20 px-6">

      {/* Badge */}
      <div className="mb-6 px-5 py-2 rounded-full border border-purple-500/30 bg-white/5 backdrop-blur-md">
        🛡️ AI Moderated • Safe Community
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-5xl">
        Meet New People

        <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
          Instantly & Safely
        </span>
      </h1>

      {/* Description */}
      <p className="mt-8 text-gray-400 text-lg md:text-xl max-w-3xl">
        Connect with people around the world through secure video and
        text chat powered by AI moderation, smart matching, and a safer
        community experience.
      </p>

      {/* Interest Section */}
      <div className="mt-10 w-full max-w-3xl">

        <h3 className="text-xl font-semibold mb-4">
          What do you want to talk about?
        </h3>

        <input
          type="text"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          placeholder="Enter interests (Telugu, Movies, Coding, Stocks...)"
          className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-purple-500"
        />

        <div className="flex flex-wrap justify-center gap-3 mt-5">

          <button
            onClick={() => setInterest("Telugu")}
            className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700"
          >
            Telugu
          </button>

          <button
            onClick={() => setInterest("Movies")}
            className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700"
          >
            Movies
          </button>

          <button
            onClick={() => setInterest("Gaming")}
            className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700"
          >
            Gaming
          </button>

          <button
            onClick={() => setInterest("Cricket")}
            className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700"
          >
            Cricket
          </button>

          <button
            onClick={() => setInterest("Stocks")}
            className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700"
          >
            Stocks
          </button>

          <button
            onClick={() => setInterest("Coding")}
            className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700"
          >
            Coding
          </button>

        </div>

        <p className="text-gray-500 text-sm mt-4">
          Match with people who share similar interests
        </p>

      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-10">

        <button
          onClick={startVideoChat}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/20"
        >
          <Video size={20} />
          Start Video Chat
        </button>

        <button
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
        >
          <MessageCircle size={20} />
          Start Text Chat
        </button>

      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap justify-center gap-8 mt-10 text-gray-400 text-sm">

        <div>🔒 100% Secure</div>
        <div>⚡ Instant Matching</div>
        <div>🛡️ AI Moderation</div>
        <div>🌍 Global Community</div>

      </div>

    </section>
  );
}