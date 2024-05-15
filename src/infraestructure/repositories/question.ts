import mongoose from "mongoose";
import QuestionSchema, { Question } from "../../models/question.model";

interface IQuestionRepository {
    saveQuestion(question: Question): Promise<Question>,
    updateQuestion(id: string, question: Question): Promise<Question>,
    findQuestionByName(name: string): Promise<Question[]>,
}

export class QuestionRepository implements IQuestionRepository {
    
    async saveQuestion(question: Question): Promise<Question> {
        const newQuestion = await QuestionSchema.create(question);
       return newQuestion;
    }

    async updateQuestion(id: string, question: Question): Promise<Question> {
       const updateQuestion = await QuestionSchema.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, question, { upsert: true, new: true })
       return updateQuestion;
    }

    async findQuestionByName(name: string): Promise<Question[]> {
        const question = await QuestionSchema.find({ "name" : { $regex: name, $options: 'i' }})
        return question!;
    }

    async findAllQuestions(): Promise<Question[]> {
        const question = await QuestionSchema.find({});
        return question!;
    }
}