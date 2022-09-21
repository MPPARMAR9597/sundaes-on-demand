import { Container } from "react-bootstrap/Container";
import OrderEntry from "./pages/Entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails"

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary Page And Entry Page Need Provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* Conformation Page Does Not Need Provider */}
    </Container>
  );
}

export default App;
