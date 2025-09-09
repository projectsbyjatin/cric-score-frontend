// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// function CricketMatch() {
//   const [teamA, setTeamA] = useState("");
//   const [teamB, setTeamB] = useState("");
//   const [overs, setOvers] = useState(2);

//   const [tossWinner, setTossWinner] = useState(null);
//   const [choice, setChoice] = useState("");
//   const [showCoin, setShowCoin] = useState(false);
//   const [coinFlipping, setCoinFlipping] = useState(false);

//   const [innings, setInnings] = useState(0);
//   const [firstInningsTeam, setFirstInningsTeam] = useState("");
//   const [secondInningsTeam, setSecondInningsTeam] = useState("");

//   const [firstInningsScore, setFirstInningsScore] = useState({ runs: 0, wickets: 0, balls: 0 });
//   const [secondInningsScore, setSecondInningsScore] = useState({ runs: 0, wickets: 0, balls: 0 });

//   const [matchOver, setMatchOver] = useState(false);
//   const [result, setResult] = useState("");

//   const navigate = useNavigate();
//   const totalBalls = overs * 6;

//   const handleToss = () => {
//     setCoinFlipping(true);
//     setShowCoin(true);
//     setTimeout(() => {
//       const winner = Math.random() < 0.5 ? teamA : teamB;
//       setTossWinner(winner);
//       setCoinFlipping(false);
//     }, 1500);
//   };

//   const startMatch = (selectedChoice) => {
//     setChoice(selectedChoice);
//     // Determine batting order
//     if (tossWinner === teamA) {
//       if (selectedChoice === "bat") {
//         setFirstInningsTeam(teamA);
//         setSecondInningsTeam(teamB);
//       } else {
//         setFirstInningsTeam(teamB);
//         setSecondInningsTeam(teamA);
//       }
//     } else {
//       if (selectedChoice === "bat") {
//         setFirstInningsTeam(teamB);
//         setSecondInningsTeam(teamA);
//       } else {
//         setFirstInningsTeam(teamA);
//         setSecondInningsTeam(teamB);
//       }
//     }
//     setInnings(1);
//   };

//   const updateScore = (runs, isWicket, isExtra) => {
//     if (innings === 1) {
//       let newData = { ...firstInningsScore };
//       if (isWicket) {
//         newData.wickets += 1;
//         newData.balls += 1;
//       } else if (isExtra) {
//         newData.runs += runs;
//       } else {
//         newData.runs += runs;
//         newData.balls += 1;
//       }
//       setFirstInningsScore(newData);

//       if (newData.wickets >= 10 || newData.balls >= totalBalls) {
//         setInnings(2);
//       }
//     } else if (innings === 2) {
//       let newData = { ...secondInningsScore };
//       if (isWicket) {
//         newData.wickets += 1;
//         newData.balls += 1;
//       } else if (isExtra) {
//         newData.runs += runs;
//       } else {
//         newData.runs += runs;
//         newData.balls += 1;
//       }
//       setSecondInningsScore(newData);

//       // End match if win/loss/tie
//       if (newData.runs > firstInningsScore.runs) {
//         setMatchOver(true);
//         setResult(`${secondInningsTeam} Wins!`);
//         setSecondInningsScore(newData);
//         return;
//       }
//       if (newData.wickets >= 10 || newData.balls >= totalBalls) {
//         setMatchOver(true);
//         setSecondInningsScore(newData);
//         if (newData.runs > firstInningsScore.runs) setResult(`${secondInningsTeam} Wins!`);
//         else if (newData.runs < firstInningsScore.runs) setResult(`${firstInningsTeam} Wins!`);
//         else setResult("Match Tied!");
//         return;
//       }
//     }
//   };

//   const handleSaveMatch = async () => {
//     const matchData = {
//       teamA,
//       teamB,
//       // Save scores with correct mapping
//       [firstInningsTeam === teamA ? "teamAScore" : "teamBScore"]: firstInningsScore,
//       [secondInningsTeam === teamA ? "teamAScore" : "teamBScore"]: secondInningsScore,
//       result,
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       await axios.post("http://localhost:2020/allmatches", matchData);
//       toast("✅ Match Saved Successfully to Database!");
//       navigate("/");
//       console.log(matchData);
//     } catch (error) {
//       toast("❌ Failed to save match. Please try again.");
//       console.error(error);
//     }
//   };

//   const handleBackToHome = () => {
//     navigate("/");
//   };

