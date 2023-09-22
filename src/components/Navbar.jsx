import React, { useContext } from 'react';
import { Box, Image, Select, Text} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from "../images/logo.png"
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate()
const {setLevel, name, setAuth} = useContext(AuthContext)
  return (
    <Box h={"65px"} px={"30px"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} backgroundColor={"yellow.400"}>
      <Box>
        <Link to="/">
      <Image  borderRadius='full' boxSize={"60px"} src={logo} />
      </Link>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" gap="30px">
        <Text fontSize="20px" _hover={{cursor:"pointer"}}>👋 {name}</Text>
      <Text onClick={()=>{
        localStorage.clear()
        setAuth(false)
         window.location.reload();
        navigate("/")
      }} fontSize="20px" _hover={{cursor:"pointer"}}>Logout</Text>
      </Box>
    <Box display="flex" justifyContent="space-between" gap={"20px"}>
    <Select onChange={(e)=>setLevel(e.target.value)} placeholder='Level'>
  <option value='easy'>Easy</option>
  <option value='medium'>Medium</option>
  <option value='hard'>Hard</option>
</Select>
    </Box>
    </Box> 
  )
};

export default Navbar;