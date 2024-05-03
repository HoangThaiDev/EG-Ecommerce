import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get("http://localhost:5000/users");
      setUsers(data);
      setIsLoading(true);
    };
    fetchUser();
  }, []);

  return (
    <div className="main">
      {isLoading &&
        users.length > 0 &&
        users.map((user) => (
          <div key={user._id}>
            <p>{user.name} -</p>
          </div>
        ))}
    </div>
  );
}

export default App;
