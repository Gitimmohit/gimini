// import { useEffect, useState } from 'react';
// import { Clock, CheckCircle2 } from 'lucide-react';
// import './QuizQuestion.css';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ServerAddress } from '../../server/ServerAddress';
// import { useSelector } from 'react-redux';

// export const QuizQuestion = ({ question, currentQuestion, totalQuestions, onNext, timePerQuestion = 30 }) => {
//   const accessToken = useSelector((state) => state.user.access_token);
//   const [timeLeft, setTimeLeft] = useState(timePerQuestion);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);

//   useEffect(() => {
//     setTimeLeft(timePerQuestion);
//     setSelectedOption(null);
//     setIsAnswered(false);
//   }, [question?.id, timePerQuestion]);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       handleTimeUp();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const send_quiz_question_data = () => {
//     axios
//       .post(
//         ServerAddress + 'cards/add_quiz_submission_details/',
//         {
//           question: question.id,
//           quiz: question.quiz_id,
//           is_answered: selectedOption || null
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`
//           }
//         }
//       )
//       .then(function (resp) {
//         if (resp.status === 201) {
//           toast.success(`Answer saved successfully!`, { position: 'top-center', autoClose: 2000 });
//         }
//       })
//       .catch((err) => {
//         toast.error(`Error Occur While Adding  ,${err}`, { position: 'bottom-right', autoClose: 1000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: 'colored', closeButton: false });
//         console.error(`Error Occur While Adding  ,${err}`);
//       });
//   };

//   const handleTimeUp = () => {
//     if (!isAnswered) {
//       setIsAnswered(true);
//       send_quiz_question_data();
//       setTimeout(() => {
//         onNext();
//       }, 1000);
//     }
//   };

//   const handleSave = () => {
//     if (selectedOption && !isAnswered) {
//       setIsAnswered(true);
//       send_quiz_question_data();
//       setTimeout(() => {
//         onNext();
//       }, 500);
//     }
//   };

//   const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
//   const timePercentage = (timeLeft / timePerQuestion) * 100;

//   const getTimerClass = () => {
//     if (timeLeft <= 5) return 'timer-danger';
//     if (timeLeft <= 10) return 'timer-warning';
//     return 'timer-normal';
//   };

//   const getTimerBarClass = () => {
//     if (timeLeft <= 5) return 'timer-bar-danger';
//     if (timeLeft <= 10) return 'timer-bar-warning';
//     return 'timer-bar-normal';
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className='quiz-container'>
//         <div className='quiz-card'>
//           <div className='progress-section'>
//             <div className='progress-header'>
//               <span className='progress-text'>
//                 Question {currentQuestion + 1} of {totalQuestions}
//               </span>
//               <div className={`timer-display ${getTimerClass()}`}>
//                 <Clock />
//                 <span>{timeLeft}s</span>
//               </div>
//             </div>
//             <div className='progress-bar'>
//               <div className='progress-fill' style={{ width: `${progressPercentage}%` }} />
//             </div>
//           </div>

//           <div className='timer-bar-container'>
//             <div className='timer-bar'>
//               <div className={`timer-bar-fill ${getTimerBarClass()}`} style={{ width: `${timePercentage}%` }} />
//             </div>
//           </div>

//           <div className='question-section'>
//             <h2 className='question-text'>{question?.question}</h2>
//           </div>

//           <div className='options-grid'>
//             {question?.options.map((option) => (
//               <button key={option.id} className={`option-button ${selectedOption === option.id ? 'selected' : ''}`} onClick={() => !isAnswered && setSelectedOption(option.id)} disabled={isAnswered}>
//                 <span className='option-content'>
//                   <span className='option-label'>{option.id}</span>
//                   <span className='option-text'>{option.text}</span>
//                   {selectedOption === option.id && <CheckCircle2 className='option-icon' />}
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div className='actions-section'>
//             <button className='save-button' onClick={handleSave} disabled={!selectedOption || isAnswered}>
//               {currentQuestion === totalQuestions - 1 ? 'Submit Quiz' : 'Save & Next'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };



// import { useEffect, useState } from "react";
// import { Clock, CheckCircle2 } from "lucide-react";
// import "./QuizQuestion.css";

// export const QuizQuestion = ({
//   question,
//   currentQuestion,
//   totalQuestions,
//   onNext,
//   timePerQuestion = 30,
// }) => {
//   const [timeLeft, setTimeLeft] = useState(timePerQuestion);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);

//   useEffect(() => {
//     setTimeLeft(timePerQuestion);
//     setSelectedOption(null);
//     setIsAnswered(false);

//     // Security: Disable right-click and inspect shortcuts
//     const disableRightClick = (e) => {
//       e.preventDefault();
//       return false;
//     };

//     const disableShortcuts = (e) => {
//       // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
//       if (
//         e.keyCode === 123 || 
//         (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
//         (e.ctrlKey && e.keyCode === 85) ||
//         (e.ctrlKey && e.keyCode === 83)
//       ) {
//         e.preventDefault();
//         return false;
//       }
//     };

//     // Disable screenshot shortcuts
//     const disableScreenshot = (e) => {
//       // PrtSc, Alt+PrtSc, Win+Shift+S
//       if (e.keyCode === 44 || (e.altKey && e.keyCode === 44)) {
//         e.preventDefault();
//         alert("स्क्रीनशॉट की अनुमति नहीं है!");
//         return false;
//       }
//     };

//     document.addEventListener("contextmenu", disableRightClick);
//     document.addEventListener("keydown", disableShortcuts);
//     document.addEventListener("keydown", disableScreenshot);

//     return () => {
//       document.removeEventListener("contextmenu", disableRightClick);
//       document.removeEventListener("keydown", disableShortcuts);
//       document.removeEventListener("keydown", disableScreenshot);
//     };
//   }, [question?.id, timePerQuestion]);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       handleTimeUp();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     // Security: Detect tab change and logout
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         alert("आपने टैब बदल दिया! क्विज से बाहर हो रहे हैं।");
//         window.location.href = "/";
//       }
//     };

//     const handleBlur = () => {
//       alert("आपने विंडो बदल दी! क्विज से बाहर हो रहे हैं।");
//       window.location.href = "/";
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     window.addEventListener("blur", handleBlur);

//     return () => {
//       clearInterval(timer);
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       window.removeEventListener("blur", handleBlur);
//     };
//   }, [timeLeft]);

//   const handleTimeUp = () => {
//     if (!isAnswered) {
//       setIsAnswered(true);
//       setTimeout(() => {
//         onNext();
//       }, 1000);
//     }
//   };

//   const handleSave = () => {
//     if (selectedOption && !isAnswered) {
//       setIsAnswered(true);
//       setTimeout(() => {
//         onNext();
//       }, 500);
//     }
//   };

//   const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
//   const timePercentage = (timeLeft / timePerQuestion) * 100;

//   const getTimerClass = () => {
//     if (timeLeft <= 5) return "timer-danger";
//     if (timeLeft <= 10) return "timer-warning";
//     return "timer-normal";
//   };

//   const getTimerBarClass = () => {
//     if (timeLeft <= 5) return "timer-bar-danger";
//     if (timeLeft <= 10) return "timer-bar-warning";
//     return "timer-bar-normal";
//   };

//   return (
//     <div className="quiz-container">
//       <div className="quiz-card">
//         <div className="progress-section">
//           <div className="progress-header">
//             <span className="progress-text">
//               Question {currentQuestion + 1} of {totalQuestions}
//             </span>
//             <div className={`timer-display ${getTimerClass()}`}>
//               <Clock />
//               <span>{timeLeft}s</span>
//             </div>
//           </div>
//           <div className="progress-bar">
//             <div 
//               className="progress-fill" 
//               style={{ width: `${progressPercentage}%` }}
//             />
//           </div>
//         </div>

//         <div className="timer-bar-container">
//           <div className="timer-bar">
//             <div
//               className={`timer-bar-fill ${getTimerBarClass()}`}
//               style={{ width: `${timePercentage}%` }}
//             />
//           </div>
//         </div>

//         <div className="question-section">
//           <h2 className="question-text">{question?.question}</h2>
//         </div>

//         <div className="options-grid">
//           {question?.options.map((option) => (
//             <button
//               key={option.id}
//               className={`option-button ${selectedOption === option?.id ? 'selected' : ''}`}
//               onClick={() => !isAnswered && setSelectedOption(option?.id)}
//               disabled={isAnswered}
//             >
//               <span className="option-content">
//                 <span className="option-label">{option?.id}</span>
//                 <span className="option-text">{option?.text}</span>
//                 {selectedOption === option?.id && (
//                   <CheckCircle2 className="option-icon" />
//                 )}
//               </span>
//             </button>
//           ))}
//         </div>

//         <div className="actions-section">
//           <button
//             className="save-button"
//             onClick={handleSave}
//             disabled={!selectedOption || isAnswered}
//           >
//             {currentQuestion === totalQuestions - 1 ? "Submit Quiz" : "Save & Next"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };



import { useEffect, useState } from "react";
import { Clock, CheckCircle2 } from "lucide-react";
import "./QuizQuestion.css";

export const QuizQuestion = ({
  question,
  currentQuestion,
  totalQuestions,
  onNext,
  timePerQuestion = 30,
}) => {
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setTimeLeft(timePerQuestion);
    setSelectedOption(null);
    setIsAnswered(false);

    // Security: Disable right-click and inspect shortcuts
    const disableRightClick = (e) => {
      e.preventDefault();
      return false;
    };

    const disableShortcuts = (e) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
      if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
        (e.ctrlKey && e.keyCode === 85) ||
        (e.ctrlKey && e.keyCode === 83)
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Disable screenshot shortcuts
    const disableScreenshot = (e) => {
      // PrtSc, Alt+PrtSc, Win+Shift+S
      if (
        e.keyCode === 44 || 
        (e.altKey && e.keyCode === 44) ||
        (e.shiftKey && e.metaKey && e.keyCode === 83) ||
        (e.shiftKey && e.key === 'Meta' && e.code === 'KeyS')
      ) {
        e.preventDefault();
        // alert("स्क्रीनशॉट की अनुमति नहीं है!");
        return false;
      }
    };

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableShortcuts);
    document.addEventListener("keydown", disableScreenshot);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableShortcuts);
      document.removeEventListener("keydown", disableScreenshot);
    };
  }, [question?.id, timePerQuestion]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Security: Detect tab change and logout
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // alert("आपने टैब बदल दिया! क्विज से बाहर हो रहे हैं।");
        window.location.href = "/";
      }
    };

    const handleBlur = () => {
      // alert("आपने विंडो बदल दी! क्विज से बाहर हो रहे हैं।");
      window.location.href = "/";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [timeLeft]);

  const handleTimeUp = () => {
    if (!isAnswered) {
      setIsAnswered(true);
      setTimeout(() => {
        onNext();
      }, 1000);
    }
  };

  const handleSave = () => {
    if (selectedOption && !isAnswered) {
      setIsAnswered(true);
      setTimeout(() => {
        onNext();
      }, 500);
    }
  };

  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
  const timePercentage = (timeLeft / timePerQuestion) * 100;

  const getTimerClass = () => {
    if (timeLeft <= 5) return "timer-danger";
    if (timeLeft <= 10) return "timer-warning";
    return "timer-normal";
  };

  const getTimerBarClass = () => {
    if (timeLeft <= 5) return "timer-bar-danger";
    if (timeLeft <= 10) return "timer-bar-warning";
    return "timer-bar-normal";
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-text">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <div className={`timer-display ${getTimerClass()}`}>
              <Clock />
              <span>{timeLeft}s</span>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="timer-bar-container">
          <div className="timer-bar">
            <div
              className={`timer-bar-fill ${getTimerBarClass()}`}
              style={{ width: `${timePercentage}%` }}
            />
          </div>
        </div>

        <div className="question-section">
          <h2 className="question-text">{question?.question}</h2>
        </div>

        <div className="options-grid">
          {question?.options.map((option) => (
            <button
              key={option.id}
              className={`option-button ${selectedOption === option?.id ? 'selected' : ''}`}
              onClick={() => !isAnswered && setSelectedOption(option?.id)}
              disabled={isAnswered}
            >
              <span className="option-content">
                <span className="option-label">{option?.id}</span>
                <span className="option-text">{option?.text}</span>
                {selectedOption === option?.id && (
                  <CheckCircle2 className="option-icon" />
                )}
              </span>
            </button>
          ))}
        </div>

        <div className="actions-section">
          <button
            className="save-button"
            onClick={handleSave}
            disabled={!selectedOption || isAnswered}
          >
            {currentQuestion === totalQuestions - 1 ? "Submit Quiz" : "Save & Next"}
          </button>
        </div>
      </div>
    </div>
  );
};
