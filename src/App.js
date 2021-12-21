import image from './images/hero-quiz-marketing.jpg';
import './App.css';
import { useState, useEffect } from "react";
import {getCategories,getQuestions} from "./utils/fetchQuestion";
import { numberOfQuestions,difficulties } from "./constants/quizFeature";

function App() {
  const [categories, setCategories] = useState("");
  const [questions, setQuestions] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  

  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
   console.log(event.target.value);
  };
  
  const handleCategory = (event) => {
    setCategory(event.target.value);
    console.log(event.target);
  };
  

  const handleDifficulty = (event) => {
    setDifficulty(event.target.value);
    console.log(event.target.value);
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


  const handleSubmit = async(quantity,category,difficulty) => {
    try {
      console.log(quantity,category,difficulty);
      const response= await getQuestions(quantity,category,difficulty);
      
      console.log(response.data);

     
    } catch (error) {
      console.error("Something went wrong!");
    }
      
  };
  
  
  return (

    <div>
<div class="card" >
  <div class="card-body">
    <h5 class="card-title">Ready for quiz ?</h5>
    
    <h6 class="card-text">Pick number of questions, category and difficulty.</h6>
    <select class="col-2 form-select-lg" aria-label=".form-select-lg example" 
    onChange={handleQuantity}>
    <option value="" defaultValue="" hidden>
          Number of Questions
        </option>
        {numberOfQuestions.map((num, index) => (
          <option key={index}>{num}</option>
        ))}

</select>
<select class="col-5 form-select-lg" aria-label=".form-select-lg example" 
onChange={handleCategory} >
<option value="default" disabled="true" selected="false" hidden="true">Pick a category</option>
{categories?.trivia_categories?.map((categories) => (
            <option value={categories.trivia_categories} key={categories._id}>
              {categories.name}
            </option>
          ))}
</select>
<select class="col-2 form-select-lg" aria-label=".form-select-lg example" 
onChange={handleDifficulty}>
<option value="" defaultValue="" hidden>
          Select Difficulty
        </option>
        {difficulties.map((diff, index) => (
          <option key={index} value={diff.toLowerCase()}>
            {diff}
          </option>
        ))}
      </select>
<button type="col-3 form-select-lg" class="btn btn-primary" 
 onClick={handleSubmit}
  setIsLoading={setIsLoading}>Submit</button>
  </div>
</div>


    <div className="container d-flex align-items-center justify-content-center flex-wrap">

      
    <div className="box">
        <div className="body">
            <div className="imgContainer"><img src={image} alt=""/>  </div>
            <div className="content d-flex flex-column align-items-center justify-content-center">
                <div>
                    <p className="">In the TV show "Cheers", Sam Malone was a former relief pitcher for which baseball team?</p>
                    <button class="btn btn-outline-danger"> Buton </button>
                    <button class="btn btn-outline-danger"> Buton </button>
                    <button class="btn btn-outline-danger"> Buton </button>
                    <button class="btn btn-outline-danger"> Buton </button>
                </div>
            </div>
        </div>
        
    </div>



    <div className="box">
        <div className="body">
            <div className="imgContainer"><img src={image} alt=""/>  </div>
            <div className="content d-flex flex-column align-items-center justify-content-center">
                <div>
                    <p className="">In the TV show "Cheers", Sam Malone was a former relief pitcher for which baseball team?</p>
                    <button class="btn btn-outline-danger"> Buton </button>
                    <button class="btn btn-outline-danger"> Buton </button>
                    <button class="btn btn-outline-danger"> Buton </button>
                    <button class="btn btn-outline-danger"> Buton </button>
                </div>
            </div>
        </div>
        
    </div>




    <div>
    </div>
    </div>
    </div>
  );
}

export default App;
