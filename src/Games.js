import React from 'react';
import { useState, useEffect } from "react";
import {  Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

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
      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
      {(data && data.live_games.length == 0) && <div>No Data</div>}
          {data &&
            data.live_games.map(({ id, link, status, away_team_name, home_team_name, game_date, nhl_player_game_stats_count, fun_facts }) => (
              <div className="col">
                <Container className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg">
                  <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                    {gameLink(id, away_team_name, home_team_name, status, game_date, nhl_player_game_stats_count)}
                  </h3>
                  {fun_facts && fun_facts.map(({ fun_fact }) => (<p>{fun_fact}</p>))}
                </Container>
              </div>
            ))}
      </div>

      <h1>Other Games</h1>
        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          {data &&
            data.other_games.map(({ id, link, status, away_team_name, home_team_name, game_date, nhl_player_game_stats_count, fun_facts }) => (
              <div className="col">
                <Container className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg">
                  <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                    {gameLink(id, away_team_name, home_team_name, status, game_date, nhl_player_game_stats_count)}
                  </h3>
                  {fun_facts && fun_facts.map(({ fun_fact }) => (<p>{fun_fact}</p>))}
                </Container>
              </div>
            ))}
        </div>
    </div>
  );
}