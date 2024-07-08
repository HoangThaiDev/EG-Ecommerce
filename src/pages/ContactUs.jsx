// Import Components
import FormContact from "../components/ContactUs/FormContact";
import Header from "../UI/Header";

function ContactUs() {
  return (
    <>
      <Header title="Contact Us" linkBack="Home" linkCurrent="Contact Us" />
      <FormContact />
    </>
  );
}

export default ContactUs;
