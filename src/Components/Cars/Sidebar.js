import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import lang from "../../Images/lang.png";
import propic from "../../Images/propic.png";
import phone from "../../Images/phone.png";
import loc from "../../Images/location.png";
import "./Cars.css";
import img from "../../Images/11461192.png";

function Sidebar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <img
        style={{
          height: "35px",
          borderRadius: "2px",
          position: "relative",
          left: "5px",
          cursor: "pointer",
          opacity: "0.9",
        }}
        onClick={handleShow}
        src={img}
        alt="img"
      />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontSize: "28px" }}>
            RoadReadyCars
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            style={{
              fontSize: "20px",
              position: "relative",
              left: "25px",
              top: "5px",
              padding: "10px",
              cursor: "pointer",
              fontFamily:
                "-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
            }}
          >
            <img
              style={{
                height: "20px",
                position: "relative",
                right: "20px",
                bottom: "5px",
              }}
              src={loc}
              alt="img"
            />
            Change City
          </div>
          <div
            style={{
              fontSize: "20px",
              position: "relative",
              left: "25px",
              top: "5px",
              padding: "10px",
              cursor: "pointer",
              fontFamily:
                "-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
            }}
          >
            <img
              style={{
                height: "20px",
                position: "relative",
                right: "20px",
                bottom: "5px",
              }}
              src={lang}
              alt="img"
            />
            Change Language
          </div>
          <div
            style={{
              fontSize: "20px",
              position: "relative",
              left: "25px",
              top: "5px",
              padding: "10px",
              cursor: "pointer",
              fontFamily:
                "-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
            }}
          >
            <img
              style={{
                height: "20px",
                position: "relative",
                right: "20px",
                bottom: "5px",
              }}
              src={phone}
              alt="img"
            />
            Help & Support
          </div>
          <div
            style={{
              fontSize: "20px",
              position: "relative",
              left: "25px",
              top: "5px",
              padding: "10px",
              cursor: "pointer",
              fontFamily:
                "-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
            }}
          >
            <img
              style={{
                height: "20px",
                position: "relative",
                right: "20px",
                bottom: "5px",
              }}
              src={propic}
              alt="img"
            />
            Logout
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
