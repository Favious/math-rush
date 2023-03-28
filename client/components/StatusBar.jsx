import React, { useState } from "react";
import styled from "styled-components";

export default function StatusBar() {
  const [playerScore, setPlayerScore] = useState(70);

  return (
    <Status>
      <div
        className="bar first-player-score"
        style={{ width: playerScore + "%" }}
      />
      <div
        className="bar second-player-score "
        style={{ width: 100 - playerScore + "%" }}
      />
    </Status>
  );
}

const Status = styled.div`
  display: flex;
  width: 40%;
  margin: 1rem;
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
  @media screen and (max-width: 700px) {
    width: 80%;
  }
`;
