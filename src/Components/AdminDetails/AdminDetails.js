import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import MainNav from "../../Components/MainNav/mainNav";
import GetAllAdmin from './GetAllAdmin';
import GetAdminById from "./GetAdminById";
import GetAdminByUsername from "./GetAdminByUsername";
import DeleteAdmin from "./DeleteAdmin";
import UpdateEmailAdmin from './UpdateEmailAdmin';
import "./AdminDetails.css";


function AdminDetailsPage () {
    const [selectedButton, setSelectedButton] = useState(null);

  const buttons = [ 'Get All Admin', 'Get Admin By Id', 'Get Admin By Username', 'Delete Admin',/*'UpdateEmail'*/ ,'Back'];

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  const renderDetails = () => {
    switch (selectedButton) {
        case 0:
          return <GetAllAdmin />;
        case 1:
          return <GetAdminById/>;
        case 2:
          return <GetAdminByUsername/>;
        case 3:
          return <DeleteAdmin/>;
        // case 4:
        //   return <UpdateEmailAdmin/>;
        case 5:
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

export default AdminDetailsPage;