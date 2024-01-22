import { RouterProvider } from "react-router-dom";
import { router } from "./services/providers/routes";
import TranstackProvider from "./services/providers/TranstackProvider";

function App() {
  return (
    <>
      <TranstackProvider>
        <RouterProvider router={router} />
      </TranstackProvider>
    </>
  );
}

export default App;
