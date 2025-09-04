import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SingleMatchPage() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatch = async () => {
      
      try {
        
        const response = await axios.get(`http://localhost:2020/matches/${id}`);
        setMatch(response.data);

      } catch (error) {
        setMatch(null);
        console.log(error);
      }
    };
    fetchMatch();
  }, [id]);


  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Match not found.</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-400 text-white rounded-xl shadow hover:bg-blue-500 transition"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    );
  }

  // Add this block to show the full JSON for debugging (remove/comment after debugging)
  // <pre className="bg-gray-100 text-xs p-2 rounded mb-4">{JSON.stringify(match, null, 2)}</pre>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 py-10 px-2">
      <div className="w-full max-w-xl bg-white bg-opacity-90 rounded-3xl shadow-xl p-8 border-2 border-blue-200">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 tracking-widest drop-shadow-lg">
          🏏 Match Details
        </h2>
        {/* Debug: Show raw JSON (remove/comment after debugging) */}
        {/* <pre className="bg-gray-100 text-xs p-2 rounded mb-4">{JSON.stringify(match, null, 2)}</pre> */}
        <div className="mb-6 text-center">
          <span className="font-bold text-blue-600 text-2xl">
            {match.teamA}
          </span>
          <span className="text-yellow-600 font-mono mx-2 text-xl">
            ({match.teamAScore?.runs ?? 0}/{match.teamAScore?.wickets ?? 0})
          </span>
          <span className="text-pink-500 font-bold text-2xl">vs</span>
          <span className="font-bold text-pink-500 mx-2 text-2xl">
            {match.teamB}
          </span>
          <span className="text-yellow-600 font-mono text-xl">
            ({match.teamBScore?.runs ?? 0}/{match.teamBScore?.wickets ?? 0})
          </span>
        </div>
        <div className="mb-4 text-center">
          <span className="text-lg text-blue-500 font-semibold">
            Result: {match.result}
          </span>
        </div>
        <div className="mb-4 text-center">
          <span className="text-gray-500 text-sm">
            Played At: {match.createdAt ? new Date(match.createdAt).toLocaleString() : "N/A"}
          </span>
        </div>
        <div className="mb-4 text-center">
          <span className="text-blue-600 font-semibold">Team A Balls: </span>
          <span className="text-black">{match.teamAScore?.balls ?? 0}</span>
          <span className="text-blue-600 font-semibold ml-4">Team B Balls: </span>
          <span className="text-black">{match.teamBScore?.balls ?? 0}</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-200 via-blue-200 to-yellow-200 text-blue-900 font-bold rounded-xl shadow-md hover:scale-105 transition-all duration-300"
        >
          ⬅ Back
        </button>
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

export default SingleMatchPage;