//   return (
//     <div className="max-w-3xl mx-auto text-center bg-white p-6 rounded-2xl shadow-xl">
//       {!innings && !matchOver ? (
//         <div>
//           <h2 className="text-2xl font-bold text-purple-700 mb-4">
//             Create New Match
//           </h2>
//           <input
//             type="text"
//             placeholder="Team A"
//             value={teamA}
//             onChange={(e) => setTeamA(e.target.value)}
//             className="p-2 border rounded-lg m-2"
//           />
//           <input
//             type="text"
//             placeholder="Team B"
//             value={teamB}
//             onChange={(e) => setTeamB(e.target.value)}
//             className="p-2 border rounded-lg m-2"
//           />
//           <br />
//           <label className="font-semibold">Overs: </label>
//           <input
//             type="number"
//             value={overs}
//             onChange={(e) => setOvers(Number(e.target.value))}
//             min="1"
//             max="50"
//             className="p-2 border rounded-lg m-2 w-20"
//           />
//           <br />

//           <button
//             onClick={handleToss}
//             className="mt-4 px-6 py-3 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:bg-yellow-500 transition"
//           >
//             Toss Coin
//           </button>

//           {showCoin && (
//             <div
//               className={`w-24 h-24 mx-auto mt-6 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center text-xl font-bold text-white ${
//                 coinFlipping ? "animate-spin" : ""
//               }`}
//             >
//               🪙
//             </div>
//           )}

