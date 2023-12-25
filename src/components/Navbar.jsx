import { Box, Button, Heading, Flex } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGOUTUSER } from "../redux/user/actions.user";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Flex
      padding={["1rem 1.5rem"]}
      justifyContent={"space-between"}
      alignItems={["flex-end", "center", "center"]}
      height={["16vh", "15vh", "14vh"]}
      maxHeight={["16vh"]}
      marginBottom={["2rem", "3rem", "4rem"]}
      backgroundColor={"#161A30"}
      color={"beige"}
    >
      <Flex width={["60%", "70%", "80%"]} alignItems={["center"]}>
        <Heading as="h1" fontSize={["1.3em", "1.5em", "1.7em"]}>
          <Link _hover={{ textDecoration: "none" }} to="/dashboard">
            Tasks note
          </Link>
        </Heading>
      </Flex>
      <Flex
        display={
          pathname !== "/login" && pathname !== "/signup" ? "none" : "flex"
        }
        width={["40%", "30%", "15%"]}
        justifyContent={["space-evenly"]}
      >
        <Link _hover={{ textDecoration: "none" }} to="/login">
          <Button
            isDisabled={pathname === "/login"}
            size={["xs", "sm", "md"]}
            fontSize={["0.4em", "0.8em", "0.8em"]}
            letterSpacing={["0.4px"]}
            padding={["0rem 0.5rem", "0rem 0.8rem"]}
          >
            login
          </Button>
        </Link>

        <Link _hover={{ textDecoration: "none" }} to="/signup">
          <Button
            isDisabled={pathname === "/signup"}
            fontSize={["0.7em", "0.8em", "0.9em"]}
            size={["xs", "sm", "md"]}
            letterSpacing={["0.4px"]}
            padding={["0rem 0.5rem", "0rem 0.8rem"]}
          >
            Signup
          </Button>
        </Link>
      </Flex>
      <Box
        width={["40%", "30%", "15%"]}
        display={
          pathname === "/login" || pathname === "/signup" ? "none" : "flex"
        }
        justifyContent={["flex-end"]}
      >
        <Button
          onClick={() => {
            LOGOUTUSER(dispatch);
            navigate("/login");
          }}
          size={["xs", "sm", "lg"]}
          fontSize={["0.4em", "0.8em", "0.8em"]}
          letterSpacing={["0.4px"]}
          padding={["0rem 0.5rem", "0rem 0.8rem"]}
          backgroundColor={["transparent"]}
          color={["whitesmoke"]}
          _hover={{
            backgroundColor: "red.800",
          }}
        >
          Logout
        </Button>
      </Box>
    </Flex>
  );
}
