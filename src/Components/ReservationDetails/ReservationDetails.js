import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import MainNav from "../../Components/MainNav/mainNav";
import GetAllReservation from './GetAllReservation';
import GetReservationById from './GetReservationById';
import "../../Components/AdminDetails/AdminDetails.css";
import GetReservationByUsername from './GetReservationByUsername';


function UserDetails () {
    const [selectedButton, setSelectedButton] = useState(null);

  const buttons = [ 'Get All Reservation','Get Reservation By Id','Get Reservation By Username', 'Back'];

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  const renderDetails = () => {
    switch (selectedButton) {
        case 0:
          return <GetAllReservation />;
        case 1:
          return <GetReservationById />;
        case 2:
          return <GetReservationByUsername />;
        case 3:
          return <Link to="/adminDashboard">Back to Admin Dashboard</Link>;
        default:
          return null;
    }
  };

  return (
    <>
    <MainNav/>
    <div className="app-container1">
      <h3>Admin Details</h3>
      <div className="button-container1">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`button1 ${selectedButton === index ? 'active' : ''}`}
            onClick={() => handleButtonClick(index)}
          >
            {button}
          </button>
        ))}
      </div>
      <div className="details-container1">{renderDetails()}</div>
    </div>
    </>
  );
  
};

export default UserDetails;