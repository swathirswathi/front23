import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import img from '../../Images/car-logo.jpg';
import "./Main.css";

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className="navcolor">

        <Navbar.Brand href="/">
          <img className="img" src={img} alt="img" />
        </Navbar.Brand>

        <Navbar.Brand style={{position: "relative",left: "20px",fontFamily: "-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol", }}className="hexa">
          <b>RoadReadyRentals</b>
        </Navbar.Brand>

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
          ></Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
