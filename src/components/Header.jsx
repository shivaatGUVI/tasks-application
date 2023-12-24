// import { ArrowUpDownIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useSelector((store) => store.userReducer);
  // const { tasks } = useSelector((store) => store.taskReducer);
  // const [click, setClick] = useState(initial);

  return (
    <Flex
      justifyContent={["space-between"]}
      alignItems={["center"]}
      marginBottom={["2rem"]}
    >
      <Box>
        <Heading as="h2" fontSize={["1.5em"]}>
          {`${user.firstName}'s Tasks`}
        </Heading>
      </Box>
      <Flex gap={["0.8rem"]}>
        <Link _hover={{ textDecoration: "none" }} to="/add">
          <Button
            fontSize={["0.9em"]}
            letterSpacing={["0.4px"]}
            padding={["0rem 0.8rem"]}
            backgroundColor={["purple.800"]}
            color={["whitesmoke"]}
            _hover={{
              backgroundColor: "purple.700",
            }}
          >
            Add new
          </Button>
        </Link>
        {/* <Button
          fontSize={["0.9em"]}
          letterSpacing={["0.4px"]}
          padding={["0rem 0.8rem"]}
          backgroundColor={["#E55604"]}
          color={["whitesmoke"]}
          _hover={{
            backgroundColor: "#EE7214",
          }}
          onClick={() => {
            clickForSort(setClick);
            setClick(!click);
          }}
          isDisabled={tasks.length <= 1 || click}
        >
          {" "}
          <ArrowUpDownIcon w={3} h={3} marginRight={["5px"]} />
          Deadline
        </Button> */}
        <Link _hover={{ textDecoration: "none" }} to="/complete">
          <Button
            fontSize={["0.9em"]}
            letterSpacing={["0.4px"]}
            padding={["0rem 0.8rem"]}
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
