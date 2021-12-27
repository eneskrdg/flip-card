import image from './images/hero-quiz-marketing.jpg';
import './App.css';
import { useState, useEffect } from "react";
import {getCategories,getQuestions} from "./utils/fetchQuestion";
import { numberOfQuestions,difficulties } from "./constants/quizFeature";
import { FlipBack } from "./Components/FlipBack";
function App() {
  const [categories, setCategories] = useState("");
  const [questions, setQuestions] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const [isCorrectWithIndex, setIsCorrectWithIndex] = useState({
    isCorrect: false,
    itemIndex: 0,
    itemQuestion: "",
  });

  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleCategory = (event) => {
    console.log(event.target);
    setCategory(event.target.value);
  };

  const handleDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  const handleFetchCategory = async () => {
    try {
      setIsLoading(true);
      const response = await getCategories();
      setCategories(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Something went wrong!");
    }
  };

  useEffect(() => {
    handleFetchCategory();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(quantity, category, difficulty);
      const response = await getQuestions(quantity, category, difficulty);
     setData(response.data);
    } catch (error) {
      console.error("Something went wrong!");
    }
  };

  const handleAnswer = (answer, question, answerIndex) => {
    if (answer === question.correct_answer) {
      setIsCorrectWithIndex({
        isCorrect: true,
        itemIndex: answerIndex,
        itemQuestion: question.question,
      });
      setTimeout(function () {
        setData(data.filter((x) => x.question !== question.question));
      }, 1000);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Ready for quiz ?</h5>

          <h6 className="card-text">
            Pick number of questions, category and difficulty.
          </h6>
          <select
            className="col-2 form-select-lg"
            aria-label=".form-select-lg example"
            onChange={handleQuantity}
          >
            <option value="" defaultValue="" hidden>
              Number of Questions
            </option>
            {numberOfQuestions.map((num, index) => (
              <option key={index}>{num}</option>
            ))}
          </select>
          <select
            className="col-5 form-select-lg"
            aria-label=".form-select-lg example"
            onChange={handleCategory}
          >
            <option
              value="default"
              disabled="true"
              selected="false"
              hidden="true"
            >
              Pick a category
            </option>
            {categories?.trivia_categories?.map((categories) => (
              <option value={categories.id} key={categories.id}>
                {categories.name}
              </option>
            ))}
          </select>
          <select
            className="col-2 form-select-lg"
            aria-label=".form-select-lg example"
            onChange={handleDifficulty}
          >
            <option value="" defaultValue="" hidden>
              Select Difficulty
            </option>
            {difficulties.map((diff, index) => (
              <option key={index} value={diff.toLowerCase()}>
                {diff}
              </option>
            ))}
          </select>
          <button
            type="col-3 form-select-lg"
            class="btn btn-primary"
            onClick={handleSubmit}
            setIsLoading={setIsLoading}
          >
            Submit
          </button>
        </div>
      </div>
     
      <div className="container d-flex align-items-center justify-content-center flex-wrap">
      
        
        <div className="box">
          <div className="body">
            <div className="imgContainer">
              <img src={image} alt="" />{" "}
            </div>
            <div className="content d-flex flex-column align-items-center justify-content-center">
              {data.map ((item, index)=>{
                return (<div key={index}>
                  {console.log(item)}
                  <FlipBack item={item}
                  handleAnswer={handleAnswer}
                  isCorrectWithIndex={isCorrectWithIndex}/>
                {console.log(item)}
                </div>)
              })
            
}
             
            </div>
          </div>
        </div>
       
       

      
      </div>
    </div>
  );
}

export default App;