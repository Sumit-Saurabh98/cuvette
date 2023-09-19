import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, Flex, useToast } from '@chakra-ui/react';

function GreenLightRedLight(props) {
    const toast = useToast();
    const [user, setUser] = useState(null);
    const [isGreen, setIsGreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [intervalId, setIntervalId] = useState(null); // To store the interval ID
    const [count, setCount] = useState(40); // Initial countdown time
    const [score, setScore] = useState(0); // Initial score
    const [gameEnded, setGameEnded] = useState(false); // Indicates if the game has ended
    const [remainingTime, setRemainingTime] = useState(40); // Remaining time in seconds

    const getUser = async (mno) => {
        const { data } = await axios.get(`http://localhost:8080/users?mobile=${mno}`);
        setUser(data[0]);
    };

    useEffect(() => {
        const userMob = localStorage.getItem("GLRLUM");
        if (userMob) {
            getUser(userMob);
        }
    }, []);

    const getRandomTime = () => {
        return Math.floor(Math.random() * 1001) + 1000; // Random value between 1000 and 2000 milliseconds
    };

    const handlePlayClick = () => {
        setClicked(true);
        setIsPlaying(true);
        setGameEnded(false);

        // Start the color switching interval
        const interval = setInterval(() => {
            setIsGreen((prevIsGreen) => !prevIsGreen);
        }, getRandomTime());

        // Set a timeout to clear the interval after 40 seconds
        setTimeout(() => {
            clearInterval(interval);
            setIsPlaying(false);
            setClicked(false);
            setGameEnded(true);

            // Check the user's level and score to show the result
            let message = "";
            if (user && user.level === "easy" && score >= 10) {
                message = "Winner! Your Score: " + score;
            } else if (user && user.level === "medium" && score >= 15) {
                message = "Winner! Your Score: " + score;
            } else if (user && user.level === "hard" && score >= 25) {
                message = "Winner! Your Score: " + score;
            } else {
                message = "Loser! Your Score: " + score;
            }

            // Show result in a toast
            toast({
                title: "Game Over",
                description: message,
                status: "info",
                duration: 5000,
                isClosable: true,
            });

            // Reset the countdown timer and remaining time
            setRemainingTime(40);
        }, 40000);

        setIntervalId(interval); // Store the interval ID

        // Countdown timer
        let remainingTime = 40;
        setCount(remainingTime);

        const countdownInterval = setInterval(() => {
            if (!gameEnded) {
                remainingTime -= 1;
                setCount(remainingTime);

                if (remainingTime === 0) {
                    clearInterval(countdownInterval);
                    setGameEnded(true);
                }
            }
        }, 1000); // Update every second
    };

    return (
        <Box bg={"#011029"} w="100vw" h="100vh" color={"white"}>
            <h1>Red Light Green Light</h1>
            <Container>
                <Flex justifyContent={"space-around"} flexWrap={"wrap"} alignItems={"center"}>
                    <Box>
                        <Box
                            w="300px" h="100px" backgroundColor={isGreen? "green" : "red"}
                            onClick={()=>{
                                if (isGreen && !gameEnded) {
                                    setScore((prevScore) => prevScore + 1);
                                } else if (!gameEnded) {
                                    // Show game over alert if the user clicked during red and the game has not ended
                                    clearInterval(intervalId);
                                    setIsPlaying(false);
                                    setClicked(false);
                                    setGameEnded(true);
                                }
                            }}
                        >
                        </Box>
                        <Button my={"30px"} px="80px" fontSize={"30px"} isDisabled={clicked || gameEnded} onClick={handlePlayClick} disabled={isPlaying}>
                            Play
                        </Button>
                        <Box>
                            {gameEnded ? "Game Over!" : `Time left: ${remainingTime} seconds`}
                        </Box>
                        {gameEnded && (
                            <Box>
                                Total Score: {score}
                            </Box>
                        )}
                    </Box>
                    <Box>
                        <h1>Leaderboard</h1>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}

export default GreenLightRedLight;
