import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import MainNav from "../../Components/MainNav/mainNav";
import GetAllCar from './GetAllCar';
import GetCarById from "./GetCarById";
import GetAvailableCar from "./GetAvailableCar";
import DeleteCar from "./DeleteCar";
import AddCar from "./AddCar";
import UpdateDailyRate from "./UpdateDailyRate";
import UpdateAvailability from "./UpdateAvailability";
import "./CarDetails.css";


function AdminDetailsPage () {
    const [selectedButton, setSelectedButton] = useState(null);

  const buttons = [ 'Get All Car', 'Get Car By Id', 'Get Available Car', 'Delete Car','AddCar','UpdateCarDailyRate', 'UpdateAvailability'];

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  const renderDetails = () => {
    switch (selectedButton) {
        case 0:
          return <GetAllCar />;
        case 1:
          return <GetCarById/>;
        case 2:
          return <GetAvailableCar/>;
        case 3:
          return <DeleteCar/>;
        case 4:
          return <AddCar/>;
        case 5:
          return <UpdateDailyRate/>;
        case 6:
          return <UpdateAvailability/>;
        default:
          return null;
    }
  };

  return (
    <>
    <MainNav/>
    <div className="app-container1">
    <button type="button" class="btn btn-primary" style={{paddingTop:'60px'}} onClick={() => window.history.back()}>Back</button>
                <h3 style={{textAlign: 'center'}}>Car Details</h3>
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