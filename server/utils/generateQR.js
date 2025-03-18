const QRCode = require('qrcode');

const generateQR = async ({ link }) => {
  try {
    // Validate the link
    if (!link || typeof link !== 'string') {
      throw new Error('Invalid link provided');
    }

    const options = {
      color: {
        dark: '#104E81', // Dark blue color
        light: '#ffffff', // White background
      },
      width: 800, // Set the width to 800px
    };

    // Generate the QR code as a data URL
    const url = await QRCode.toDataURL(link, options);
    return url;
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err; // Re-throw the error to handle it in the calling function
  }
};

module.exports = generateQR;