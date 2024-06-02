import React from 'react';

function PrivacyPolicy() {
  return (
    <div style={{
      maxWidth: '90vw',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f0f5f9',
      boxSizing: 'border-box',
      position: 'relative',  // Position relative to enable absolute positioning for the button
    }}>
       {/* Back button */}
    <button type="button" class="btn btn-primary"  onClick={() => window.history.back()}>Back</button>

      {/* Privacy Policy content */}
      <h1 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: 'blue' }}>PRIVACY POLICY</h1>
      
      <p style={{fontWeight:'bold' }}>Your privacy is important to us. It is RoadReadyRental's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
      <br />
      <p style={{fontWeight:'bold' }}>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
      <br />
      <p style={{fontWeight:'bold' }}>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.</p>
      <br />
      <p style={{fontWeight:'bold' }}>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
      <br />
      <p style={{fontWeight:'bold' }}>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
      <br />
      <p style={{fontWeight:'bold' }}>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
      <br />
      <p style={{fontWeight:'bold' }}>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
      <br />
      <p style={{fontWeight:'bold' }}>This policy is effective as of 1 January 2024.</p>
      <br />
      <h3 style={{fontWeight:'bold' }}>Contact Information</h3>
      <p style={{fontWeight:'bold' }}>If you have any questions or concerns about our Privacy Policy, please contact us at:</p>
      <p style={{fontWeight:'bold' }}>
                <ul>
                    <li><strong>Phone:</strong> 923-456-7890</li>
                    <li><strong>Email:</strong> support@roadreadyrentals.com</li>
                    <li><strong>Address:</strong> 123 Main Street, Bangalore, India</li>
                </ul></p>
    </div>
  );
}

export default PrivacyPolicy;
