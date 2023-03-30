import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { useRouter } from "next/router";
import Container from "@/components/Container";

let socket;
const ENDPOINT = "http://localhost:8000";
//const ENDPOINT = "https://uno-online-multiplayer.herokuapp.com/";

export default function Game(props) {
  const router = useRouter();
  const { roomCode } = router.query;

  //initialize socket state
  const [room, setRoom] = useState(roomCode);
  const [roomFull, setRoomFull] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connectionOptions = {
      forceNew: true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };
    socket = io.connect(ENDPOINT, connectionOptions);

    socket.emit("join", { room: room }, (error) => {
      if (error) setRoomFull(true);
    });

    //cleanup on component unmount
    return function cleanup() {
      socket.emit("clientDisconnect");
      //shut down connnection instance
      socket.off();
    };
  }, []);

  //initialize game state
  const [gameOver, setGameOver] = useState(true);
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState("");

  const [currentNumber, setCurrentNumber] = useState("");

  //runs once on component mount
  useEffect(() => {
    //shuffle PACK_OF_CARDS array
  }, []);

  useEffect(() => {
    socket.on("initGameState", ({ gameOver, turn, currentNumber }) => {
      setGameOver(gameOver);
      setTurn(turn);
      setCurrentNumber(currentNumber);
    });

    socket.on(
      "updateGameState",
      ({ gameOver, winner, turn, currentNumber }) => {
        gameOver && setGameOver(gameOver);
        gameOver === true && playGameOverSound();
        winner && setWinner(winner);
        turn && setTurn(turn);
        currentNumber && setCurrentNumber(currentNumber);
        setUnoButtonPressed(false);
      }
    );

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("currentUserData", ({ name }) => {
      setCurrentUser(name);
    });
  }, []);

  return (
    <GameLayout>
      {!roomFull ? (
        <>
          {users.length !== 2 && (
            <div className="game-code">
              <h1>
                Game code:
                <span style={{ userSelect: "text" }}> {room}</span>
              </h1>
              {/* <h1>
              Share game link {`http://localhost:3000/play?roomCode=${room}`}
            </h1> */}
            </div>
          )}

          {/* PLAYER LEFT MESSAGES */}
          {users.length === 1 && currentUser === "Player 2" && (
            <h1 className="waiting-message">Player 1 has left the game.</h1>
          )}
          {users.length === 1 && currentUser === "Player 1" && (
            <h1 className="waiting-message">
              Waiting for Player 2 to join the game...
            </h1>
          )}
          {users.length === 2 && (
            <>
              {!gameOver ? (
                <div>
                  {winner !== "" && (
                    <>
                      <h1>GAME OVER</h1>
                      <h2>{winner} wins!</h2>
                    </>
                  )}
                </div>
              ) : (
                <div style={{ width: "100%" }}>
                  {/* PLAYER 1 VIEW */}
                  {currentUser === "Player 1" && (
                    <div className="container">
                      <Container />
                    </div>
                  )}
                  {/* PLAYER 2 VIEW */}
                  {currentUser === "Player 2" && (
                    <div className="container">
                      <Container />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <h1>Room full</h1>
      )}

      <br />
      <a href="/">
        <button className="quit-button">QUIT</button>
      </a>
    </GameLayout>
  );
}

const GameLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  .game-code {
    margin: 2rem;
  }

  h1 {
    user-select: none;
  }

  .waiting-message {
    margin: 1rem;
    font-size: 1.5rem;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 60vh;
  }

  .quit-button {
    display: block;
    position: relative;
    margin: 0.5em 0;
    padding: 0.8em 2.2em;
    width: 250px;
    cursor: pointer;

    background: #ffffff;
    border: none;
    border-radius: 0.4em;
    color: black;
    text-transform: uppercase;
    font-size: 1rem;
    font-family: "Work Sans", sans-serif;
    font-weight: 500;
    letter-spacing: 0.04em;

    mix-blend-mode: color-dodge;
    perspective: 500px;
    transform-style: preserve-3d;

    &:before,
    &:after {
      --z: 0px;
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      opacity: 0;
      mix-blend-mode: inherit;
      border-radius: inherit;
      transform-style: preserve-3d;
      transform: translate3d(
        calc(var(--z) * 0px),
        calc(var(--z) * 0px),
        calc(var(--z) * 0px)
      );
    }

    span {
      mix-blend-mode: none;
      display: block;
    }

    &:after {
      background-color: #5d00ff;
    }

    &:before {
      background-color: #ff1731;
    }

    &:hover {
      background-color: #fff65b;
      transition: background 0.3s 0.1s;
    }

    &:hover:before {
      --z: 0.02;
      animation: translateWobble 2.2s ease forwards;
    }

    &:hover:after {
      --z: -0.035;
      animation: translateWobble 2.2s ease forwards;
    }
  }

  @keyframes translateWobble {
    0% {
      opacity: 0;
      transform: translate3d(
        calc(var(--z) * 0px),
        calc(var(--z) * 0px),
        calc(var(--z) * 0px)
      );
    }
    16% {
      transform: translate3d(
        calc(var(--z) * 160px),
        calc(var(--z) * 160px),
        calc(var(--z) * 160px)
      );
    }
    28% {
      opacity: 1;
      transform: translate3d(
        calc(var(--z) * 70px),
        calc(var(--z) * 70px),
        calc(var(--z) * 70px)
      );
    }
    44% {
      transform: translate3d(
        calc(var(--z) * 130px),
        calc(var(--z) * 130px),
        calc(var(--z) * 130px)
      );
    }
    59% {
      transform: translate3d(
        calc(var(--z) * 85px),
        calc(var(--z) * 85px),
        calc(var(--z) * 85px)
      );
    }
    73% {
      transform: translate3d(
        calc(var(--z) * 110px),
        calc(var(--z) * 110px),
        calc(var(--z) * 110px)
      );
    }
    88% {
      opacity: 1;
      transform: translate3d(
        calc(var(--z) * 90px),
        calc(var(--z) * 90px),
        calc(var(--z) * 90px)
      );
    }
    100% {
      opacity: 1;
      transform: translate3d(
        calc(var(--z) * 100px),
        calc(var(--z) * 100px),
        calc(var(--z) * 100px)
      );
    }
  }
`;
