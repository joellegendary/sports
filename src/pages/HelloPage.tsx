import { Link } from "react-router-dom";
import "./HelloPage.css";

const HelloPage: React.FC = () => {
  return (
    <div className="hello-page-container">
      <div className="hello-content animate-fadeInUp">
        <h1 className="hello-title animate-bounce">THE SPORTS ZONE</h1>
        <p className="hello-subtitle">
          Your ultimate destination for sports updates, stats, and excitement.
        </p>

        <Link
          to="/signup"
          className="hello-btn hover:glow-green"
          aria-label="Enter Sports Zone"
        >
          Enter Sports Zone
        </Link>
      </div>

      <Link
        to="/signup"
        className="login-btn hover:glow-red"
        aria-label="Signup"
      >
        Signup
      </Link>
    </div>
  );
};

export default HelloPage;
