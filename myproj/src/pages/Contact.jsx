import { Button } from 'react-bootstrap';
import './contact.css'; 

function Contact() {
  return (
    <div className="contact-container-split">
      <div className="contact-left">
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input type="text" className="form-control" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email address" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message:</label>
            <textarea className="form-control" id="message" rows="5" placeholder="Type your message here"></textarea>
          </div>
          <Button type="submit" className="btn btn-primary btn-lg btn-block">Send Message</Button>
        </form>
      </div>
      <div className="contact-right">
        
        <h1>Get in Touch</h1>
        <p className="lead">We'd love to hear from you! Please<br></br>fill out the form .</p>
        
      </div>
    </div>
  );
}

export default Contact;