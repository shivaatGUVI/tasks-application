import { Heading, Text, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CALLCOMPLETEDTASKS,
  ERRORFUNCTION,
  RESPONSEFUNCTION,
} from "../redux/actions.common";
import { useNavigate } from "react-router-dom";
import { WarningIcon } from "@chakra-ui/icons";

export default function Completed() {
  const [state, setState] = useState([]);
  const { token } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    CALLCOMPLETEDTASKS(dispatch, token)
      .then((res) => {
        RESPONSEFUNCTION(res);
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
        ERRORFUNCTION(dispatch, err, navigate);
      });
  }, []);

  return (
    <>
      {state?.length > 0 ? (
        <Flex
          flexDirection={["column"]}
          gap={["1rem"]}
          width={["80%"]}
          margin={["auto"]}
          marginBottom={["2rem"]}
        >
          {state?.map((el) => {
            const createdOn = new Date(el.createdOn);
            return (
              <Flex
                key={el._id}
                backgroundColor={["#9DB2BF"]}
                padding={["0.7rem 1.2rem", "1.1rem 1.6rem", "1.5rem 2rem"]}
                borderRadius={["0.5rem"]}
                justifyContent={["space-between"]}
                alignItems={["center"]}
              >
                <Flex
                  flexDirection={["column"]}
                  gap={["0.1rem"]}
                  width={["90%", "75%", "65%"]}
                >
                  <Heading
                    as="h3"
                    fontSize={["0.7em", "0.9em", "1.1em"]}
                    letterSpacing={["0.065em", "0.045em", "0.025em"]}
                    textTransform={["uppercase"]}
                    noOfLines={[1]}
                  >
                    {el.name}
                  </Heading>
                  <Text
                    as="p"
                    fontStyle={["italic"]}
                    fontSize={["0.4em", "0.6em", "0.8em"]}
                    marginBottom={["0.1rem", "0.2rem", "0.3rem"]}
                  >
                    {el.createdOn ? createdOn.toDateString() : ""}
                  </Text>
                  <Text
                    as="p"
                    noOfLines={[3]}
                    fontSize={["0.6em", "0.8em", "0.9em"]}
                    marginBottom={["0.2rem", "0.4rem", "0.6rem"]}
                  >
                    {el.description}
                  </Text>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      ) : (
        <Flex
          height={["40vh"]}
          justifyContent={["center"]}
          alignItems={["center"]}
          gap={["10px"]}
        >
          <WarningIcon h={5} w={5} color={["orangered"]} />
          <Heading as="h4" fontSize={["1.4em"]} textColor={["gray"]}>
            You have zero completed tasks
          </Heading>
        </Flex>
      )}
    </>
  );
}
