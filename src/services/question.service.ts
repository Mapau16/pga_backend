import { JwtAdapter } from "../config/jwt.adapter";
import { bcriptAdapter } from "../config/bcript.adapter";
import { errorResponse } from "../config/error.adapter";

import { QuestionRepository } from "../infraestructure/repositories/question";

import { User } from "../models/user.model";
import { IAuth } from "../models/auth.model";
import { Client } from "../models/client.model";
import { Question } from "../models/question.model";

class QuestionService {

    private _questionRepository: QuestionRepository
    constructor(questionRepository: QuestionRepository) {
        this._questionRepository = questionRepository;
    }

    async saveQuestion(question: Question): Promise<Question> { 
        const savedQuestion = await this._questionRepository.saveQuestion(question);
        return savedQuestion;
    }

    async updateQuestion(id: string, question: Question): Promise<Question> { 
        const updatedQuestion = await this._questionRepository.updateQuestion(id, question);
        return updatedQuestion;
    
    }

    async findQuestionByName(name: string): Promise<Question[]> { 
        const findedQuestion = await this._questionRepository.findQuestionByName(name);
        return findedQuestion; 
       
    }

    async findAllQuestions(): Promise<Question[]> { 
        const findedQuestion = await this._questionRepository.findAllQuestions();
        return findedQuestion; 
    }
}

export default new QuestionService(new QuestionRepository());