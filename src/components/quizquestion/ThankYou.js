import { CheckCircle2, Home } from 'lucide-react';
import './ThankYou.css';
import { useNavigate } from 'react-router-dom';

export const ThankYou = ({ totalQuestions }) => {
  const navigate = useNavigate();
  return (
    <div className='thankyou-container'>
      <div className='thankyou-card'>
        <div className='icon-container'>
          <div className='icon-wrapper'>
            <div className='icon-glow' />
            <CheckCircle2 className='icon-check' />
          </div>
        </div>

        <h1 className='thankyou-title'>Thank You!</h1>

        <p className='thankyou-subtitle'>आपने क्विज़ पूरा कर लिया है!</p>

        <div className='stats-box'>
          <p className='stats-text'>
            आपने <span className='stats-number'>{totalQuestions}</span> सवालों का जवाब दिया
          </p>
        </div>
 
          <button className='home-button' onClick={() => navigate('/student')}>
            <Home />
            होम पर जाएं
          </button>
      </div>
    </div>
  );
};
