import { useContext, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import logo from "../images/logo.png"
import { useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Image,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Button,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthProvider";
function Signin(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const [inputFocus, setInputFocus] = useState({
    field2: false,
    field4: false,
  });
  const [show, setShow] = useState(false);
  const [captcha, setcaptcha] = useState(false);
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");

  const {setAuth} = useContext(AuthContext)
  const handleClick = () => setShow(!show);

  const onChange = () => {
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

  const isValidated = () => {
    let isproceed = true;
    let errormessage = "";
    if (mobile === null || mobile === "") {
      isproceed = false;
      errormessage += " Mobile";
    }

    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }

    if (!isproceed) {
      toast({
        title: "Enter " + errormessage,
        description: "Login failed due to :" + errormessage,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else {
    }
    return isproceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidated()) {
      axios
        .get(`http://localhost:8080/users`)
        .then((res) => {
          const filterredData = res.data.filter((data) => {
            return data.mobile === mobile && data.password === password;
          });
          if (filterredData.length > 0) {
            toast({
              title: "Signin successfully",
              description: "You have successfully Signed-in",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            localStorage.setItem("GLRLUM", mobile)
            setAuth(true)
              navigate("/dashboard");
          } else {
            setAuth(false)
            toast({
              title: "Wrong Credentials",
              description: "Input Correct Credentials",
              status: "warning",
              duration: 2000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          setAuth(false)
          toast({
            title: "Signed-in Failed",
            description: "Failed :" + err.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <Box>
      <Box>
        <Center>
          <Image
            my="10px"
            borderRadius="full"
            boxSize="30%"
            src={logo}
          />
        </Center>
      </Box>

      <Stack>
        <InputGroup>
          <InputLeftElement
            color={inputFocus.field2 ? "#B7791F" : "gray.500"}
            pointerEvents="none"
          >
            <BsFillTelephonePlusFill />
          </InputLeftElement>
          <Input
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
            variant="flushed"
            type="number"
            placeholder="Phone number"
            focusBorderColor="#B7791F"
            borderColor="#011029"
            onFocus={() => handleInputFocus("field2")}
            onBlur={() => handleInputBlur("field2")}
            _placeholder={{color:"gray.500"}}
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
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            variant="flushed"
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Password"
            focusBorderColor="#B7791F"
            borderColor="#011029"
            onFocus={() => handleInputFocus("field4")}
            onBlur={() => handleInputBlur("field4")}
            _placeholder={{color:"gray.500"}}
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
      </Stack>
      <Center pt={"20px"}>
        {/* google captcha */}
        <ReCAPTCHA sitekey="6LdecqQlAAAAAF5O-JC8ProsSC_nHykNvfTpWp2B" onChange={onChange} />
      </Center>
      <Center py={"20px"}>
          <Button onClick={handleSubmit} px="20px" colorScheme="orange">Login Now</Button>
      </Center>
    </Box>
  );
}

export default Signin;
