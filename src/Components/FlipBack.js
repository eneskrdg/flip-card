import React from "react";
import { shuffle } from "lodash";
import { replaceSpecialChars } from '../utils/ReplaceChar';

export const FlipBack = ({ item, handleAnswer, isCorrectWithIndex }) => {
        return (
            <div>
           <ul>
            <li className="p-1">
              <p>{replaceSpecialChars(item.question)}</p>
            </li>
            {shuffle([...item.incorrect_answers, item.correct_answer])
              .sort() 
              .map((answer, answerIndex) => (
                <li
                  className={`cursor-pointer hover:text-gray-400 ${
                    isCorrectWithIndex.itemIndex === answerIndex &&
                    isCorrectWithIndex.itemQuestion === item.question &&
                    "text-yellow-400 hover:text-yellow-500"
                  }`}
                  key={answerIndex}
                  onClick={(e) => handleAnswer(answer, item, answerIndex)}
                >
                  {isCorrectWithIndex.itemIndex === answerIndex &&
                    isCorrectWithIndex.itemQuestion === item.question && (
                      <span className="text-xl text-yellow-400 hover:text-yellow-500">
                        &#10003;
                      </span>
                    )}
                  {replaceSpecialChars(answer)}
                </li>
              ))}
          </ul>
          </div>
        );
    };