//           {tossWinner && (
//             <div className="mt-6">
//               <h3 className="text-lg font-semibold">{tossWinner} won the toss</h3>
//               <button
//                 onClick={() => startMatch("bat")}
//                 className="px-4 py-2 bg-green-500 text-white rounded-lg m-2 hover:bg-green-600"
//               >
//                 Bat
//               </button>
//               <button
//                 onClick={() => startMatch("bowl")}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg m-2 hover:bg-blue-600"
//               >
//                 Bowl
//               </button>
//             </div>
//           )}
//         </div>
//       ) : !matchOver ? (
//         <div>
//           <h2 className="text-2xl font-bold text-purple-700 mb-4">
//             {innings === 1 ? firstInningsTeam : secondInningsTeam} Batting
//           </h2>
//           <p className="text-lg font-semibold text-gray-700">
//             {firstInningsTeam}: {firstInningsScore.runs}/{firstInningsScore.wickets} ({Math.floor(firstInningsScore.balls / 6)}.{firstInningsScore.balls % 6})
//           </p>
//           <p className="text-lg font-semibold text-gray-700">
//             {secondInningsTeam}: {secondInningsScore.runs}/{secondInningsScore.wickets} ({Math.floor(secondInningsScore.balls / 6)}.{secondInningsScore.balls % 6})
//           </p>
//           <div className="grid grid-cols-3 gap-4 mt-6">
//             <button onClick={() => updateScore(0, false, false)} className="px-4 py-2 bg-gray-500 text-white rounded-xl shadow hover:bg-red-600">Dot Ball</button>
//             <button onClick={() => updateScore(1, false, false)} className="px-4 py-2 bg-gray-100 rounded-xl shadow hover:bg-gray-200">1 Run</button>
//             <button onClick={() => updateScore(2, false, false)} className="px-4 py-2 bg-gray-100 rounded-xl shadow hover:bg-gray-200">2 Runs</button>
//             <button onClick={() => updateScore(3, false, false)} className="px-4 py-2 bg-gray-100 rounded-xl shadow hover:bg-gray-200">3 Runs</button>
//             <button onClick={() => updateScore(4, false, false)} className="px-4 py-2 bg-blue-400 text-white rounded-xl shadow hover:bg-blue-500">Four</button>
//             <button onClick={() => updateScore(6, false, false)} className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600">Six</button>
//             <button onClick={() => updateScore(0, true, false)} className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600">Wicket</button>
//             <button onClick={() => updateScore(1, false, true)} className="px-4 py-2 bg-yellow-400 rounded-xl shadow hover:bg-yellow-500">Wide</button>
//             <button onClick={() => updateScore(1, false, true)} className="px-4 py-2 bg-yellow-400 rounded-xl shadow hover:bg-yellow-500">No Ball</button>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <h2 className="text-2xl font-bold text-purple-700 mb-4">Match Over</h2>
//           <p className="text-lg">
//             {firstInningsTeam}: {firstInningsScore.runs}/{firstInningsScore.wickets}
//           </p>
//           <p className="text-lg">
//             {secondInningsTeam}: {secondInningsScore.runs}/{secondInningsScore.wickets}
//           </p>
//           <h3 className="mt-4 text-xl font-semibold">{result}</h3>
//           <button
//             onClick={handleSaveMatch}
//             className="mt-6 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600"
//           >
//             💾 Save Match
//           </button>
//           <button
//             onClick={handleBackToHome}
//             className="mt-6 px-6 py-3 bg-gray-300 rounded-xl hover:bg-gray-400 ml-4"
//           >
//             ⬅ Back to Home
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CricketMatch;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CricketMatch() {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [overs, setOvers] = useState(2);

  const [tossWinner, setTossWinner] = useState(null);
  const [choice, setChoice] = useState("");
  const [showCoin, setShowCoin] = useState(false);
  const [coinFlipping, setCoinFlipping] = useState(false);

  const [innings, setInnings] = useState(0);
  const [firstInningsTeam, setFirstInningsTeam] = useState("");
  const [secondInningsTeam, setSecondInningsTeam] = useState("");

  const [firstInningsScore, setFirstInningsScore] = useState({ runs: 0, wickets: 0, balls: 0 });
  const [secondInningsScore, setSecondInningsScore] = useState({ runs: 0, wickets: 0, balls: 0 });

  const [matchOver, setMatchOver] = useState(false);
  const [result, setResult] = useState("");

  const navigate = useNavigate();
  const totalBalls = overs * 6;

  const handleToss = () => {
    setCoinFlipping(true);
    setShowCoin(true);
    setTimeout(() => {
      const winner = Math.random() < 0.5 ? teamA : teamB;
      setTossWinner(winner);
      setCoinFlipping(false);
    }, 1500);
  };

  const startMatch = (selectedChoice) => {
    setChoice(selectedChoice);
    // Determine batting order
    if (tossWinner === teamA) {
      if (selectedChoice === "bat") {
        setFirstInningsTeam(teamA);
        setSecondInningsTeam(teamB);
      } else {
        setFirstInningsTeam(teamB);
        setSecondInningsTeam(teamA);
      }
    } else {
      if (selectedChoice === "bat") {
        setFirstInningsTeam(teamB);
        setSecondInningsTeam(teamA);
      } else {
        setFirstInningsTeam(teamA);
        setSecondInningsTeam(teamB);
      }
    }
    setInnings(1);
  };

  const updateScore = (runs, isWicket, isExtra) => {
    if (innings === 1) {
      let newData = { ...firstInningsScore };
      if (isWicket) {
        newData.wickets += 1;
        newData.balls += 1;
      } else if (isExtra) {
        newData.runs += runs;
      } else {
        newData.runs += runs;
        newData.balls += 1;
      }
      setFirstInningsScore(newData);

      if (newData.wickets >= 10 || newData.balls >= totalBalls) {
        setInnings(2);
      }
    } else if (innings === 2) {
      let newData = { ...secondInningsScore };
      if (isWicket) {
        newData.wickets += 1;
        newData.balls += 1;
      } else if (isExtra) {
        newData.runs += runs;
      } else {
        newData.runs += runs;
        newData.balls += 1;
      }
      setSecondInningsScore(newData);

      // End match if win/loss/tie
      if (newData.runs > firstInningsScore.runs) {
        setMatchOver(true);
        setResult(`${secondInningsTeam} Wins!`);
        setSecondInningsScore(newData);
        return;
      }
      if (newData.wickets >= 10 || newData.balls >= totalBalls) {
        setMatchOver(true);
        setSecondInningsScore(newData);
        if (newData.runs > firstInningsScore.runs) setResult(`${secondInningsTeam} Wins!`);
        else if (newData.runs < firstInningsScore.runs) setResult(`${firstInningsTeam} Wins!`);
        else setResult("Match Tied!");
        return;
      }
    }
  };

  const handleSaveMatch = async () => {
    const matchData = {
      teamA,
      teamB,
      // Save scores with correct mapping
      [firstInningsTeam === teamA ? "teamAScore" : "teamBScore"]: firstInningsScore,
      [secondInningsTeam === teamA ? "teamAScore" : "teamBScore"]: secondInningsScore,
      result,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post(`https://cric-score-vhpw.onrender.com/allmatches`, matchData);
      toast("✅ Match Saved Successfully to Database!");
      navigate("/");
      console.log(matchData);
    } catch (error) {
      toast("❌ Failed to save match. Please try again.");
      console.error(error);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };
  // ...all your state and logic...

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-pink-200 to-yellow-100 py-10 px-2">
      <div className="w-full max-w-2xl bg-white bg-opacity-95 rounded-3xl shadow-2xl p-8 border-2 border-blue-200">
        {!innings && !matchOver ? (
          <div>
            <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 tracking-widest drop-shadow-lg">
              Create New Match
            </h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4 justify-center">
              <input
                type="text"
                placeholder="Team A"
                value={teamA}
                onChange={(e) => setTeamA(e.target.value)}
                className="flex-1 p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-pink-400 transition bg-blue-50 text-blue-900"
              />
              <input
                type="text"
                placeholder="Team B"
                value={teamB}
                onChange={(e) => setTeamB(e.target.value)}
                className="flex-1 p-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-blue-400 transition bg-pink-50 text-pink-900"
              />
              <input
                type="number"
                value={overs}
                onChange={(e) => setOvers(Number(e.target.value))}
                min="1"
                max="50"
                className="w-24 p-3 border-2 border-yellow-200 rounded-xl focus:outline-none focus:border-blue-400 transition bg-yellow-50 text-yellow-900"
                placeholder="Overs"
              />
            </div>
            <button
              onClick={handleToss}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 text-blue-900 font-bold rounded-xl shadow-md hover:scale-105 transition-all duration-300"
            >
              Toss Coin
            </button>
            {showCoin && (
              <div
                className={`w-24 h-24 mx-auto mt-6 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center text-3xl font-bold text-white ${
                  coinFlipping ? "animate-spin" : ""
                }`}
              >
                🪙
              </div>
            )}
            {tossWinner && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-blue-600">{tossWinner} won the toss</h3>
                <button
                  onClick={() => startMatch("bat")}
                  className="px-6 py-2 bg-green-400 text-white rounded-xl m-2 hover:bg-green-500 transition"
                >
                  Bat
                </button>
                <button
                  onClick={() => startMatch("bowl")}
                  className="px-6 py-2 bg-blue-400 text-white rounded-xl m-2 hover:bg-blue-500 transition"
                >
                  Bowl
                </button>
              </div>
            )}
          </div>
        ) : !matchOver ? (
          <div>
            <h2 className="text-2xl font-bold text-pink-500 mb-4">
              {innings === 1 ? firstInningsTeam : secondInningsTeam} Batting
            </h2>
            <div className="flex flex-col md:flex-row md:justify-center gap-4 mb-4">
              <p className="text-lg font-semibold text-blue-700 bg-blue-100 rounded-xl px-4 py-2">
                {firstInningsTeam}: {firstInningsScore.runs}/{firstInningsScore.wickets} ({Math.floor(firstInningsScore.balls / 6)}.{firstInningsScore.balls % 6})
              </p>
              <p className="text-lg font-semibold text-pink-700 bg-pink-100 rounded-xl px-4 py-2">
                {secondInningsTeam}: {secondInningsScore.runs}/{secondInningsScore.wickets} ({Math.floor(secondInningsScore.balls / 6)}.{secondInningsScore.balls % 6})
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <button onClick={() => updateScore(0, false, false)} className="px-4 py-2 bg-gray-500 text-white rounded-xl shadow hover:bg-gray-600">Dot Ball</button>
              <button onClick={() => updateScore(1, false, false)} className="px-4 py-2 bg-blue-100 text-blue-900 rounded-xl shadow hover:bg-blue-200">1 Run</button>
              <button onClick={() => updateScore(2, false, false)} className="px-4 py-2 bg-blue-100 text-blue-900 rounded-xl shadow hover:bg-blue-200">2 Runs</button>
              <button onClick={() => updateScore(3, false, false)} className="px-4 py-2 bg-pink-100 text-pink-900 rounded-xl shadow hover:bg-pink-200">3 Runs</button>
              <button onClick={() => updateScore(4, false, false)} className="px-4 py-2 bg-yellow-300 text-yellow-900 rounded-xl shadow hover:bg-yellow-400">Four</button>
              <button onClick={() => updateScore(6, false, false)} className="px-4 py-2 bg-green-400 text-white rounded-xl shadow hover:bg-green-500">Six</button>
              <button onClick={() => updateScore(0, true, false)} className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600">Wicket</button>
              <button onClick={() => updateScore(1, false, true)} className="px-4 py-2 bg-yellow-200 text-yellow-900 rounded-xl shadow hover:bg-yellow-300">Wide</button>
              <button onClick={() => updateScore(1, false, true)} className="px-4 py-2 bg-yellow-200 text-yellow-900 rounded-xl shadow hover:bg-yellow-300">No Ball</button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-green-500 mb-4">Match Over</h2>
            <div className="flex flex-col md:flex-row md:justify-center gap-4 mb-4">
              <p className="text-lg font-semibold text-blue-700 bg-blue-100 rounded-xl px-4 py-2">
                {firstInningsTeam}: {firstInningsScore.runs}/{firstInningsScore.wickets}
              </p>
              <p className="text-lg font-semibold text-pink-700 bg-pink-100 rounded-xl px-4 py-2">
                {secondInningsTeam}: {secondInningsScore.runs}/{secondInningsScore.wickets}
              </p>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-center text-blue-600">{result}</h3>
            <button
              onClick={handleSaveMatch}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-green-300 via-blue-200 to-pink-200 text-blue-900 font-bold rounded-xl shadow-md hover:scale-105 transition-all duration-300"
            >
              💾 Save Match
            </button>
            <button
              onClick={handleBackToHome}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-200 via-blue-200 to-yellow-200 text-blue-900 font-bold rounded-xl shadow-md hover:scale-105 transition-all duration-300 ml-4"
            >
              ⬅ Back to Home
            </button>
          </div>
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

export default CricketMatch;