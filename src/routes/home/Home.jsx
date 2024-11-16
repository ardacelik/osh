import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>One Stop Health</h1>
      <Link to="/dashboard">Get Started Now</Link>
    </div>
  );
};

export default Home;
