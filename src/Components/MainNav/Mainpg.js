import "./Main.css";
import MainNav from "./mainNav";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Mainpg() {
  return (
    <>
      <MainNav />
      <div className="container text-center mt-5 mainpg" >
        <h1>Welcome to RoadReadyRentals</h1>
        <p>Explore and enjoy our services</p>
        <div className="mt-4">
          <Link to="userlogin">
            <Button className="user" variant="outline-primary">
              User
            </Button>
          </Link>
          <Link to="admin">
            <Button className="admin" variant="outline-primary">
              Admin
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Mainpg;
