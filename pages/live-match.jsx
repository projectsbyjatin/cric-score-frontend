// src/pages/MatchLive.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../src/api';

export default function MatchLive() {
  const { id } = useParams();
  const nav = useNavigate();
  const [m, setM] = useState(null);

  const load = () => api.get(`/matches/${id}`).then(res => setM(res.data));
  useEffect(() => { load(); }, [id]);

  const send = async (payload) => {
    const res = await api.patch(`/matches/${id}/ball`, payload);
    setM(res.data);
  };

  const endInnings = async () => {
    const res = await api.post(`/matches/${id}/end-innings`);
    setM(res.data);
  };

  if (!m) return <div className="p-6 text-white">Loading...</div>;
  const done = m.status === 'Completed';

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{m.teamA} vs {m.teamB}</h1>
        <button onClick={()=>nav('/')} className="text-gray-300 hover:underline">⬅ Home</button>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-4">
        <div className="bg-gray-800 rounded p-4">
          <div className="font-semibold">{m.innings1.team} (Innings 1)</div>
          <div>{m.innings1.runs}/{m.innings1.wickets} • {Math.floor(m.innings1.balls/6)}.{m.innings1.balls%6} ov</div>
        </div>
        <div className="bg-gray-800 rounded p-4">
          <div className="font-semibold">{m.innings2.team} (Innings 2)</div>
          <div>{m.innings2.runs}/{m.innings2.wickets} • {Math.floor(m.innings2.balls/6)}.{m.innings2.balls%6} ov</div>
        </div>
      </div>

      {done ? (
        <div className="mt-4 p-4 bg-green-700 rounded">
          <div className="text-lg font-bold">Result: {m.result}</div>
          <button onClick={()=>nav('/')} className="mt-3 px-4 py-2 bg-gray-600 rounded">⬅ Back to Home</button>
        </div>
      ) : (
        <>
          <div className="mt-4 text-sm text-gray-300">
            Current Innings: {m.currentInnings} • Status: {m.status}
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4">
            <button onClick={()=>send({ event:'run', runs:1 })} className="px-4 py-3 bg-gray-700 rounded">1</button>
            <button onClick={()=>send({ event:'run', runs:2 })} className="px-4 py-3 bg-gray-700 rounded">2</button>
            <button onClick={()=>send({ event:'run', runs:3 })} className="px-4 py-3 bg-gray-700 rounded">3</button>
            <button onClick={()=>send({ event:'run', runs:4 })} className="px-4 py-3 bg-blue-600 rounded">4</button>
            <button onClick={()=>send({ event:'run', runs:6 })} className="px-4 py-3 bg-green-600 rounded">6</button>
            <button onClick={()=>send({ event:'wicket' })} className="px-4 py-3 bg-red-600 rounded">Wicket</button>
            <button onClick={()=>send({ event:'wide', runs:1 })} className="px-4 py-3 bg-yellow-500 rounded text-black">Wide +1</button>
            <button onClick={()=>send({ event:'no_ball', batRuns:0 })} className="px-4 py-3 bg-yellow-500 rounded text-black">No Ball +1</button>
            <button onClick={()=>send({ event:'no_ball', batRuns:4 })} className="px-4 py-3 bg-yellow-500 rounded text-black">NB +4</button>
            <button onClick={endInnings} className="px-4 py-3 bg-purple-600 rounded col-span-3 md:col-span-1">End Innings</button>
          </div>
        </>
      )}
    </div>
  );
}
