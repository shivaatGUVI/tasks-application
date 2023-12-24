import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ADDTASKCALL } from "../redux/task/actions.task";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
  createdOn: "",
  deadline: "",
};

export default function Add() {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.userReducer);
  const toast = useToast();

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(!isLoading);
    setForm({
      ...form,
      deadline: new Date(form.deadline),
    });

    ADDTASKCALL(dispatch, token, form)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.data.error);
        }

        if (res.status === 200) {
          toast({
            title: "Completed",
            description: `Task added successfully`,
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
        setIsLoading(!isLoading);
      });
    setForm(initialState);
    navigate("/");
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  return (
    <Center>
      <Box margin="auto" width={["70%", "60%", "55%", "40%"]}>
        <form onSubmit={(e) => submitHandler(e)}>
          <FormControl isRequired marginBottom={["0.8rem"]}>
            <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>
              Task name
            </FormLabel>
            <Input
              name="name"
              onChange={(e) => inputHandler(e)}
              value={form.name}
              variant="filled"
              type="text"
              placeholder="Title"
              fontSize={{ base: "14px", md: "16px", lg: "17px" }}
            />
          </FormControl>
          <FormControl isRequired marginBottom={["0.8rem"]}>
            <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>
              Task Description
            </FormLabel>
            <Input
              name="description"
              onChange={(e) => inputHandler(e)}
              value={form.description}
              variant="filled"
              type="text"
              placeholder="Description"
              fontSize={{ base: "14px", md: "16px", lg: "17px" }}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>
              Deadline
            </FormLabel>
            <Input
              name="deadline"
              onChange={(e) => inputHandler(e)}
              value={form.deadline}
              variant="filled"
              type="datetime-local"
              placeholder="Set a deadline"
              fontSize={{ base: "14px", md: "16px", lg: "17px" }}
            />
          </FormControl>
          <br />
          <Button
            width={["100%"]}
            type="submit"
            isLoading={isLoading}
            loadingText="Loading"
            cursor="pointer"
            fontSize={{ base: "14px", md: "16px", lg: "17px" }}
            isDisabled={form.name === "" || form.description === ""}
            bg="#393646"
            border="none"
            color="white"
            _hover={{
              bg: "#4F4557",
            }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Center>
  );
}
