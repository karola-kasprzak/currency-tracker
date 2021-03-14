import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Tracker from "./Components/Tracker/Tracker";

function App() {
    return (
        <Container className="bg-light py-4 my-4">
            <h1 className="text-center">NBP Currency Rates Tracker</h1>
            <Tracker />
        </Container>
    );
}

export default App;
