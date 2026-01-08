import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import toast from 'react-hot-toast';
import { FaMedal } from 'react-icons/fa';
import API from '../api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const { data } = await API.get('/reports/leaderboard');

        const leaderboardWithPoints = data.map(user => ({
          ...user,
          points: user.reportCount * 100
        }));

        setLeaderboard(leaderboardWithPoints);
      } catch (error) {
        toast.error('Could not fetch leaderboard data.');
        console.error('Failed to fetch leaderboard', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalColor = (rank) => {
    if (rank === 1) return '#FFD700'; // Gold
    if (rank === 2) return '#C0C0C0'; // Silver
    if (rank === 3) return '#CD7F32'; // Bronze
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Top Citizen Contributors</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow-md overflow-hidden">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Rank</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Citizen</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Reports Submitted</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaderboard.length > 0 ? (
                leaderboard.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 flex items-center gap-1 font-semibold">
                      {getMedalColor(user.rank) && (
                        <FaMedal style={{ color: getMedalColor(user.rank) }} />
                      )}
                      {user.rank}
                    </td>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.reportCount}</td>
                    <td className="px-4 py-3 font-semibold">{user.points}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No reports have been submitted yet. Be the first!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
