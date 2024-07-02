// Import Components
import Header from "../UI/Header";
import BenefitList from "../components/AboutUs/BenefitList";
import Introduce from "../components/AboutUs/Introduce";

const AboutUs = () => {
  return (
    <div className="about-us">
      <Header title="About Us" linkBack="Home" linkCurrent="About Us" />
      <Introduce />
      <BenefitList />
    </div>
  );
};

export default AboutUs;
