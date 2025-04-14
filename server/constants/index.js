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

const thankYou_emailHtml = ({ survey }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Attending Our Event</title>
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
          .button {
            display: inline-block;
            background-color: #104E81;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 15px;
          }
          .button:hover {
            background-color: #0D3D66;
          }
          .signature {
            margin-top: 30px;
            font-size: 16px;
            color: #051D41;
          }
          .signature span {
            color: #CE9F00;
          }
          .social-links {
            margin-top: 20px;
            text-align: center;
          }
          .social-links a {
            margin: 0 10px;
            text-decoration: none;
          }
          .fun-fact {
            margin-top: 20px;
            padding: 15px;
            background-color: #FFF9E6;
            border-left: 4px solid #CE9F00;
            border-radius: 5px;
          }
          .formula {
            font-style: italic;
            color: #104E81;
            margin: 10px 0;
          }
          .solution {
            font-weight: bold;
            color: #147B58;
          }
          .congrats {
            margin-top: 20px;
            padding: 15px;
            background-color: #FFF6E9;
            border: 2px dashed #CE9F00;
            border-radius: 8px;
            text-align: center;
          }
          .winner-name {
            font-size: 20px;
            font-weight: bold;
            color: #CE9F00;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thank You for Attending!</h1>
          <p>We would like to express our sincere gratitude to everyone who attended <span class="bold">The <span class="highlight">WCC</span> x <span class="secondary-highlight">BCG</span> Opening Event</span> on March 20th, 2025.</p>
          
          <p>It was truly a pleasure to have you all join us for this special occasion. The event was a great success, and we hope you found it informative, inspiring, and enjoyable.</p>
          
          <div class="event-details">
            <p>We hope that you had the opportunity to:</p>
            <p>• Learn about various career pathways at <span class="secondary-highlight bold">BCG</span></p>
            <p>• Hear inspiring growth stories from industry professionals</p>
            <p>• Gain valuable insights during our keynote and Q&A sessions</p>
            <p>• Connect with like-minded individuals during our networking session</p>
          </div>
          
          <div class="congrats">
            <p><span class="bold highlight">Congratulations to Our Quiz Champion!</span></p>
            <p class="winner-name">Delano Martin</p>
            <p>For achieving the highest score in our interactive quiz. Outstanding performance!</p>
          </div>
          
          <div class="fun-fact">
            <p><span class="bold gold">Fun Game Follow-up:</span></p>
            <p>Many of you participated in our game during the event, and almost everyone got this particular question wrong:</p>
            <p><span class="bold">"If a product is sold at R100, and the profit margin is 25%, what was the cost price?"</span></p>
            
            <p><span class="bold highlight">Clarification:</span> The question was actually meant to ask about markup, not profit margin. This accidental mix-up of terms created quite the challenge!</p>
            
            <p><span class="bold">With markup (what we intended to ask):</span></p>
            <p>• Markup is calculated as a percentage of the cost price</p>
            <p>• If the markup is 25%, then: Cost Price + 25% of Cost Price = R100</p>
            <p>• Let's call the Cost Price "x": x + 0.25x = R100</p>
            <p>• 1.25x = R100</p>
            <p>• x = R100 ÷ 1.25 = <span class="solution">R80</span></p>
            
            <p><span class="bold">With margin (what we accidentally asked):</span></p>
            <p>• Profit Margin = (Profit ÷ Selling Price) × 100%</p>
            <p>• 25% of R100 is the profit, which equals R25</p>
            <p>• Cost Price = Selling Price - Profit = R100 - R25 = R75</p>
            
            <p>We apologize for any confusion caused by the terminology mix-up, but it certainly made for an interesting learning moment for everyone! Then, for the second question about the famous sequence, it's called the <span class="bold highlight">Fibonacci Sequence</span></p>
          </div>
          
          <p>We value your feedback immensely as it helps us improve and tailor future events to better serve our community.</p>
          
          <div style="text-align: center;">
            <a href="${survey}" class="button">Complete Our Feedback Survey</a>
          </div>
          
          <p>We have more exciting events planned for the coming months. To stay updated, follow us on our social media platforms and keep an eye on your emails for future invitations.</p>
          
          <div class="event-details">
            <p><span class="bold">Upcoming Events:</span></p>
            <p>• <span class="highlight">Case Interview Workshop</span> - April 9th, 2025</p>
            <p>• <span class="highlight">Simon Kucher Info Session</span> - April 10th, 2025</p>
            <p>• <span class="highlight">Oliver Wyman CV Workshop</span> - April 23rd, 2025</p>
            <p>• <span class="highlight">Cadena Partners Info Session</span> - April 24th, 2025</p>
          </div>
          
          <p>If you have any questions or would like to get involved with our club, please don't hesitate to reach out.</p>
          
          <div class="social-links">
            <p>Follow us:</p>
            <a href="https://www.linkedin.com/company/wits-consulting-club/posts/?feedView=all" style="color: #104E81;">LinkedIn</a> |
            <a href="https://www.instagram.com/wits_consulting_club/" style="color: #104E81;">Instagram</a> |
            <a href="https://www.tiktok.com/@witsconsultingclub?_t=ZM-8uqDf2zTa9H&_r=1" style="color: #104E81;">TikTok</a>
          </div>
          
          <p class="signature">Once again, thank you for your participation!<br><br>Kind regards,<br>Banzile Nhlebela <span>|</span> Co - Head <span>|</span> <span class="bold">The Wits Consulting Club</span></p>
        </div>
      </body>
    </html>
  `;
}

const CadenaEmailHtml = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cadena Growth Partners Information Session</title>
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
          h2 {
            color: #104E81;
            margin-top: 25px;
          }
          p {
            color: #6E85A0;
            font-size: 16px;
          }
          .bold {
            font-weight: bold;
          }
          .cadena-primary {
            color: #104E81;
          }
          .cadena-secondary {
            color: #6C77E3;
            font-weight: bold;
          }
          .event-details {
            margin-top: 10px;
            padding: 10px;
            background-color: #F5F7FB;
            border-radius: 8px;
          }
          .poster {
            text-align: center;
            margin-top: 20px;
          }
          .poster img {
            width: 1080px;
            height: 1350px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .gold {
            color: #CE9F00;
          }
          .signature {
            margin-top: 30px;
            font-size: 16px;
            color: #051D41;
          }
          .signature span {
            color: #CE9F00;
          }
          .speakers-section {
            margin-top: 20px;
            padding: 15px;
            background-color: #F5F7FB;
            border-radius: 8px;
          }
          .note {
            font-style: italic;
            margin-top: 20px;
            padding: 10px;
            background-color: #FFF8E5;
            border-left: 4px solid #CE9F00;
            border-radius: 4px;
          }
          .rsvp-button {
            display: inline-block;
            background-color: #6C77E3;
            color: white;
            padding: 12px 24px;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            margin: 20px 0;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .rsvp-button:hover {
            background-color: #104E81;
          }
          .button-container {
            text-align: center;
            margin: 25px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hello WCC Members</h1>
          <p>We are pleased to invite you to attend an <span class="bold">Information Session by <span class="cadena-secondary">Cadena Growth Partners</span></span> hosted by <span class="cadena-primary">The Wits Consulting Club</span>. This is an excellent opportunity to learn about career paths in consulting!</p>
          
          <div class="event-details">
            <p><span class="bold">Event:</span> <span class="cadena-secondary">Cadena Growth Partners</span> Information Session</p>
            <p><span class="bold">Date:</span> 24th April 2025</p>
            <p><span class="bold">Time:</span> 17h30 for 18h00 to 20h00</p>
            <p><span class="bold">Location:</span> John Moffat, A1</p>
          </div>
          
          <h2>About Cadena Growth Partners</h2>
          <p><span class="cadena-secondary">Cadena Growth Partners</span> is a premier management consulting firm specializing in growth strategy, digital transformation, and operational excellence. With a strong presence across Africa and global markets, they work with leading organizations to drive sustainable business growth and innovation. Their diverse team brings expertise from various industries including finance, technology, healthcare, and manufacturing.</p>
          
          <h2>Featured Speakers</h2>
          <div class="speakers-section">
            <p><span class="bold cadena-secondary">Valter Adao</span>: CEO and Digital Leader at Cadena Growth Partners</p>
            <p><span class="bold cadena-secondary">Victor Peenz</span>: Management Consutlant at Cadena Growth Partners</p>
            <p><span class="bold cadena-secondary">Siphile Shange</span>: Junior Designer at Cadena Growth Partners</p>
            <p></p>
          </div>
          
          <p>This event will include an overview of <span class="cadena-secondary">Cadena Growth Partners</span>, career opportunities, and a Q&A session with their team. A detailed agenda will be sent to you along with your QR code for entry after you RSVP.</p>
          
          <p>Please RSVP by clicking the button below to secure your spot</p>
          
          <div class="button-container">
            <a href="https://wcc-events-management/signup" class="rsvp-button">RSVP NOW</a>
          </div>
          
          <div class="note">
            <p>While this session is primarily geared towards postgraduate students, we welcome attendance from all students regardless of your year of study. This is an excellent networking opportunity for anyone interested in consulting careers.</p>
          </div>

          <div class="poster">
            <p>Check out the event poster below:</p>
            <img src="cid:cadena-poster" alt="Cadena Growth Partners Event Poster" />
          </div>
          
          <p class="signature">We look forward to seeing you there!<br><br>Kind regards,<br>Banzile Nhlebela <span>|</span> Co - Head <span>|</span> <span class="bold">The Wits Consulting Club</span></p>
        </div>
      </body>
    </html>
  `;
};

module.exports = {
  QR_emailHtml,
  thankYou_emailHtml,
  CadenaEmailHtml,
};