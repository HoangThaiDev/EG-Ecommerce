// Import Components
import Header from "../UI/Header";
import BenefitList from "../components/AboutUs/BenefitList";
import Introduce from "../components/AboutUs/Introduce";

const AboutUs = () => {
  return (
    <>
      <Header title="About Us" linkBack="Home" linkCurrent="About Us" />
      <Introduce />
      <BenefitList />
    </>
  );
};

export default AboutUs;
