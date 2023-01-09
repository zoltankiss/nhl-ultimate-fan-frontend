import React from 'react';
import { useState, useEffect } from "react";
import {  Link, useParams } from 'react-router-dom';

export default function Players() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let { nhl_game_id } = useParams();

  useEffect(() => {
    fetch(`https://nhlultimatefan.herokuapp.com/nhl_games/${nhl_game_id}/nhl_player_game_stats`)
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
    <table className="table table-striped table-sm">
      <thead>
        <tr>
          <td className="tableHeader" scope="col">player id</td>
          <td className="tableHeader" scope="col">player name</td>
          <td className="tableHeader" scope="col">team id</td>
          <td className="tableHeader" scope="col">team name</td>
          <td className="tableHeader" scope="col">player age</td>
          <td className="tableHeader" scope="col">player number</td>
          <td className="tableHeader" scope="col">player position</td>
          <td className="tableHeader" scope="col">assists</td>
          <td className="tableHeader" scope="col">goals</td>
          <td className="tableHeader" scope="col">hits</td>
          <td className="tableHeader" scope="col">points</td>
          <td className="tableHeader" scope="col">penalty minutes</td>
          <td className="tableHeader" scope="col">opponent minutes</td>
          <td className="tableHeader" scope="col">opponent team</td>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((
            {
              player_id,
              player_name,
              team_id,
              team_name,
              player_age,
              player_number,
              player_position,
              assists,
              goals,
              hits,
              points,
              penalty_minutes,
              opponent_minutes,
              opponent_team
            }) => (
            <tr key={player_id}>
              <td>{ player_id }</td>
              <td>{ player_name }</td>
              <td>{ team_id }</td>
              <td>{ team_name }</td>
              <td>{ player_age }</td>
              <td>{ player_number }</td>
              <td>{ player_position }</td>
              <td>{ assists }</td>
              <td>{ goals }</td>
              <td>{ hits }</td>
              <td>{ points }</td>
              <td>{ penalty_minutes }</td>
              <td>{ opponent_minutes }</td>
              <td>{ opponent_team }</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
