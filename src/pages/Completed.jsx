import { Heading, Text, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CALLCOMPLETEDTASKS } from "../redux/actions.common";

export default function Completed() {
  const [state, setState] = useState([]);
  const { token } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    CALLCOMPLETEDTASKS(dispatch, token)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.data.error);
        }

        if (res.status === 200) {
          toast({
            title: "Fetched successfully",
            description: `Completed tasks`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setState(res.data.tasks);
        }
      })
      .catch((err) => {
        toast({
          title: "Something happened",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, []);

  return (
    <Flex
      flexDirection={["column"]}
      gap={["1rem"]}
      width={["80%"]}
      margin={["auto"]}
      marginBottom={["2rem"]}
    >
      {state.length !== 0
        ? state.map((el) => {
            const createdOn = new Date(el.createdOn);
            return (
              <Flex
                backgroundColor={["#9DB2BF"]}
                padding={["1.5rem 2rem"]}
                borderRadius={["0.5rem"]}
                justifyContent={["space-between"]}
                alignItems={["center"]}
              >
                <Flex
                  flexDirection={["column"]}
                  gap={["0.1rem"]}
                  width={["65%"]}
                >
                  <Heading
                    as="h3"
                    fontSize={["1.1em"]}
                    textTransform={["uppercase"]}
                    letterSpacing={["0.025em"]}
                    noOfLines={[1]}
                  >
                    {el.name}
                  </Heading>
                  <Text
                    as="p"
                    fontStyle={["italic"]}
                    fontSize={["0.8em"]}
                    marginBottom={["0.3rem"]}
                  >
                    {el.createdOn ? createdOn.toDateString() : ""}
                  </Text>
                  <Text as="p" noOfLines={[3]} marginBottom={["0.6rem"]}>
                    {el.description}
                  </Text>
                </Flex>
              </Flex>
            );
          })
        : ""}
    </Flex>
  );
}
