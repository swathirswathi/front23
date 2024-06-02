import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import MainNav from "../../Components/MainNav/mainNav";
import GetAllReservation from './GetAllReservation';
import GetReservationById from './GetReservationById';
import "../../Components/AdminDetails/AdminDetails.css";
import GetReservationByUsername from './GetReservationByUsername';


function UserDetails () {
    const [selectedButton, setSelectedButton] = useState(null);

  const buttons = [ 'Get All Reservation','Get Reservation By Id','Get Reservation By Username'];

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
        default:
          return null;
    }
  };

  return (
    <>
    <MainNav/>
    <div className="app-container1">
    <button type="button" class="btn btn-primary" style={{paddingTop:'60px'}} onClick={() => window.history.back()}>Back</button>
      <h3 style={{textAlign: 'center'}}>Reservation Details</h3>
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