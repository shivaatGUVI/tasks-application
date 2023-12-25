import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useSelector((store) => store.userReducer);

  return (
    <Flex
      justifyContent={["space-between"]}
      alignItems={["center"]}
      marginBottom={["2rem"]}
    >
      <Box>
        <Heading as="h2" fontSize={["1.1em", "1.3em", "1.5em"]}>
          {user.firstName ? `${user.firstName}'s Tasks` : "Tasks"}
        </Heading>
      </Box>
      <Flex
        gap={["0.4rem", "0.6rem", "0.8rem"]}
        flexDirection={["column", "row", "row"]}
        alignItems={["flex-end"]}
      >
        <Link _hover={{ textDecoration: "none" }} to="/add">
          <Button
            size={["xs", "sm", "md"]}
            fontSize={["0.4em", "0.8em", "0.8em"]}
            letterSpacing={["0.4px"]}
            padding={["0rem 0.5rem", "0rem 0.8rem"]}
            backgroundColor={["purple.800"]}
            color={["whitesmoke"]}
            _hover={{
              backgroundColor: "purple.700",
            }}
          >
            Add new
          </Button>
        </Link>
        <Link _hover={{ textDecoration: "none" }} to="/complete">
          <Button
            size={["xs", "sm", "md"]}
            fontSize={["0.4em", "0.8em", "0.8em"]}
            letterSpacing={["0.4px"]}
            padding={["0rem 0.5rem", "0rem 0.8rem"]}
            backgroundColor={["green.800"]}
            color={["whitesmoke"]}
            _hover={{
              backgroundColor: "green.700",
            }}
          >
            Completed
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
