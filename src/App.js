import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Tracker from "./Components/Tracker/Tracker";
import "./App.css";

function App() {
    return (
        <div className="py-4 custom-bg">
            <Container className="custom-container py-4 mb-4 rounded">
                <h1 className="text-center">NBP Currency Rates Tracker</h1>
                <Tracker />
            </Container>
        </div>
    );
}

export default App;
