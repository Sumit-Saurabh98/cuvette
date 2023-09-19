import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, Flex } from '@chakra-ui/react';

function GreenLightRedLight(props) {
    const [user, setUser] = useState(null);
    const [isGreen, setIsGreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0); // Initial score
    const [message, setMessage] = useState("")

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
      
        setIsPlaying(true);

        // Start the color switching interval
        const interval = setInterval(() => {
            setIsGreen((prevIsGreen) => !prevIsGreen);
            console.log(getRandomTime());
        }, getRandomTime());

        // Set a timeout to clear the interval after 40 seconds
        setTimeout(() => {
            clearInterval(interval);
            setIsPlaying(false);
        }, 40000);

    };

   useEffect(() => {
    if(user){
     if(user.level==="easy" && score>=10) {
        setMessage("Winner")
    }else if(user.level==="medium" && score>=15){
        setMessage("Winner")
    }else if(user.level==="hard" && score>=25){
        setMessage("Winner")
    }else{
        setMessage("Loser")
    }
   }
   }, [message, user])

    return (
        <Box bg={"#011029"} w="100vw" h="100vh" color={"white"}>
            <h1>Red Light Green Light</h1>
            <Container>
                <Flex justifyContent={"space-around"} flexWrap={"wrap"} alignItems={"center"}>
                    <Box>
                        <Box
                            w="300px" h="100px" backgroundColor={isGreen? "green" : "red"}
                            onClick={()=>{
                                if (isGreen) {
                                    setScore((prevScore) => prevScore + 1);
                                } else {
                                    // Show game over alert if the user clicked during red and the game has not ended
                                    setIsPlaying(false);
                                }
                            }}
                        >
                        </Box>
                        <Button my={"30px"} px="80px" fontSize={"30px"} isDisabled={isPlaying} onClick={handlePlayClick} disabled={isPlaying}>
                            Play
                        </Button>
                        <Box>score:- {score}</Box>
                         <Box>{message}</Box>
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
