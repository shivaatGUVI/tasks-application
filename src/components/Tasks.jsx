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

export default function Tasks({ el }) {
  const [edit, isEdit] = useState(false);
  const [remove, isRemove] = useState(false);
  const [notify, isNotify] = useState(false);
  const [complete, isComplete] = useState(false);
  const { token, user } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();
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

  const toast = useToast();
  const today = new Date();

  const deadline = el.deadline ? new Date(el.deadline) : false;
  const createdOn = new Date(el.createdOn);

  const comparison = el.deadline ? deadline.getTime() < today.getTime() : false;

  function CONFIRMDELETECALL() {
    onDeleteClose();
    return DELETETASKCALL(dispatch, token, el._id)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.data.error);
        }

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
      })
      .finally(() => {
        isRemove(false);
      });
  }

  function CONFIRMUPDATECALL(payload) {
    onUpdateClose();
    return UPDATETASKCALL(dispatch, token, el._id, payload)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.data.error);
        }

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
      })
      .finally(() => {
        isEdit(false);
      });
  }

  function onNotifyClick() {
    isNotify(!notify);
    NOTIFYTASKCALL(dispatch, token, el._id).then((res) => {
      toast({
        title: "Mailed",
        description: `The reminder mail is sent to ${user.email}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      isNotify(!notify);
    });
  }

  function onRemoveClick() {
    isRemove(!remove);
    onDeleteOpen();
  }

  function onCompleteClick() {
    isComplete(!complete);
    COMPLETETASKCALL(dispatch, token, el._id)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.data.error);
        }

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
      })
      .finally(() => {
        isComplete(false);
      });
  }

  function onEditClick() {
    isEdit(!edit);
    onUpdateOpen();
  }

  console.log(el);

  return (
    <>
      <Flex
        border={comparison ? "1.5px solid red" : ""}
        backgroundColor={["#F0ECE5"]}
        padding={["1.5rem 2rem"]}
        borderRadius={["0.5rem"]}
        justifyContent={["space-between"]}
        alignItems={["center"]}
      >
        <Flex flexDirection={["column"]} gap={["0.1rem"]} width={["65%"]}>
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
            {createdOn.toDateString()}
          </Text>
          <Text as="p" noOfLines={[3]} marginBottom={["0.6rem"]}>
            {el.description}
          </Text>
          {el.deadline ? (
            <Text
              as="p"
              fontSize={["0.9em"]}
              color={["red.500"]}
              fontWeight={["500"]}
            >
              {deadline.toDateString()}
            </Text>
          ) : (
            ""
          )}
        </Flex>
        <Flex
          width={["25%"]}
          justifyContent={["space-between"]}
          alignItems={["center"]}
        >
          <Button
            cursor={["pointer"]}
            onClick={onCompleteClick}
            isLoading={complete}
            as="FeImage"
          >
            <CheckIcon w={5} h={5} color="green.700" />
          </Button>
          <Button
            cursor={["pointer"]}
            onClick={onEditClick}
            isLoading={edit}
            as="FeImage"
          >
            <EditIcon w={5} h={5} color="grey.500" />
          </Button>
          <Button
            onClick={onRemoveClick}
            isLoading={remove}
            cursor={["pointer"]}
            as="FeImage"
          >
            <DeleteIcon w={5} h={5} color="red.600" />
          </Button>
          <Button
            cursor={["pointer"]}
            onClick={onNotifyClick}
            isLoading={notify}
            as="FeImage"
          >
            <BellIcon w={6} h={6} color="#E57C23" />
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
        el={el}
        CONFIRMUPDATECALL={CONFIRMUPDATECALL}
      />
    </>
  );
}
