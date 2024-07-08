// Import Component
import Header from "../UI/Header";
import Form from "../components/Register/Form";

function Register() {
  return (
    <>
      <Header title="Register" linkBack="Home" linkCurrent="Register" />
      <Form />
    </>
  );
}

export default Register;
