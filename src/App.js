import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Tracker from "../src/Components/Tracker/Tracker";

function App() {
    return (
        <Container>
            <h1>NBP Currency Rates</h1>
            <Tracker />
        </Container>
    );
}

export default App;
