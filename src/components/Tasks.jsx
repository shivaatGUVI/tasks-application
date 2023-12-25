import {
  Heading,
  Text,
  Flex,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, BellIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";
import {
  COMPLETETASKCALL,
  DELETETASKCALL,
  NOTIFYTASKCALL,
  UPDATETASKCALL,
} from "../redux/task/actions.task";
import { useDispatch, useSelector } from "react-redux";
import AlertDelete from "./Alert.Delete";
import AlertUpdate from "./AlertUpdate";
import { useNavigate } from "react-router-dom";
import { ERRORFUNCTION, RESPONSEFUNCTION } from "../redux/actions.common";

export default function Tasks({ element }) {
  const [edit, isEdit] = useState(false);
  const [remove, isRemove] = useState(false);
  const [notify, isNotify] = useState(false);
  const [complete, isComplete] = useState(false);
  const { token, user } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

  const today = new Date();
  const deadline = element.deadline ? new Date(element.deadline) : false;
  const createdOn = new Date(element.createdOn);
  const comparison = element.deadline
    ? deadline.getTime() < today.getTime()
    : false;

  function CONFIRMDELETECALL() {
    onDeleteClose();
    return DELETETASKCALL(dispatch, token, element._id)
      .then((res) => {
        RESPONSEFUNCTION(res);
        if (res.status === 200) {
          toast({
            title: "Deleted",
            description: `The task is deleted successfully`,
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
      })
      .finally(() => {
        isRemove(false);
      });
  }

  function CONFIRMUPDATECALL(payload) {
    onUpdateClose();
    return UPDATETASKCALL(dispatch, token, element._id, payload)
      .then((res) => {
        RESPONSEFUNCTION(res);
        if (res.status === 200) {
          toast({
            title: "Updated",
            description: `The task is updated successfully`,
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
      })
      .finally(() => {
        isEdit(false);
      });
  }

  function NOTIFYCLICKHANDLER() {
    isNotify(!notify);
    NOTIFYTASKCALL(dispatch, token, element)
      .then((res) => {
        RESPONSEFUNCTION(res);

        if (res.status === 200) {
          toast({
            title: "Mailed",
            description: `The reminder mail is sent to ${user.email}`,
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
      })
      .finally(() => {
        isNotify(!notify);
      });
  }

  function DELETECLICKHANDLER() {
    isRemove(!remove);
    onDeleteOpen();
  }

  function COMPLETECLICKHANDLER() {
    isComplete(!complete);
    COMPLETETASKCALL(dispatch, token, element)
      .then((res) => {
        RESPONSEFUNCTION(res);
        if (res.status === 200) {
          toast({
            title: "Completed",
            description: `The task is marked as completed`,
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
      })
      .finally(() => {
        isComplete(false);
      });
  }

  function EDITCLICKHANDLER() {
    isEdit(!edit);
    onUpdateOpen();
  }

  return (
    <>
      <Flex
        flexDirection={["column", "column", "row"]}
        border={comparison ? "1.5px solid red" : ""}
        backgroundColor={["#F0ECE5"]}
        padding={["0.7rem 1.2rem", "1.1rem 1.6rem", "1.5rem 2rem"]}
        borderRadius={["0.5rem"]}
        justifyContent={["space-between"]}
        alignItems={["center"]}
        gap={["0.8rem", "1rem", "0rem"]}
      >
        <Flex
          flexDirection={["column"]}
          gap={["0.1rem"]}
          width={["100%", "100%", "60%"]}
        >
          <Heading
            as="h3"
            fontSize={["0.7em", "0.9em", "1.1em"]}
            letterSpacing={["0.065em", "0.045em", "0.025em"]}
            textTransform={["uppercase"]}
            noOfLines={[1]}
          >
            {element.name}
          </Heading>
          <Text
            as="p"
            fontStyle={["italic"]}
            fontSize={["0.4em", "0.6em", "0.8em"]}
            marginBottom={["0.1rem", "0.2rem", "0.3rem"]}
          >
            {createdOn.toDateString()}
          </Text>
          <Text
            as="p"
            fontSize={["0.6em", "0.8em", "0.9em"]}
            marginBottom={["0.2rem", "0.4rem", "0.6rem"]}
            noOfLines={[3]}
          >
            {element.description}
          </Text>
          {element.deadline ? (
            <Text
              as="p"
              color={["red.500"]}
              fontWeight={["500"]}
              fontSize={["0.5em", "0.7em", "0.9em"]}
            >
              {deadline.toDateString()}
            </Text>
          ) : (
            ""
          )}
        </Flex>
        <Flex
          width={["60%", "50%", "40%", "30%"]}
          justifyContent={["space-evenly"]}
          alignItems={["center"]}
        >
          <Button
            cursor={["pointer"]}
            onClick={COMPLETECLICKHANDLER}
            isLoading={complete}
            size={["xs", "sm", "md"]}
          >
            <CheckIcon w={[3, 4, 5]} h={[3, 4, 5]} color="green.700" />
          </Button>
          <Button
            cursor={["pointer"]}
            onClick={EDITCLICKHANDLER}
            isLoading={edit}
            size={["xs", "sm", "md"]}
          >
            <EditIcon w={[3, 4, 5]} h={[3, 4, 5]} color="grey.500" />
          </Button>
          <Button
            onClick={DELETECLICKHANDLER}
            isLoading={remove}
            cursor={["pointer"]}
            size={["xs", "sm", "md"]}
          >
            <DeleteIcon w={[3, 4, 5]} h={[3, 4, 5]} color="red.600" />
          </Button>
          <Button
            cursor={["pointer"]}
            onClick={NOTIFYCLICKHANDLER}
            isLoading={notify}
            size={["xs", "sm", "md"]}
          >
            <BellIcon w={[4, 5, 6]} h={[4, 5, 6]} color="#E57C23" />
          </Button>
        </Flex>
      </Flex>
      <AlertDelete
        onDeleteOpen={onDeleteOpen}
        isDeleteOpen={isDeleteOpen}
        onDeleteClose={onDeleteClose}
        isRemove={isRemove}
        remove={remove}
        CONFIRMDELETECALL={CONFIRMDELETECALL}
      />
      <AlertUpdate
        onUpdateOpen={onUpdateOpen}
        isUpdateOpen={isUpdateOpen}
        onUpdateClose={onUpdateClose}
        isEdit={isEdit}
        edit={edit}
        element={element}
        CONFIRMUPDATECALL={CONFIRMUPDATECALL}
      />
    </>
  );
}
