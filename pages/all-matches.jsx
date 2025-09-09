import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AllMatchesPage() {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/matches`);
        setMatches(response.data);
      } catch (error) {
        toast.error("Failed to fetch matches!");
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 flex flex-col items-center py-10 px-2">
      <h2 className="text-4xl font-extrabold mb-8 text-blue-700 tracking-widest drop-shadow-lg">
        🏏 All Matches
      </h2>
      <div className="w-full max-w-2xl bg-white bg-opacity-90 rounded-3xl shadow-xl p-8 border-2 border-blue-200">
        {matches.length === 0 ? (
          <p className="text-gray-500 text-center">No matches yet.</p>
        ) : (
          <ul className="space-y-6">
            {matches.map((match, index) => (
              <li
                key={match._id || index}
                className="cursor-pointer p-5 rounded-2xl bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100 shadow border border-blue-300 flex flex-col md:flex-row md:items-center md:justify-between hover:scale-105 transition-transform duration-200"
                onClick={() => navigate(`/singlematch/${match._id}`)}
                title="Click to view details"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-bold text-blue-600 text-lg">
                    {match.teamA || "Team A"}
                  </span>
                  <span className="text-yellow-600 font-mono mx-2">
                    ({match.teamAScore?.runs ?? 0}/{match.teamAScore?.wickets ?? 0})
                  </span>
                  <span className="text-pink-500 font-bold text-lg">vs</span>
                  <span className="font-bold text-pink-500 mx-2 text-lg">
                    {match.teamB || "Team B"}
                  </span>
                  <span className="text-yellow-600 font-mono">
                    ({match.teamBScore?.runs ?? 0}/{match.teamBScore?.wickets ?? 0})
                  </span>
                </div>
                <span className="text-sm text-blue-500 font-semibold mt-2 md:mt-0">
                  {match.result || ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <style>
        {`
          .drop-shadow-lg {
            text-shadow: 0 2px 8px #bdbdbd;
          }
        `}
      </style>
    </div>
  );
}

export default AllMatchesPage;