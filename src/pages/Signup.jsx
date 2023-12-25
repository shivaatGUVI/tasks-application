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
import { useNavigate } from "react-router-dom";
import { GETUSERCALL } from "../redux/user/actions.user";
import { useDispatch } from "react-redux";
import { ERRORFUNCTION, RESPONSEFUNCTION } from "../redux/actions.common";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function Signup() {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(!isLoading);

    GETUSERCALL(dispatch, "signup", form)
      .then((res) => {
        RESPONSEFUNCTION(res);
        if (res.status === 200) {
          toast({
            title: "User Signed up",
            description: `Welcome, ${res.data.user.firstName}!`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/dashboard");
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
        setIsLoading(false);
      });
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  return (
    <Center>
      <Box
        margin="auto"
        marginBottom={{ base: "2rem" }}
        width={["70%", "60%", "55%", "40%"]}
      >
        <form onSubmit={(e) => submitHandler(e)}>
          <FormControl isRequired marginBottom={["0.6rem", "0.7rem", "0.8rem"]}>
            <FormLabel fontSize={{ base: "0.7em", md: "0.8em", lg: "0.9em" }}>
              First name
            </FormLabel>
            <Input
              name="firstName"
              onChange={(e) => inputHandler(e)}
              value={form.firstName}
              variant="filled"
              type="text"
              placeholder="First name"
              fontSize={{ base: "0.7em", md: "0.8em", lg: "0.9em" }}
            />
          </FormControl>
          <FormControl isRequired marginBottom={["0.6rem", "0.7rem", "0.8rem"]}>
            <FormLabel fontSize={{ base: "0.7em", md: "0.8em", lg: "0.9em" }}>
              Last name
            </FormLabel>
            <Input
              name="lastName"
              onChange={(e) => inputHandler(e)}
              value={form.lastName}
              variant="filled"
              type="text"
              placeholder="Last name"
              fontSize={{ base: "0.7em", md: "0.8em", lg: "0.9em" }}
            />
          </FormControl>
          <FormControl isRequired marginBottom={["0.6rem", "0.7rem", "0.8rem"]}>
            <FormLabel fontSize={{ base: "0.7em", md: "0.8em", lg: "0.9em" }}>
              Email Address
            </FormLabel>
            <Input
              name="email"
              onChange={(e) => inputHandler(e)}
              value={form.email}
              variant="filled"
              type="email"
              placeholder="Email address"
              fontSize={{ base: "0.7em", md: "0.8em", lg: "0.9em" }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={{ base: "0.7em", md: "0.8em", lg: "0.9em" }}>
              Password
            </FormLabel>
            <Input
              name="password"
              onChange={(e) => inputHandler(e)}
              value={form.password}
              variant="filled"
              type="password"
              placeholder="Password"
              fontSize={{ base: "0.7em", md: "0.8em", lg: "0.9em" }}
            />
          </FormControl>
          <br />
          <Button
            width={["100%"]}
            type="submit"
            isLoading={isLoading}
            loadingText="Loading"
            cursor="pointer"
            fontSize={{ base: "0.7em", md: "0.8em", lg: "0.9em" }}
            isDisabled={
              form.email === "" ||
              form.password === "" ||
              form.firstName === "" ||
              form.lastName === ""
            }
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
