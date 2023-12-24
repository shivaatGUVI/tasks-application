import {
  Input,
  FormControl,
  FormLabel,
  Box,
  Center,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { GETUSERCALL } from "../redux/user/actions.user";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(!isLoading);

    GETUSERCALL(dispatch, "login", form)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.data.error);
        }

        if (res.status === 200) {
          toast({
            title: "User logged in",
            description: `Welcome back, ${res.data.user.firstName}!`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/");
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
      <Box margin="auto" width={["70%", "60%", "55%", "40%"]}>
        <form onSubmit={(e) => submitHandler(e)}>
          <FormControl isRequired marginBottom={["0.8rem"]}>
            <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>
              Email Address
            </FormLabel>
            <Input
              name="email"
              onChange={(e) => inputHandler(e)}
              value={form.email}
              variant="filled"
              type="email"
              placeholder="Email address"
              fontSize={{ base: "14px", md: "16px", lg: "17px" }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>
              Password
            </FormLabel>
            <Input
              name="password"
              onChange={(e) => inputHandler(e)}
              value={form.password}
              variant="filled"
              type="password"
              placeholder="Password"
              fontSize={{ base: "14px", md: "16px", lg: "17px" }}
            />
          </FormControl>
          <br />
          <Button
            width={["100%"]}
            isLoading={isLoading}
            loadingText="Loading"
            type="submit"
            cursor="pointer"
            fontSize={{ base: "14px", md: "16px", lg: "17px" }}
            isDisabled={form.email === "" || form.password === ""}
            bg="#31304D"
            border="none"
            color="white"
            _hover={{
              bg: "#4F4557",
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Center>
  );
}
