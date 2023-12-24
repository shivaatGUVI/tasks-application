import { Box, Flex, useToast } from "@chakra-ui/react";
import Header from "../components/Header";
import Tasks from "../components/Tasks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GETTASKSCALL } from "../redux/task/actions.task";

export default function Dashboard() {
  const { tasks } = useSelector((store) => store.taskReducer);
  const { token } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();
  const toast = useToast();
  // const {
  //   isOpen: deleteIsOpen,
  //   onOpen: updateOnOpen,
  //   onClose: deleteOnClose,
  // } = useDisclosure();
  // const cancelRef = useRef();

  // const clickForSort = () => {
  //   SORTBYDEADLINE(dispatch, tasks);
  // };

  useEffect(() => {
    GETTASKSCALL(dispatch, token)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.data.error);
        }

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
      });
  }, []);

  return (
    <Box width={["90%"]} margin={["auto "]} marginBottom={["2rem"]}>
      <Header />
      <Flex
        flexDirection={["column"]}
        gap={["1rem"]}
        width={["90%"]}
        margin={["auto"]}
      >
        {tasks?.map((el) => {
          return <Tasks el={el} key={el._id} />;
        })}
      </Flex>
    </Box>
  );
}
