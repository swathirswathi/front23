import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainNav from "../../Components/MainNav/mainNav";
import GetAllAdmin from './GetAllAdmin';
import GetAdminById from "./GetAdminById";
import GetAdminByUsername from "./GetAdminByUsername";
import DeleteAdmin from "./DeleteAdmin";
import "./AdminDetails.css";


function AdminDetailsPage ({ token }) {
    const [selectedButton, setSelectedButton] = useState(null);

    const buttons = ['Get All Admin', 'Get Admin By Id', 'Get Admin By Username', 'Delete Admin', 'Back'];

    const handleButtonClick = (index) => {
        setSelectedButton(index);
    };

    return (
        <>
            <MainNav />
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
                <div className="details-container1">
                    {selectedButton === 5 ? (
                        <Link to={{
                            pathname: '/adminDashboard',
                            state: { token: token }
                        }}>Back to Admin Dashboard</Link>
                    ) : (
                        renderDetails(selectedButton, token)
                    )}
                </div>
            </div>
        </>
    );

    function renderDetails(selectedButton, token) {
        switch (selectedButton) {
            case 0:
                return <GetAllAdmin token={token} />;
            case 1:
                return <GetAdminById token={token} />;
            case 2:
                return <GetAdminByUsername token={token} />;
            case 3:
                return <DeleteAdmin token={token} />;
            case 4:
                return <Link to="/adminDashboard">Back to Admin Dashboard</Link>;    
            default:
                return null;
        }
    }
}

export default AdminDetailsPage;
