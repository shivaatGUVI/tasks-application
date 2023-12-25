import { Box, Flex, Heading, useToast } from "@chakra-ui/react";
import Header from "../components/Header";
import Tasks from "../components/Tasks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GETTASKSCALL } from "../redux/task/actions.task";
import { useNavigate } from "react-router-dom";
import { ERRORFUNCTION, RESPONSEFUNCTION } from "../redux/actions.common";
import { WarningTwoIcon } from "@chakra-ui/icons";

export default function Dashboard() {
  const { tasks } = useSelector((store) => store.taskReducer);
  const { token } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    GETTASKSCALL(dispatch, token)
      .then((res) => {
        RESPONSEFUNCTION(res);
        if (res.status === 200) {
          toast({
            title: "Fetched successfully",
            description: `Here are your tasks`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
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
        ERRORFUNCTION(dispatch, err, navigate);
      });
  }, []);

  return (
    <Box width={["90%"]} margin={["auto"]} marginBottom={["2rem"]}>
      <Header />
      {tasks?.length > 0 ? (
        <Flex
          flexDirection={["column"]}
          gap={["1rem"]}
          width={["90%"]}
          margin={["auto"]}
        >
          {tasks?.map((el) => {
            return <Tasks element={el} key={el._id} />;
          })}
        </Flex>
      ) : (
        <Flex
          height={["40vh"]}
          justifyContent={["center"]}
          alignItems={["center"]}
          gap={["10px"]}
        >
          <WarningTwoIcon h={5} w={5} color={["orangered"]} />
          <Heading as="h4" fontSize={["1.4em"]} textColor={["gray"]}>
            No tasks found
          </Heading>
        </Flex>
      )}
    </Box>
  );
}
