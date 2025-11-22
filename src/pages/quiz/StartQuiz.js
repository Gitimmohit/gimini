import { useNavigate } from 'react-router-dom';
import { Play, Brain } from 'lucide-react';
import './StartQuiz.css';
import { useEffect, useState } from 'react';

const StartQuiz = () => {
  const navigate = useNavigate();
  // ← YEH API SE AAYEGA (quiz_date + quiz_time)
  const quizStartTime = '2025-11-22T23:29:00'; // Example: 25 Nov, 2:30 PM

  const [timeLeft, setTimeLeft] = useState(0);
  const [canStart, setCanStart] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(quizStartTime).getTime();
      const now = new Date().getTime();
      const diff = start - now; // milliseconds 
      if (diff <= 0) {
        setCanStart(true);
        setTimeLeft(0);
        clearInterval(timer);
      } else {
        setCanStart(false);
        setTimeLeft(Math.floor(diff / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStartTime]);

  // TUMHARA WALA EXACT FORMAT → "2 दिन 20 घंटे 30 मिनट 45 सेकंड बाद"
  const formatCountdown = (totalSeconds) => {
    if (totalSeconds <= 0) return 'क्विज़ शुरू करें';

    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let text = 'क्विज़ ';

    if (days > 0) text += `${days} दिन `;
    if (hours > 0 || days > 0) text += `${hours} घंटे `;
    if (minutes > 0 || hours > 0 || days > 0) text += `${minutes} मिनट `;
    text += `${seconds} सेकंड बाद`;

    return text;
  };

  return (
    <div className='index-container'>
      <div className='index-card'>
        <h1 className='app-title'>PlayQuiz</h1>

        <p className='app-subtitle'>अपने ज्ञान का परीक्षण करें और मज़ेदार सवालों के जवाब दें!</p>

        <div className='rules-box'>
          <h3 className='rules-title'>क्विज़ के नियम:</h3>
          <ul className='rules-list'>
            <li>
              <span className='bullet'>•</span>
              <span>प्रत्येक सवाल के लिए 30 सेकंड का समय</span>
            </li>
            <li>
              <span className='bullet'>•</span>
              <span>समय समाप्त होने पर अगला सवाल स्वतः आ जाएगा</span>
            </li>
            <li>
              <span className='bullet'>•</span>
              <span>एक बार आगे बढ़ने के बाद पीछे नहीं जा सकते</span>
            </li>
            <li>
              <span className='bullet'>•</span>
              <span>अंतिम सवाल के बाद क्विज़ स्वतः सबमिट हो जाएगी</span>
            </li>
          </ul>
        </div>

        {/* <button className='start-button' onClick={() => navigate('/quiz/play')}>
          <Play />
          क्विज़ शुरू करें
        </button> */}
        <button className={`start-button ${canStart ? 'ready' : 'waiting'}`} onClick={() => canStart && navigate('/quiz/play')} disabled={!canStart}>
          <Play className='play-icon' />
          {canStart ? 'क्विज़ शुरू करें' : formatCountdown(timeLeft)}
        </button>
      </div>
    </div>
  );
};

export default StartQuiz;
