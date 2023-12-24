import { Box, Button, Heading, Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <Box marginBottom={["4rem"]}>
      <Flex
        borderRadius={["0 0 0.5rem 0.5rem"]}
        padding={["1rem 1.5rem"]}
        justifyContent={"space-between"}
        alignItems={["center"]}
        backgroundColor={"#161A30"}
        color={"beige"}
      >
        <Box width={["80%"]}>
          <Link _hover={{ textDecoration: "none" }} to="/">
            <Heading as="h1" fontSize={["1.8em"]}>
              Tasks note
            </Heading>
          </Link>
        </Box>
        <Flex
          display={
            pathname !== "/login" && pathname !== "/signup" ? "none" : "flex"
          }
          width={["15%"]}
          justifyContent={["space-evenly"]}
        >
          <Link _hover={{ textDecoration: "none" }} to="/login">
            <Button
              isDisabled={pathname === "/login"}
              fontSize={["0.9em"]}
              letterSpacing={["0.4px"]}
              padding={["0rem 0.8rem"]}
            >
              login
            </Button>
          </Link>

          <Link _hover={{ textDecoration: "none" }} to="/signup">
            <Button
              isDisabled={pathname === "/signup"}
              padding={["0rem 0.8rem"]}
              letterSpacing={["0.4px"]}
              fontSize={["0.9em"]}
            >
              Signup
            </Button>
          </Link>
        </Flex>
        <Box
          width={["10%"]}
          display={
            pathname === "/login" || pathname === "/signup" ? "none" : "flex"
          }
          justifyContent={["flex-end"]}
        >
          <Button
            fontSize={["1em"]}
            letterSpacing={["0.5px"]}
            padding={["0rem 0.8rem"]}
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
    </Box>
  );
}
