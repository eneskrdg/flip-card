import axios from "axios";
import { BASE_URL,QUESTIONS_URL } from "../constants/baseUrl";



export const getCategories = async ()=>{
    return axios.get(`${BASE_URL}`);
};

export const getQuestions = async (
  quantity = 1,
  category = '',
  difficulty = '',
) => {
return axios.get(`${QUESTIONS_URL}?amount=${quantity}&category=${category}&difficulty=${difficulty}`);

};

