// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// function HomePage() {
//   const [recentMatches, setRecentMatches] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRecentMatches = async () => {
//       try {
//         const response = await axios.get("http://localhost:2020/matches/recent");
//         setRecentMatches(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch matches!");
//       }
//     };
//     fetchRecentMatches();
//   }, []);

//   return (
//     <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 px-2 py-10">
//       <div className="w-full max-w-2xl bg-white bg-opacity-90 rounded-3xl shadow-xl p-8 border-2 border-blue-200">
//         <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-center text-blue-700 tracking-widest drop-shadow-lg">
//           <span className="mr-3">🏏</span> Cric Score
//         </h1>
//         <div className="flex flex-col md:flex-row md:justify-center gap-6 mb-10">
//           <button
//             onClick={() => navigate("/creatematch")}
//             className="flex-1 px-8 py-4 bg-gradient-to-r from-pink-300 via-blue-200 to-yellow-200 text-blue-900 font-bold rounded-xl shadow-md hover:scale-105 hover:from-yellow-200 hover:to-pink-300 transition-all duration-300"
//           >
//             ➕ Create New Match
//           </button>
//           <button
//             onClick={() => navigate("/allmatches")}
//             className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-200 via-pink-200 to-yellow-200 text-blue-900 font-bold rounded-xl shadow-md hover:scale-105 hover:from-yellow-200 hover:to-blue-200 transition-all duration-300"
//           >
//             📜 View All Matches
//           </button>
//         </div>
//         <h2 className="text-2xl font-semibold mb-6 text-center text-blue-500 tracking-wide">
//           Recent Matches
//         </h2>
//         {recentMatches.length === 0 ? (
//           <p className="text-gray-500 text-center">No matches yet.</p>
//         ) : (
//           <ul className="space-y-6">
//             {recentMatches.map((match, index) => (
//               <li
//                 key={match._id || index}
//                 className="cursor-pointer p-5 rounded-2xl bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100 shadow border border-blue-300 flex flex-col md:flex-row md:items-center md:justify-between hover:scale-105 transition-transform duration-200"
//                 onClick={() => navigate(`/singlematch/${match._id}`)}
//                 title="Click to view details"
//               >
//                 <div className="flex flex-col md:flex-row md:items-center gap-2">
//                   <span className="font-bold text-blue-600 text-lg">
//                     {match.teamA || "Team A"}
//                   </span>
//                   <span className="text-yellow-600 font-mono mx-2">
//                     ({match.teamAScore?.runs ?? 0}/{match.teamAScore?.wickets ?? 0})
//                   </span>
//                   <span className="text-pink-500 font-bold text-lg">vs</span>
//                   <span className="font-bold text-pink-500 mx-2 text-lg">
//                     {match.teamB || "Team B"}
//                   </span>
//                   <span className="text-yellow-600 font-mono">
//                     ({match.teamBScore?.runs ?? 0}/{match.teamBScore?.wickets ?? 0})
//                   </span>
//                 </div>
//                 <span className="text-sm text-blue-500 font-semibold mt-2 md:mt-0">
//                   {match.result || ""}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <style>
//         {`
//           .drop-shadow-lg {
//             text-shadow: 0 2px 8px #bdbdbd;
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default HomePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


