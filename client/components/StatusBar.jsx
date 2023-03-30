import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function StatusBar({ operationsMade }) {
  const [playerScore, setPlayerScore] = useState(50);

  useEffect(() => {
    setPlayerScore(operationsMade * 5 + 50);
  }, [operationsMade]);

  return (
    <Status>
      <div className="score">{operationsMade}/10</div>
      <div className="bar-container">
        <div
          className="bar first-player-score"
          style={{ width: playerScore + "%" }}
        />
        <div
          className="bar second-player-score "
          style={{ width: 100 - playerScore + "%" }}
        />
      </div>
    </Status>
  );
}

const Status = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 1rem;

  .score {
    width: 100%;
    text-align: end;
    user-select: none;
  }

  .bar-container {
    display: flex;
    width: 100%;
    flex-direction: row;
    .bar {
      height: 10px;
    }

    .first-player-score {
      background-color: rgb(91, 4, 250);
      box-shadow: inset 0px 0px 10px 2px rgba(91, 4, 250, 0.5),
        0px 0px 20px rgba(91, 4, 250, 0.5);
      -webkit-animation: pulse 0.6s alternate infinite;
      @keyframes pulse {
        0% {
          background: #9ab8f4;
          background-position: -100% 0;
          box-shadow: inset 0px 0px 10px 2px rgba(91, 4, 250, 0.5),
            0px 0px 40px 2px rgba(91, 4, 250, 1);
        }
        100% {
          background: rgb(85, 45, 158);
          background-position: 200% 0;
          box-shadow: inset 0px 0px 10px 2px rgba(93, 93, 178, 0.5),
            0px 0px 30px 2px rgba(105, 135, 255, 0.3);
        }
      }
    }

    .second-player-score {
      background-color: #f21c48;
    }
  }
  @media screen and (max-width: 700px) {
    width: 80%;
  }
`;
