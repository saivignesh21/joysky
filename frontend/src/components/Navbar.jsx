export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-6">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>

        <h1 className="text-2xl font-bold text-white">
          JoySky
        </h1>
      </div>

      {/* Menu */}
      <div className="hidden md:flex items-center gap-10 text-gray-300">
        <a href="#">Home</a>
        <a href="#">Safety</a>
        <a href="#">Features</a>
        <a href="#">FAQ</a>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="px-5 py-2 border border-white/10 rounded-xl text-white">
          Login
        </button>

        <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold">
          Sign Up
        </button>
      </div>

    </nav>
  );
}