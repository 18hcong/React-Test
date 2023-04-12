import { useSelector } from 'react-redux';
import videoHomePage from '../../assets/video-homepage.mp4';
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

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
          {isAuthenticated === false ? 
            <button onClick={() => navigate('/login')}>Get's started. It's free</button>
           : 
            <button onClick={() => navigate('users')}>Doing Quiz Now</button>
          }
        </div>
      </div>
    </div>
  );
};

export default HomePage;
