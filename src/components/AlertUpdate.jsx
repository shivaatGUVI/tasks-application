import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function AlertUpdate({
  isUpdateOpen,
  onUpdateClose,
  isEdit,
  edit,
  CONFIRMUPDATECALL,
  el,
}) {
  const cancelRef = useRef();
  const [form, setForm] = useState(el);

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <AlertDialog
        isOpen={isUpdateOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => {
          onUpdateClose();
          isEdit(!edit);
        }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Update task?
            </AlertDialogHeader>

            <AlertDialogBody>
              <form>
                <FormControl isRequired marginBottom={["0.8rem"]}>
                  <FormLabel
                    fontSize={{ base: "13px", md: "14px", lg: "16px" }}
                  >
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
                  <FormLabel
                    fontSize={{ base: "13px", md: "14px", lg: "16px" }}
                  >
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
                  <FormLabel
                    fontSize={{ base: "13px", md: "14px", lg: "16px" }}
                  >
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
              </form>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  isEdit(!edit);
                  onUpdateClose();
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  CONFIRMUPDATECALL(form);
                }}
                ml={3}
              >
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
