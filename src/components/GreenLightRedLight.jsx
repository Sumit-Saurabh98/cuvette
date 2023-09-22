import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import "../style/GreenLightRedLight.css";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

const GreenLightRedLight = () => {
  const toast = useToast();
  const { level, setName } = useContext(AuthContext);
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  const [singleUser, setSingleUser] = useState({});
  const [isGreen, setGreen] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40);
  const [target, setTarget] = useState(10);

  const getUserData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/users?_sort=score&_order=desc`
    );
    setUser(data);
    setLoading(false);
  };

  const getSingleUser = async (mob) => {
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/users?mobile=${mob}`
    );
    setSingleUser(data[0]);
    setName(data[0].name);
    setLoading(false);
  };

  const updateScore = async (mob) => {
    const singleUserScore = singleUser.score;
    if (score > singleUserScore) {
      await axios.patch(`${process.env.REACT_APP_API}/users/${singleUser.id}`, {
        score: score,
      });
    }
  };

  useEffect(() => {
    updateScore();
  }, [gameOver]);
  console.log(level);
  useEffect(() => {
    getUserData();

    if (level === "easy") {
      setTarget(10);
    } else if (level === "medium") {
      setTarget(15);
    } else {
      setTarget(25);
    }
  }, [level]);

  console.log("score:-", score);

  useEffect(() => {
    const mob = localStorage.getItem("GLRLUM");
    if (mob) {
      getSingleUser(mob);
    }
  }, []);

  const getRandomColor = () => {
    return Math.random() < 0.5;
  };

  const startGame = () => {
    setStarted(true);
    setGameOver(false);
    setWon(false);
    setScore(0);
    setTimeLeft(40);
    setGreen(getRandomColor());
  };

  const changeColor = () => {
    const timeInterval = 1000;
    const randomTime = Math.floor(Math.random() * timeInterval * 2) + 1;
    setTimeout(() => {
      setGreen(getRandomColor());
    }, randomTime);
  };

  const endGame = () => {
    if (score >= target) {
      setWon(true);
      popToast(true);
    } else {
      setGameOver(true);
      popToast(false);
    }

    setStarted(false);
  };

  const popToast = (win) => {
    toast({
      title: win ? "Congratulations" : "Try Again",
      status: win ? "success" : "error",
      duration: 4000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  useEffect(() => {
    if (started) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);

        if (timeLeft <= 0 || score >= target) {
          clearInterval(intervalId);
          endGame();
        } else {
          changeColor();
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [started, timeLeft, score, target]);

  const handleClick = (color) => {
    if (color === "green" && started) {
      setScore((prevScore) => prevScore + 1);
      changeColor();
    } else if (color === "red" && started) {
      endGame();
    }
  };

  const restartGame = () => {
    setStarted(false);
    setGameOver(false);
    setWon(false);
    setScore(0);
    setGreen(false);
  };

  return (
    <Box>
      <Text className="title">Green Light Red Light Game</Text>
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap="30px">
        <Box
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
          display="flex"
          justifyContent="center"
          alignItems="center"
          maxHeight="400px"
          width="270px"
          borderRadius="10px"
        >
          {!started && !gameOver && !won && (
            <Button onClick={startGame}>Start Game</Button>
          )}
          {started && !gameOver && !won && (
            <Box>
              <Box
                style={{ borderRadius: "5px", width: "100%" }}
                className={`box ${isGreen ? "green" : "red"}`}
                onClick={() => handleClick(isGreen ? "green" : "red")}
              >
                {isGreen ? "click" : "stop"}
              </Box>
              <Text my="10px">Time Left : {timeLeft} seconds</Text>
              <Box>
                <Text my="10px">Score : {score}</Text>
                <Text>Target : {target}</Text>
              </Box>
            </Box>
          )}
          {gameOver && (
            <Box>
              <Text color={"red"}>Better Luck 😢😢 Next Time Game Over!</Text>
              <Text>Your Score : {score}</Text>
              <Button onClick={restartGame}>Play Again</Button>
            </Box>
          )}
          {won && (
            <Box>
              <Text color="green">
                Congratulation 🎉🎉 You are the Winner !!!
              </Text>
              <Button mt="20px" onClick={restartGame}>
                Play Again
              </Button>
            </Box>
          )}
        </Box>
        <Box
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
          borderRadius="10px"
        >
          <Text fontSize="3xl">Leaderboard</Text>
          <Text>Total Players : {user.length}</Text>
          <TableContainer maxHeight="300px" overflowY="scroll">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Rank</Th>
                  <Th>Name</Th>
                  <Th isNumeric>Points</Th>
                </Tr>
              </Thead>
              {!loading ? (
                <Tbody>
                  {user &&
                    user.map((u, idx) => {
                      return (
                        <Tr key={u.id}>
                          <Td>
                            {idx === 0 || idx === 1 || idx === 2 ? (
                              <>🏆{idx + 1}</>
                            ) : (
                              <>{idx + 1}</>
                            )}
                          </Td>
                          <Td>{u.name}</Td>
                          <Td isNumeric>{u.score}</Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              ) : (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="green.500"
                  size="xl"
                />
              )}
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default GreenLightRedLight;
