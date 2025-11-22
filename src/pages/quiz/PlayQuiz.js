import { useEffect, useLayoutEffect, useState } from 'react';
import { QuizQuestion } from '../../components/quizquestion/QuizQuestion';
import { ThankYou } from '../../components/quizquestion/ThankYou';
import { ServerAddress } from '../../server/ServerAddress';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Sample quiz data - can be replaced with API data later
// const quizData = [
//   {
//     id: 1,
//     question: 'भारत की राजधानी क्या है?',
//     options: [
//       { id: 'A', text: 'मुंबई' },
//       { id: 'B', text: 'नई दिल्ली' },
//       { id: 'C', text: 'कोलकाता' },
//       { id: 'D', text: 'चेन्नई' }
//     ]
//   },
//   {
//     id: 2,
//     question: 'भारत का राष्ट्रीय खेल कौन सा है?',
//     options: [
//       { id: 'A', text: 'क्रिकेट' },
//       { id: 'B', text: 'हॉकी' },
//       { id: 'C', text: 'फुटबॉल' },
//       { id: 'D', text: 'बैडमिंटन' }
//     ]
//   },
//   {
//     id: 3,
//     question: 'भारत में कुल कितने राज्य हैं?',
//     options: [
//       { id: 'A', text: '26' },
//       { id: 'B', text: '28' },
//       { id: 'C', text: '29' },
//       { id: 'D', text: '30' }
//     ]
//   },
//   {
//     id: 4,
//     question: 'ताजमहल किस शहर में स्थित है?',
//     options: [
//       { id: 'A', text: 'दिल्ली' },
//       { id: 'B', text: 'आगरा' },
//       { id: 'C', text: 'जयपुर' },
//       { id: 'D', text: 'लखनऊ' }
//     ]
//   },
//   {
//     id: 5,
//     question: 'भारत का सबसे बड़ा राज्य (क्षेत्रफल के अनुसार) कौन सा है?',
//     options: [
//       { id: 'A', text: 'महाराष्ट्र' },
//       { id: 'B', text: 'राजस्थान' },
//       { id: 'C', text: 'मध्य प्रदेश' },
//       { id: 'D', text: 'उत्तर प्रदेश' }
//     ]
//   }
// ];
// console.log("dataQuicg",quizData)
const PlayQuiz = () => {
  const accessToken = useSelector((state) => state.user.access_token);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [quizData, setquizData] = useState([]);
  console.log('quizData--', quizData);

  // get Questions at add Quiz
  const GetQuizPlayData = () => {
    axios
      .get(ServerAddress + `cards/get_quiz_play_data/?quiz_id=15`, {
        //   .get(ServerAddress + `cards/get_quiz_play_data/?quiz_id=${'6'}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then((response) => {
        console.log('response--', response);
        setquizData(response.data.quiz_data);
      })
      .catch((err) => {
        console.log('err--', err);
        // toast.error(`Error Occur in Get Question List, ${err}`, { position: 'bottom-right', autoClose: 5000 });
      });
  };

  useLayoutEffect(() => {
    GetQuizPlayData();
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  if (isQuizComplete) {
    return <ThankYou totalQuestions={quizData.length} />;
  }

  return <QuizQuestion question={quizData[currentQuestionIndex]} currentQuestion={currentQuestionIndex} totalQuestions={quizData.length} onNext={handleNext} timePerQuestion={quizData[currentQuestionIndex]?.time || 30} />;
};

export default PlayQuiz;
