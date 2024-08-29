import React, { useState, useEffect } from 'react';

const FlipcardGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://opentdb.com/api.php?amount=10&type=multiple";
        const response = await fetch(url);
        const data = await response.json();
        
        console.log("Data", data.results);

        // Adding correct answer to the options and then shuffle them
        const questionsWithOptions = data.results.map((question) => {
          const options = [...question.incorrect_answers, question.correct_answer];
          return { ...question, options: options.sort(() => Math.random() - 0.5) };
        });

        setQuestions(questionsWithOptions);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const handleAnswerClick = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correct_answer) {
      setFeedback("Your answer is correct!");
    } else {
      setFeedback(`Wrong! The correct answer was: ${currentQuestion.correct_answer}`);
    }
    
    setShowFeedback(true);

    // Move to the next question after a short delay
    setTimeout(() => {
      setShowFeedback(false);
      setFeedback("");
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // If it was the last question, reset the game or show final results
        alert("You have completed all the questions!");
        setCurrentQuestionIndex(0);
      }
    }, 2000);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className='flex items-center justify-center bg-red-600 border mx-[280px] py-2 rounded font-bold mt-9' >FlipcardGame</div>
      
      
      {questions.length > 0 && (
       <div className='h-screen '>
          <p className='border border-red-600 ml-[10px] bg-green-500 mt-9 font-semibold px-[70px] rounded'>{currentQuestion.question}</p>
          <div>
            {currentQuestion.options.map((option, index) => (
              <button className=' border border-red-600 ml-[10px]' key={index} onClick={() => handleAnswerClick(option)}>
                {option}
              </button>
            ))}
          </div>
          {showFeedback && <div>{feedback}</div>}
        </div>
        
      )}
      
    </>
  );
};

export default FlipcardGame;
