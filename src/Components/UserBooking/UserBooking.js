import { useLocation } from "react-router-dom";
import AdminNavbar from "../../Components/Admin/AdminNavbar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function UserBookings() {
  const location = useLocation([]);
  const data = location.state;
  console.log(data);

  return (
    <>
      <AdminNavbar />
      
      <div className="d-flex justify-content-center" style={{marginTop:"30px"}}>
        {data && (
          <Card style={{ maxWidth: "75rem", margin: "50px auto" }}>
            {/* Back button */}
            <button type="button" style={{width:'100px'}} className="btn btn-primary"   onClick={() => window.history.back()}>Back</button>
            <Row className="no-gutters">
              <Col md={4}>
                <Card.Img
                  src={data.car.imageURL}
                  style={{ width: "100%", maxHeight: "100%", objectFit: "cover",marginTop:"30px", marginLeft:"20px"}}
                />
                <Card.Title  style={{textAlign:"center", marginTop:"5px"}}><strong>{`${data.car.make} ${data.car.model}`}</strong></Card.Title>
                <ListGroup.Item style={{textAlign:"center"}}>
                      <strong>Car ID:</strong> {data.car.carId}
                </ListGroup.Item>
              </Col>
              <Col md={8}>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Username:</strong> {data.user.username}
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                      <strong>Car Specification:</strong>{" "}
                      {data.car.specification.slice(0, 15)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Pickup Date:</strong>{" "}
                      {data.pickUpDateTime}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Pickup Location:</strong>{" "}
                      {data.pickUpStoreLocation}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Drop Date:</strong>{" "}
                      {data.dropOffDateTime}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Drop Location:</strong>{" "}
                      {data.dropOffStoreLocation}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Payments:</strong> {data.totalPrice}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        )}
      </div>
    </>
  );
}

export default UserBookings;
