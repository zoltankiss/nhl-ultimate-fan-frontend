import React from 'react';
import { useState, useEffect } from "react";
import {  Link } from 'react-router-dom';

export default function Games() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


   useEffect(() => {
    fetch(`https://nhlultimatefan.herokuapp.com/nhl_games`)
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
    <ul>
      <ul>
        {data &&
          data.map(({ id, link, status, away_team_name, home_team_name, game_date }) => (
            <div key={id}>
              <Link to={`/players/${id}`}>{away_team_name} vs {home_team_name} ({status} {game_date})</Link>
            </div>
          ))}
      </ul>
    </ul>
  );
}