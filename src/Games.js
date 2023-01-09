import React from 'react';
import { useState, useEffect } from "react";
import {  Link } from 'react-router-dom';

function gameLink(id, away_team_name, home_team_name, status, game_date, nhl_player_game_stats_count) {
  if (nhl_player_game_stats_count == 0) {
    return(
      <div key={id}>
        <a>{away_team_name} vs {home_team_name} ({status} {game_date})</a>
      </div>
    )
  }

  return(
    <div key={id}>
      <Link to={`/players/${id}`}>{away_team_name} vs {home_team_name} ({status} {game_date})</Link>
    </div>
  )
}

export default function Games() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_API_URI}/nhl_games`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Live Games</h1>
      {(data && data.live_games.length == 0) && <div>No Data</div>}
      <ul>
        <ul>
          {data &&
            data.live_games.map(({ id, link, status, away_team_name, home_team_name, game_date, nhl_player_game_stats_count }) => (
              gameLink(id, away_team_name, home_team_name, status, game_date, nhl_player_game_stats_count)
            ))}
        </ul>
      </ul>

      <h1>Other Games</h1>
      <ul>
        <ul>
          {data &&
            data.other_games.map(({ id, link, status, away_team_name, home_team_name, game_date, nhl_player_game_stats_count }) => (
              gameLink(id, away_team_name, home_team_name, status, game_date, nhl_player_game_stats_count)
            ))}
        </ul>
      </ul>
    </div>
  );
}