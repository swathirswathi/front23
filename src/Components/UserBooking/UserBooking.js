import { useLocation } from "react-router-dom";
import AdminNavbar from "../../Components/Admin/AdminNavbar";
import Table from "react-bootstrap/Table";
import { useState } from "react";

function UserBookings() {
  const location = useLocation([]);
  const data = location.state;
  console.log(data);

  return (
    <>
      <AdminNavbar />
      <Table
        striped
        bordered
        hover
        style={{
          position: "relative",
          top: "150px",
          marginLeft: "125px",
          width: "80rem",
        }}
      >
        <thead>
          <tr>
            <th>Sno</th>
            <th>Name</th>
            <th>Username</th>
            <th>Car Booked</th>
            <th>Pickup Date</th>
            <th>Pickup Location</th>
            <th>Drop Date</th>
            <th>Drop Location</th>
            <th>Payments</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>{data.user.userId}</td>
                <td>{data.user.firstName}</td>
                <td>{data.user.username}</td>
                <td>{data.car.make+" "+data.car.model} | CarID={data.car.carId} | {data.car.specification.slice(0,15)}</td>
                <td>{data.pickUpDateTime}</td>
                <td>{data.pickUpStoreLocation}</td>
                <td>{data.dropOffDateTime}</td>
                <td>{data.dropOffStoreLocation}</td>
                <td>{data.totalPrice}</td>
            </tr>
        </tbody>
      </Table>
    </>
  );
}

export default UserBookings;