function HomePage() {
  const [recentMatches, setRecentMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentMatches = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/matches/recent`);
        setRecentMatches(response.data);
        console.log("Response data:", response);
        console.log("Fetched recent matches:", response.data);
      } catch (error) {
        toast.error("Failed to fetch matches!");
      }
    };
    fetchRecentMatches();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-2 py-10">
      <div className="w-full max-w-2xl rounded-3xl p-8">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-center tracking-widest drop-shadow-lg text-blue-700">
          <span className="mr-3">🏏</span> Cric Score
        </h1>
        <div className="flex flex-col md:flex-row md:justify-center gap-6 mb-10">
          <button
            onClick={() => navigate("/creatematch")}
            className="flex-1 px-8 py-4 font-bold rounded-xl shadow-md transition-all duration-300"
          >
            ➕ Create New Match
          </button>
          <button
            onClick={() => navigate("/allmatches")}
            className="flex-1 px-8 py-4 font-bold rounded-xl shadow-md transition-all duration-300"
          >
            📜 View All Matches
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-center tracking-wide text-blue-500">
          Recent Matches
        </h2>
        {recentMatches.length === 0 ? (
          <p className="text-gray-500 text-center">No matches yet.</p>
        ) : (
          <ul className="space-y-6">
            {recentMatches.map((match, index) => (
              <li
                key={match._id || index}
                className="cursor-pointer p-5 rounded-2xl shadow flex flex-col md:flex-row md:items-center md:justify-between transition-transform duration-200"
                onClick={() => navigate(`/singlematch/${match._id}`)}
                title="Click to view details"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-bold text-lg text-blue-600">
                    {match.teamA || "Team A"}
                  </span>
                  <span className="font-mono mx-2 text-yellow-600">
                    ({match.teamAScore?.runs ?? 0}/{match.teamAScore?.wickets ?? 0})
                  </span>
                  <span className="font-bold text-lg text-pink-500">vs</span>
                  <span className="font-bold mx-2 text-lg text-pink-500">
                    {match.teamB || "Team B"}
                  </span>
                  <span className="font-mono text-yellow-600">
                    ({match.teamBScore?.runs ?? 0}/{match.teamBScore?.wickets ?? 0})
                  </span>
                </div>
                <span className="text-sm font-semibold mt-2 md:mt-0 text-blue-500">
                  {match.result || ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <style>
        {`
          body {
            background-color: #0d1117;
          }
          .min-h-screen {
            background: radial-gradient(circle at center, #1a2736 0%, #0d1117 100%);
            color: #c9d1d9;
          }
          .bg-white {
            background-color: rgba(22, 27, 34, 0.6);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(50, 60, 70, 0.4);
            box-shadow: 0 0 20px rgba(50, 205, 50, 0.3),
                        0 0 40px rgba(255, 69, 0, 0.2),
                        0 0 60px rgba(30, 144, 255, 0.1);
          }
          .text-blue-700 {
            color: #87ceeb;
            text-shadow: 0 0 10px #87ceeb,
                         0 0 20px #87ceeb,
                         0 0 40px #87ceeb,
                         0 0 80px rgba(135, 206, 235, 0.5);
            transition: all 0.4s ease-in-out;
          }
          .text-blue-700:hover {
            transform: scale(1.05);
          }
          button {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: linear-gradient(45deg, rgba(30, 144, 255, 0.2), rgba(255, 69, 0, 0.2), rgba(50, 205, 50, 0.2));
            color: #c9d1d9;
            box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);
          }
          button:hover {
            background: linear-gradient(45deg, rgba(30, 144, 255, 0.4), rgba(255, 69, 0, 0.4), rgba(50, 205, 50, 0.4));
            box-shadow: 0 0 15px rgba(30, 144, 255, 0.6),
                        0 0 30px rgba(255, 69, 0, 0.4),
                        0 0 45px rgba(50, 205, 50, 0.2);
            color: #ffffff;
          }
          .text-blue-500 {
            color: #90ee90;
            text-shadow: 0 0 8px #90ee90, 0 0 16px #90ee90;
          }
          li {
            background: rgba(30, 144, 255, 0.1);
            border: 1px solid #1e90ff;
            box-shadow: 0 0 10px rgba(30, 144, 255, 0.3);
            transition: all 0.3s ease;
          }
          li:hover {
            background: rgba(255, 69, 0, 0.1);
            border-color: #ff4500;
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 0 15px rgba(255, 69, 0, 0.5), 0 0 25px rgba(255, 69, 0, 0.3);
          }
          .text-blue-600 { color: #1e90ff; text-shadow: 0 0 5px #1e90ff; }
          .text-yellow-600 { color: #ffff00; text-shadow: 0 0 5px #ffff00; }
          .text-pink-500 { color: #ff69b4; text-shadow: 0 0 5px #ff69b4; }
          .text-sm { color: #90ee90; }
          .text-gray-500 { color: #7f8c8d; }
          .drop-shadow-lg {
            text-shadow: 0 0 5px rgba(135, 206, 235, 0.8), 0 0 10px rgba(135, 206, 235, 0.6);
          }
        `}
      </style>
    </div>
  );
}

export default HomePage; 