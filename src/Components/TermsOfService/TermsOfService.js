import React from 'react';

function TermsOfService() {
  return (
  <div style={{
    maxWidth: '90vw',  // Ensure it fits within the viewport width
    margin: '20px auto',  // Center the container horizontally
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxSizing: 'border-box',
    backgroundColor: '#f0f5f9',
    position: 'relative'
  }}>
    {/* Back button */}
    <button type="button" class="btn btn-primary"  onClick={() => window.history.back()}>Back</button>
    
       
      
      <h1 style={{ textAlign: 'center', marginBottom: '20px',fontWeight: 'bold', color:'blue' }}>TERMS OF SERVICE</h1>
      
      <h3 style={{color:'navy', fontWeight:'bold' }}>1. Introduction</h3>
      <p style={{fontWeight:'bold' }}>Welcome to RoadReadyRental's . These Terms of Service govern your use of our car rental services. By accessing or using our Services, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use our Services.</p>
      <br />
      <h3 style={{color:'navy', fontWeight:'bold' }}>2. Eligibility</h3>
      <p style={{fontWeight:'bold' }}>You must be at least 21 years old and possess a valid driver’s license to use our Services. By using our Services, you represent and warrant that you meet these eligibility requirements.</p>
       <br />

      <h3 style={{color:'navy', fontWeight:'bold' }}>3. Booking and Payment</h3>
      <h4 style={{fontWeight:'bold',paddingLeft:'30px' }}>3.1. Booking</h4>
      <ul>
        <li style={{fontWeight:'bold' }}>Reservations can be made through our website or mobile app.</li>
        <li style={{fontWeight:'bold' }}>All bookings are subject to availability.</li>
        <li style={{fontWeight:'bold' }}>A valid credit card is required to secure a reservation.</li>
      </ul>
      <h4 style={{fontWeight:'bold' ,paddingLeft:'30px' }}>3.2. Payment</h4>
      <ul>
        <li style={{fontWeight:'bold' }}>Payment for rental services must be made in full at the time of booking.</li>
        <li style={{fontWeight:'bold' }}>We accept major credit cards and other specified payment methods.</li>
        <li style={{fontWeight:'bold' }}>Additional charges may apply for optional services and equipment.</li>
      </ul>
       <br />

      <h3 style={{color:'navy', fontWeight:'bold' }}>4. Rental Period</h3>
      <h4 style={{fontWeight:'bold' ,paddingLeft:'30px' }}>4.1. Duration</h4>
      <ul>
        <li style={{fontWeight:'bold' }}>The rental period begins at the time specified in the booking confirmation and ends when the vehicle is returned.</li>
        <li style={{fontWeight:'bold' }}>Extensions to the rental period are subject to availability and must be requested in advance.</li>
      </ul>
      <h4 style={{fontWeight:'bold' ,paddingLeft:'30px' }}>4.2. Late Returns</h4>
      <ul>
        <li style={{fontWeight:'bold' }}>Late returns may incur additional charges.</li>
        <li style={{fontWeight:'bold' }}>If you anticipate a late return, please contact us as soon as possible.</li>
      </ul>
       <br />

      <h3 style={{color:'navy', fontWeight:'bold' }}>5. Vehicle Use and Restrictions</h3>
      <h4 style={{fontWeight:'bold' ,paddingLeft:'30px' }}>5.1. Permitted Use</h4>
      <ul>
        <li style={{fontWeight:'bold' }}>The vehicle must be used in accordance with all applicable laws and regulations.</li>
        <li style={{fontWeight:'bold' }}>The vehicle may only be driven by authorized drivers listed on the rental agreement.</li>
      </ul>
      <h4 style={{fontWeight:'bold' ,paddingLeft:'30px' }}>5.2. Prohibited Use</h4>
      <ul>
        <li style={{fontWeight:'bold' }}>The vehicle must not be used for illegal activities, off-road driving, or towing.</li>
        <li style={{fontWeight:'bold' }}>Smoking and transporting hazardous materials in the vehicle are prohibited.</li>
      </ul>
      <h4 style={{fontWeight:'bold' ,paddingLeft:'30px' }}>5.3. Maintenance and Condition</h4>
      <ul>
        <li style={{fontWeight:'bold' }}>You are responsible for maintaining the vehicle in good condition.</li>
        <li style={{fontWeight:'bold' }}>Any damage or mechanical issues must be reported to us immediately.</li>
      </ul>
       <br />

      <h3 style={{color:'navy', fontWeight:'bold' }}>6. Insurance and Liability</h3>
      <h4 style={{fontWeight:'bold' ,paddingLeft:'30px' }}>6.1. Insurance Coverage</h4>
      <ul>
        <li style={{fontWeight:'bold' }}>Basic insurance coverage is included with your rental.</li>
        <li style={{fontWeight:'bold' }}>Optional additional insurance coverage is available for purchase.</li>
      </ul>
      <h4 style={{fontWeight:'bold'  ,paddingLeft:'30px'}}>6.2. Liability</h4>
      <ul>
        <li style={{fontWeight:'bold' }}>You are responsible for any damage to the vehicle during the rental period, subject to the terms of the insurance policy.</li>
        <li style={{fontWeight:'bold' }}>In the event of an accident, you must report the incident to us and the relevant authorities promptly.</li>
      </ul>
      
      <h3 style={{color:'navy', fontWeight:'bold' }}>7. Cancellations and Modifications</h3>
      <h4 style={{fontWeight:'bold' ,paddingLeft:'30px' }}>7.1. Cancellations</h4>
      <ul>
        <li style={{fontWeight:'bold' }}>Cancellations made more than 24 hours before the scheduled rental period will receive a full refund.</li>
        <li style={{fontWeight:'bold' }}>Cancellations made within 24 hours of the rental period may incur a cancellation fee.</li>
      </ul>
      <h4 style={{fontWeight:'bold' ,paddingLeft:'30px' }}>7.2. Modifications</h4>
      <ul>
        <li style={{fontWeight:'bold' }}>Modifications to your booking are subject to availability and may incur additional charges.</li>
        <li style={{fontWeight:'bold' }}>Please contact us to request any changes to your reservation.</li>
      </ul>
       <br />

      <h3 style={{color:'navy', fontWeight:'bold' }}>8. Privacy and Data Protection</h3>
      <p style={{fontWeight:'bold' }}>We are committed to protecting your personal information. Our privacy policy outlines how we collect, use, and safeguard your data.</p>
       <br />

      <h3 style={{color:'navy', fontWeight:'bold' }}>9. Termination</h3>
      <p style={{fontWeight:'bold' }}>We reserve the right to terminate your rental agreement and access to our Services if you violate these Terms.</p>
       <br />

      <h3 style={{color:'navy', fontWeight:'bold' }}>10. Governing Law</h3>
      <p style={{fontWeight:'bold' }}>These Terms are governed by and construed in accordance with the laws of [your jurisdiction].</p>
       <br />

      <h3 style={{color:'navy', fontWeight:'bold' }}>11. Contact Information</h3>
      <p style={{fontWeight:'bold' }}>If you have any questions or concerns about these Terms, please contact us at:</p>
      <p style={{fontWeight:'bold' }}>
                  <ul>
                    <li><strong>Phone:</strong> 923-456-7890</li>
                    <li><strong>Email:</strong> support@roadreadyrentals.com</li>
                    <li><strong>Address:</strong> 123 Main Street, Bangalore, India</li>
                </ul>
      </p>
      <p style={{fontWeight:'bold' }}>By using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
    </div>
  );
}

export default TermsOfService;
