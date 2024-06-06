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

    const buttons = ['Get All Admin', 'Get Admin By Id', 'Get Admin By Username', 'Delete Admin'];

    const handleButtonClick = (index) => {
        setSelectedButton(index);
    };

    return (
        <>
            <MainNav />
            <div className="app-container1">
                <button type="button" class="btn btn-primary" style={{paddingTop:'60px'}} onClick={() => window.history.back()}>Back</button>
                <h3 style={{textAlign: 'center'}}>Admin Details</h3>
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
            default:
                return null;
        }
    }
}

export default AdminDetailsPage;
