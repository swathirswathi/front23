
import React from 'react';
//import { Button, Accordion, Card } from 'react-bootstrap';
import './HelpSupport.css';
import { Link } from "react-router-dom";

function HelpSupport() {
    const handleGoBack = () => {
        window.history.back(); // Navigate back using browser's built-in functionality
    };

    return (
        <div className="help-support-container container" style={{width:"100vw" , backgroundColor:"white"}}>
            <button type="button" class="btn btn-primary" onClick={handleGoBack}>Back</button>
            <h2>Help & Support</h2>

            <section className="contact-info" style={{ backgroundColor: "#ddf6f6",border: "1px solid black"}}>
                <h3>Contact Information</h3>
                <ul>
                    <li><strong>Phone:</strong> 923-456-7890</li>
                    <li><strong>Email:</strong> support@roadreadyrentals.com</li>
                    <li><strong>Address:</strong> 123 Main Street, Bangalore, India</li>
                </ul>
            </section>

            <section className="faq" style={{ backgroundColor: "#ddf6f6",border: "1px solid black"}}>
            <h3>FAQs (Frequently Asked Questions)</h3>
                <ul>     
                    <li>
                        <details>
                            <summary>How do I make a reservation?</summary>
                            <p>To make a reservation, you can visit our website and use the online booking system, or you can contact our customer support team at 923-456-7890.</p>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>What types of vehicles do you offer?</summary>
                            <p>We offer a wide range of vehicles including sedans, SUVs, trucks, vans, and more. You can view our full selection on our website.</p>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>What are your hours of operation?</summary>
                            <p>Our customer support team is available to assist you from Monday to Friday, 9:00 AM to 5:00 PM. Our rental locations are open from 8:00 AM to 7:00 PM every day.</p>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>How can I cancel or modify my reservation?</summary>
                            <p>You can cancel or modify your reservation by logging into your account on our website or by contacting our customer support team at least 24 hours before your scheduled pickup time.</p>
                        </details>
                    </li>
                </ul>
            </section>

            <section className="terms-conditions" style={{ backgroundColor: "#ddf6f6",border: "1px solid black"}}>
                <h3>Terms and Conditions</h3>
                <p>Read our <Link to="terms">Terms of Service</Link> for information on our rental agreement, policies, and procedures.</p>
            </section>

            <section className="privacy-policy" style={{ backgroundColor: "#ddf6f6",border: "1px solid black"}}>
                <h3>Privacy Policy</h3>
                <p>Learn about how we collect, use, and protect your personal information by reading our <Link to="privacy">Privacy Policy</Link>.</p>
            </section>
        </div>
        
    );
}

export default HelpSupport;
