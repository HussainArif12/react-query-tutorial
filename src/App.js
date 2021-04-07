import { QueryClient, QueryClientProvider } from "react-query";
import AddPassenger from "./AddPassenger";
import PassengerID from "./PassengerID";
import Passengers from "./Passengers";

const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Passengers />
        <PassengerID />
        <AddPassenger />
      </QueryClientProvider>
    </div>
  );
}

export default App;
