import "./App.css";
import Navbar from "./components/Navbar";
import { Skeleton } from "@chakra-ui/react";
import AllRoutes from "./routes/AllRoutes";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";

function App() {
  const { isLoading } = useSelector((store) => store.reducer);
  return (
    <Box className="App">
      <Navbar />
      <AllRoutes />
      {isLoading && (
        <Skeleton
          position={["absolute"]}
          top={["14vh"]}
          zIndex={["1000000"]}
          width={["100%"]}
          height={["86vh"]}
          startColor="#FFFFFF"
          endColor="#FFF8DC"
        >
          {" "}
        </Skeleton>
      )}
    </Box>
  );
}

export default App;
