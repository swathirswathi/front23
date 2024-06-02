import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import MainNav from "../../Components/MainNav/mainNav";
import GetAllUser from './GetAllUser';
import GetUserById from "./GetUserById";
import GetUserByUsername from "./GetUserByUsername";
import DeleteUser from "./DeleteUser";
import "../../Components/AdminDetails/AdminDetails.css";


function UserDetails () {
    const [selectedButton, setSelectedButton] = useState(null);

  const buttons = [ 'Get All User', 'Get User By Id', 'Get User By Username', 'Delete User'];

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  const renderDetails = () => {
    switch (selectedButton) {
        case 0:
          return <GetAllUser />;
        case 1:
          return <GetUserById/>;
        case 2:
          return <GetUserByUsername/>;
        case 3:
          return <DeleteUser/>;
        default:
          return null;
    }
  };

  return (
    <>
    <MainNav/>
    <div className="app-container1">
    <button type="button" class="btn btn-primary" style={{paddingTop:'60px'}} onClick={() => window.history.back()}>Back</button>
      <h3 style={{ textAlign: 'center'}}>User Details</h3>
      
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