import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import MainNav from "../../Components/MainNav/mainNav";
import GetAllReviews from './GetAllReviews';
import "../../Components/AdminDetails/AdminDetails.css";
import GetReviewsByUsername from './GetReviewsByUsername';


function ReviewDetails () {
    const [selectedButton, setSelectedButton] = useState(null);

  const buttons = [ 'Get All Reviews','Get Reviews By Username'];

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  const renderDetails = () => {
    switch (selectedButton) {
        case 0:
          return <GetAllReviews />;
        case 1:
          return <GetReviewsByUsername />;
        default:
          return null;
    }
  };

  return (
    <>
    <MainNav/>
    <div className="app-container1">
    <button type="button" class="btn btn-primary" style={{paddingTop:'60px'}} onClick={() => window.history.back()}>Back</button>
      <h3 style={{ textAlign: 'center'}}>Review Details</h3>
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

export default ReviewDetails;