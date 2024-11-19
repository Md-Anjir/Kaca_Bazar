import React from 'react';
import myGif from '../images/logo.gif'; // Adjust the path to your GIF file

const GifComponent = () => {
    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0px',
    //   height: '100vh', // Full viewport height
    //   backgroundColor: '#f0f0f0', // Optional: Add a background color
    };
  
    return (
      <div style={containerStyle}>
        <img style={{width: '50vh'}} src={myGif} alt="My GIF" />
      </div>
    );
  };

export default GifComponent;
