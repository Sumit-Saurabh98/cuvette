import React from 'react';
import { Box, Image, Select} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdAccountCircle} from "react-icons/md";
import logo from "../images/logo.png"





const Navbar = () => {

  return (
    <Box h={"65px"} px={"30px"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} backgroundColor={"yellow.400"}>
      <Box>
        <Link to="/">
      <Image  borderRadius='full' boxSize={"60px"} src={logo} />
      </Link>
      </Box>
    <Box >
    <Select placeholder='Change Level'>
  <option value='easy'>Easy</option>
  <option value='medium'>Medium</option>
  <option value='hard'>Hard</option>
</Select>
    </Box>
    </Box>
  )
};

export default Navbar;