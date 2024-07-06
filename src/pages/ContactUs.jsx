// Import Components
import FormContact from "../components/ContactUs/FormContact";
import Header from "../UI/Header";

function ContactUs() {
  return (
    <div className="about-us">
      <Header title="Contact Us" linkBack="Home" linkCurrent="Contact Us" />
      <FormContact />
    </div>
  );
}

export default ContactUs;
