// 
import { Link } from "react-router";

const Navbar = function () {
  return (
    <header className="bg-gradient-to-r from-black via-gray-900 to-purple-900 shadow-2xl sticky top-0 z-50 border-b-2 border-purple-700">
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          {/* <Link
            to="/"
            className="text-3xl font-extrabold tracking-widest bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-300 bg-clip  text-shadow-transparent px-4 py-2 rounded-lg shadow-lg neon-glow hover:scale-105 transition-transform"
          >
            <span className="drop-shadow-lg">🏏 CRIC SCORE</span>
          </Link> */}
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-widest bg-gradient-to-r from-purple-600 via-fuchsia-400 to-green-300 bg-clip neon-link  duration-200  text-shadow-transparent px-4 py-2 rounded-lg shadow-lg neon-glow hover:scale-105 transition-transform"
          >
            <span className="drop-shadow-lg">🏏 CRIC SCORE</span>
          </Link>
          <nav className="space-x-2 md:space-x-6 flex items-center">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg font-bold text-cyan-300 hover:bg-fuchsia-700 hover:text-yellow-300 neon-link transition-all duration-200 shadow hover:shadow-lg"
            >
              Home
            </Link>
            <Link
              to="/allmatches"
              className="px-4 py-2 rounded-lg font-bold text-fuchsia-300 hover:bg-cyan-700 hover:text-yellow-300 neon-link transition-all duration-200 shadow hover:shadow-lg"
            >
              All Matches
            </Link>
            <Link
              to="/creatematch"
              className="px-4 py-2 rounded-lg font-bold text-yellow-300 hover:bg-fuchsia-700 hover:text-cyan-300 neon-link transition-all duration-200 shadow hover:shadow-lg"
            >
              Create Match
            </Link>
            <Link
              to="/singlematch"
              className="px-4 py-2 rounded-lg font-bold text-green-300 hover:bg-yellow-700 hover:text-fuchsia-300 neon-link transition-all duration-200 shadow hover:shadow-lg"
            >
              Single Match
            </Link>
            <Link
              to="/livematch"
              className="px-4 py-2 rounded-lg font-bold text-pink-400 hover:bg-cyan-700 hover:text-yellow-300 neon-link transition-all duration-200 shadow hover:shadow-lg"
            >
              Live Match
            </Link>
          </nav>
        </div>
      </div>
      {/* Neon glow custom style */}
      <style>
        {`
          .neon-glow {
            text-shadow:
              0 0 8px #fff,
              0 0 16px #f0f,
              0 0 24px #0ff,
              0 0 32px #f0f;
          }
          .neon-link {
            box-shadow: 0 0 8px #0ff, 0 0 16px #f0f, 0 0 4px #fff;
          }
          .neon-link:hover {
            box-shadow: 0 0 16px #ff0, 0 0 32px #0ff, 0 0 8px #fff;
          }
        `}
      </style>
    </header>
  );
};

export default Navbar;