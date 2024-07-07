// Import Component
import Header from "../UI/Header";
import MainSection from "../components/FAQ/MainSection";

function FAQ() {
  return (
    <div className="faqs">
      <Header title="FAQ" linkBack="Home" linkCurrent="FAQ" />
      <MainSection />
    </div>
  );
}

export default FAQ;
