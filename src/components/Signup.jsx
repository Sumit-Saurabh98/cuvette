import {
  Box,
  Center,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  InputRightElement,
  Button,
  Icon,
  useToast,
  Select,
  Spinner
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaLevelUpAlt } from "react-icons/fa";
import React, { useContext } from "react";
import Signin from "./Signin";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function Signup(props) {
  const navigate = useNavigate();
  const [inputFocus, setInputFocus] = useState({
    field1: false,
    field2: false,
    field3: false,
    field4: false,
    field5: false,
  });
  const toast = useToast();

  const [show, setShow] = useState(false);
  const [captcha, setcaptcha] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [level, setLevel] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {setAuth} = useContext(AuthContext)

  const handleClick = () => setShow(!show);

  const onChange = () => {
    // captcha
    setcaptcha(!captcha);
  };

  const handleInputFocus = (fieldName) => {
    setInputFocus((prevState) => ({
      ...prevState,
      [fieldName]: true,
    }));
  };

  const handleInputBlur = (fieldName) => {
    setInputFocus((prevState) => ({
      ...prevState,
      [fieldName]: false,
    }));
  };

  //validation

  const isValidated = () => {
    let isproceed = true;
    let errormessage = "";
    if (name === null || name === "") {
      isproceed = false;
      errormessage += " Name";
    }
    if (mobile === null || mobile === "") {
      isproceed = false;
      errormessage += " Country";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    } else if (!email.includes("@")) {
      isproceed = false;
      errormessage += " Invalid Email";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }

    if (level === null || level === "") {
      isproceed = false;
      errormessage += " Level";
    }

    if (!isproceed) {
      toast({
        title: "Enter " + errormessage,
        description: "Registration failed due to :" + errormessage,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else {
      //write something
    }
    return isproceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = 0;
    let userDataObj = { name, mobile, email, password, level, score };
    if (isValidated()) {
      setLoading(true)
      axios.get(`${process.env.REACT_APP_API}/users`).then((res) => {
        const user = res.data.find((data) => data.mobile === mobile);
        if (!user) {
          axios
            .post(`${process.env.REACT_APP_API}/users`, userDataObj)
            .then((res) => {
              setLoading(false)
              toast({
                title: "Registration successfully",
                description: "Account created successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
              localStorage.setItem("GLRLUM", mobile)
              setAuth(true)
              navigate("/dashboard")
            })
            .catch((err) => {
              setAuth(false)
              toast({
                title: "Registration Failed",
                description: "Failed :" + err.message,
                status: "error",
                duration: 2000,
                isClosable: true,
              });
            });
        } else {
          setAuth(false)
          toast({
            title: "Registered number",
            description: "Enter the new mobile number",
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
        }
      });
    }
  };

  return (
    <Box bg={"#011029"} h="100vh" w="100vw">
      <Center>
        <Box
          mt="35px"
          borderRadius={"7px"}
        >
          <Center>
            <Box
              bg="white"
              borderRadius={"7px"}
            >
              <Center>
                <Box
                  borderRadius="0 0 100% 100%"
                  bg="#011129"
                  color="white"
                >
                  <Heading
                    pt="10px"
                    as="h1"
                    borderRadius="0 0 100% 100%"
                    bg="#011129"
                    color="white"
                    fontFamily={"cursive"}
                    p="20px"
                    display="flex"
                    alignItems="center"
                    textAlign="center"
                  >
                    Welcome
                  </Heading>
                </Box>
              </Center>
              <Center>
                <Tabs color={"gray.500"} colorScheme="orange">
                  <TabList>
                    <Tab fontSize={"25px"} >
                      Login
                    </Tab>
                    <Tab fontSize={"25px"}>
                      Registration
                    </Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Signin />
                    </TabPanel>
                    <TabPanel mt="10px">
                      <Stack spacing={4}>
                        <InputGroup>
                          <InputLeftElement
                            color={inputFocus.field1 ? "#B7791F" : "gray.500"}
                            pointerEvents="none"
                          >
                            <FaUserAlt />
                          </InputLeftElement>
                          <Input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            variant="flushed"
                            type="text"
                            placeholder="Full Name"
                            focusBorderColor="#B7791F"
                            borderColor="#011029"
                            onFocus={() => handleInputFocus("field1")}
                            onBlur={() => handleInputBlur("field1")}
                            _placeholder={{ color: "gray.500" }}
                          />
                        </InputGroup>

                        <InputGroup>
                          <InputLeftElement
                            color={inputFocus.field2 ? "#B7791F" : "gray.500"}
                            pointerEvents="none"
                          >
                            <BsFillTelephonePlusFill />
                          </InputLeftElement>
                          <Input
                            onChange={(e) => setmobile(e.target.value)}
                            value={mobile}
                            variant="flushed"
                            type="number"
                            placeholder="Phone number"
                            focusBorderColor="#B7791F"
                            borderColor="#011029"
                            onFocus={() => handleInputFocus("field2")}
                            onBlur={() => handleInputBlur("field2")}
                            _placeholder={{ color: "gray.500" }}
                          />
                        </InputGroup>

                        <InputGroup>
                          <InputLeftElement
                            color={inputFocus.field3 ? "#B7791F" : "gray.500"}
                            pointerEvents="none"
                          >
                            <MdEmail />
                          </InputLeftElement>
                          <Input
                            onChange={(e) => setemail(e.target.value)}
                            value={email}
                            variant="flushed"
                            type="email"
                            placeholder="Email Address"
                            focusBorderColor="#B7791F"
                            borderColor="#011029"
                            onFocus={() => handleInputFocus("field3")}
                            onBlur={() => handleInputBlur("field3")}
                            _placeholder={{ color: "gray.500" }}
                          />
                        </InputGroup>

                        <InputGroup>
                          <InputLeftElement
                            color={inputFocus.field4 ? "#B7791F" : "gray.500"}
                            pointerEvents="none"
                          >
                            <RiLockPasswordFill />
                          </InputLeftElement>
                          <Input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            variant="flushed"
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            focusBorderColor="#B7791F"
                            borderColor="#011029"
                            onFocus={() => handleInputFocus("field4")}
                            onBlur={() => handleInputBlur("field4")}
                            _placeholder={{ color: "gray.500" }}
                          />
                          <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                              {show ? (
                                <Icon boxSize={4} as={FiEye}></Icon>
                              ) : (
                                <Icon boxSize={4} as={FiEyeOff}></Icon>
                              )}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <InputGroup>
                          <InputLeftElement
                            color={inputFocus.field4 ? "#B7791F" : "gray.500"}
                            pointerEvents="none"
                            pr={"10px"}
                          >
                            <FaLevelUpAlt />
                          </InputLeftElement>
                          <Select
                            placeholder="Select Level"
                            focusBorderColor="#B7791F"
                            borderColor="#011029"
                            onFocus={() => handleInputFocus("field5")}
                            onBlur={() => handleInputBlur("field5")}
                            _placeholder={{ color: "gray.500" }}
                            onChange={(e) => setLevel(e.target.value)}
                            value={level}
                          >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                          </Select>
                        </InputGroup>
                      </Stack>
                      <Center mt="8%" mb="2%">
                        {/* google captcha */}
                        <ReCAPTCHA
                          sitekey="6LdecqQlAAAAAF5O-JC8ProsSC_nHykNvfTpWp2B"
                          onChange={onChange}
                        />
                      </Center>
                      <Center py={"20px"}>
                        <Button  onClick={handleSubmit} colorScheme="orange">
                          {loading ? <Spinner/> : "Register Now"}
                        </Button>
                      </Center>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Center>
            </Box>
          </Center>
        </Box>
      </Center>
    </Box>
  );
}

export { Signup };
