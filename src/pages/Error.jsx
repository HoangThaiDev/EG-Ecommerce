// Import Component
import Header from "../UI/Header";
import Section from "../components/Error/Section";

function Error() {
  return (
    <div className="error">
      <Header title="404" linkBack="Home" linkCurrent="Error Page" />
      <Section />
    </div>
  );
}

export default Error;
