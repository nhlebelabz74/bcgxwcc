const QR_emailHtml = ({ name }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Event RSVP Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #FCFDFF;
            text-align: left;
            padding: 20px;
            color: #051D41;
          }
          .container {
            max-width: 600px;
            background: #FFFFFF;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin: auto;
            text-align: left;
          }
          h1 {
            color: #104E81;
          }
          p {
            color: #6E85A0;
            font-size: 16px;
          }
          .bold {
            font-weight: bold;
          }
          .highlight {
            color: #104E81;
          }
          .secondary-highlight {
            color: #147B58;
          }
          .event-details {
            margin-top: 10px;
            padding: 10px;
            background-color: #F5F7FB;
            border-radius: 8px;
          }
          .gold {
              color: #CE9F00;
          }
          .agenda-details {
            margin-left: 20px;
            font-size: 14px;
            color: #6E85A0;
          }
          .qr-code {
            text-align: center;
            margin-top: 20px;
          }
          .qr-code img {
            width: 200px;
            height: 200px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .signature {
            margin-top: 30px;
            font-size: 16px;
            color: #051D41;
          }
          .signature span {
            color: #CE9F00;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hello, ${name}!</h1>
          <p>Thank you for RSVPing for <span class="bold">The <span class="highlight">WCC</span> x <span class="secondary-highlight">BCG</span> Opening Event</span>. We are excited to have you join us!</p>
          <p>Below are the details for the event, for your convenience:</p>
          <div class="event-details">
            <p><span class="bold">Event:</span> The <span class="highlight">WCC</span> x <span class="secondary-highlight">BCG</span> Opening Event</p>
            <p><span class="bold">Date:</span> 20th March 2025</p>
            <p><span class="bold">Time:</span> 17h30 for 18h00 to 21h00</p>
            <p><span class="bold">Location:</span> Wits University, Johan Moffat, A1</p>
          </div>
          <p>Please note, there is limited space for 100 people, so please ensure you arrive on time to secure your spot. Additionally, we will start promptly at 18h00 and doors will close at 18h15. You will need to present a QR Code at the door.</p>

          <div class="qr-code">
            <p>Here is your QR code for entry:</p>
            <img src="cid:qrcode" alt="QR Code for Entry" />
          </div>

          <p>Below is the Agenda for the event:</p>
          <div class="event-details">
            <p><span class="bold highlight">17h30 - 18h00: Arrival and Welcome</span></p>
            <p><span class="bold highlight">18h00 - 18h20: Opening Speech and Executive Intro - <span class="gold">Augustine Ledwaba</span></span></p>
            <p><span class="bold highlight">18h20 - 18h30: Entertainment - <span class="gold">Banzile Nhlebela</span></span></p>
            <p><span class="bold highlight">18h30 - 19h15:</span> <span class="secondary-highlight bold">Firm Showcase (BCG)</span></p>
            <div class="agenda-details">
              <p><span class="bold secondary-highlight">Introduction and Welcome - Diana Mbanda</span></p>
              <p>Meet our BCG Team</p>
              <p><span class="bold secondary-highlight">Who We Are - Lindokuhle Shongwe</span></p>
              <p>How we're so much more than consulting!</p>
              <p><span class="bold secondary-highlight">BCG Growth Unlocked</span></p>
              
              <p>My Growth Story 1 – <span class="bold secondary-highlight">Mncedisi Thanjekwayo</span></p>
              <p>My Growth Story 2 – <span class="bold secondary-highlight">Thato Nong</span></p>

              <p><span class="bold secondary-highlight">Opportunities & Beyond - Nosipho Cele & Diana Mbanda</span></p>
              <p>Different pathways into BCG</p>
              <p><span class="bold secondary-highlight">Our Case Interviews - Nkosinathi Mthembu</span></p>
              <p>What is a case interview</p>
            </div>
            <p><span class="bold highlight">19h15 - 19h40:</span> <span class="secondary-highlight bold">Keynote - Uwais Razack</span></p>
            <p><span class="bold highlight">19h40 - 19h55:</span> <span class="secondary-highlight bold">Q & A Session</span></p>
            <p><span class="bold highlight">19h55 - 20h00: Closing Remarks - <span class="gold">Lexi Davies & Katleho Rathai</span></span></p>
            <p><span class="bold highlight">20h00 - 21h00: Networking and Refreshments</span></p>
          </div>

          <p class="signature">We look forward to seeing you!<br><br>Kind regards,<br>Banzile Nhlebela <span>|</span> Co - Head <span>|</span> <span class="bold">The Wits Consulting Club</span></p>
        </div>
      </body>
    </html>
  `;
};

const thankYou_emailHtml = ({ name }) => {

}

module.exports = {
  QR_emailHtml,
  thankYou_emailHtml
};