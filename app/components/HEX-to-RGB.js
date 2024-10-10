// components/HexToRgbConverter.js
import { useState } from 'react';

export default function HexToRgbConverter() {
  const [hexColor, setHexColor] = useState('#000000');
  const [rgbColor, setRgbColor] = useState('rgb(0, 0, 0)');
  const [errorMessage, setErrorMessage] = useState('');

  const handleHexChange = (event) => {
    const newHex = event.target.value;
    setHexColor(newHex);

    // Basic validation (you can enhance this)
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(newHex)) {
      setErrorMessage('Invalid hex code');
      setRgbColor('');
      return;
    } else {
      setErrorMessage('');
    }

    // Convert hex to RGB
    const hexMatch = newHex.match(/^#([0-9A-F]{3}){1,2}$/i);
    if (hexMatch) {
      let hex = hexMatch[1];
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      setRgbColor(`rgb(${r}, ${g}, ${b})`);
    }
  };



  return (
    <div>
      <h2>Hex to RGB Converter</h2>
      <label htmlFor="hexInput">Hex Code:</label>
      <input
        type="text"
        id="hexInput"
        value={hexColor}
        onChange={handleHexChange}
        maxLength={7}  // Limit input to 7 characters (including #)
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <p>RGB: {rgbColor}</p>
      {/* Display a color preview */}
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: hexColor,
          border: '1px solid black',
          marginTop:"1rem"
        }}
      ></div>
    </div>
  );
}