import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import MainNav from "../../Components/MainNav/mainNav";
import GetAllReservation from './GetAllReservation';
import "../../Components/AdminDetails/AdminDetails.css";


function UserDetails () {
    const [selectedButton, setSelectedButton] = useState(null);

  const buttons = [ 'Get All Reservation', 'Back'];

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  const renderDetails = () => {
    switch (selectedButton) {
        case 0:
          return <GetAllReservation />;
        case 1:
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