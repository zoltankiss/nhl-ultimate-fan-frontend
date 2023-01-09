import React from 'react';
import { useState, useEffect } from "react";
import {  Link } from 'react-router-dom';

export default function Games() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


   useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_API_URI}/background_processes`)
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
      <h1>Background Processes</h1>
      <table className="table table-striped table-sm">
      <thead>
        <tr>
          <td className="tableHeader" scope="col">job name</td>
          <td className="tableHeader" scope="col">ran at</td>
          <td className="tableHeader" scope="col">further info</td>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map(({ id, job_name, label, created_at }) => (
            <tr key={id}>
              <td>{ job_name }</td>
              <td>{ created_at }</td>
              <td>{ label }</td>
            </tr>
          ))}
      </tbody>
      </table>
    </div>
  );
}