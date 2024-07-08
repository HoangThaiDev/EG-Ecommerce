// Import Component
import Header from "../UI/Header";
import Form from "../components/Login/Form";

function Login() {
  return (
    <>
      <Header title="Login" linkBack="Home" linkCurrent="Login" />
      <Form />
    </>
  );
}

export default Login;
