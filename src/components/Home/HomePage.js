import videoHomePage from "../../assets/video-homepage.mp4";

const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-one">There's a better way to ask!</div>
        <div className="title-two">
          You don't want to make a boring form. And your audience won't answer
          one. Created a typeform insead-and make...
        </div>
        <div className="title-three">
          <button>Get's started. It's free</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
