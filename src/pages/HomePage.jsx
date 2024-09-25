import "../styles/components/HomePage/index.scss";
import brandBanner from "../assets/next-bot-desktop.png";
// import Nlogo from "../assets/N.png";
// import brandLogo from "../assets/automation.png";

function HomePage() {
  return (
    <div className="banner">
      <div className="banner-img">
        <div className="banner-img-container">
          <div className="banner-title">
            Automation Potential Evaluator
          </div>
        </div>

        <img src={brandBanner} height="80%" alt="Brand Banner" />
        <div className="banner-text">
          <h1>Take Guesswork Out Of Automation</h1>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
