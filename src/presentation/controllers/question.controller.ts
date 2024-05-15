import { Request, Response } from "express";
import QuestionService from "../../services/question.service";

interface RequestQuery {
    name: string;
  }

export class QuestionController {

    public async saveQuestion(req: Request, res: Response) {
        try {
            const questionData = req.body;

            const savedQuestion = await QuestionService.saveQuestion(questionData);
            res.status(201).json(savedQuestion); // 201: Created
        } catch (error) {
            console.error("Error saving question:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    
    public async updateQuestion(req: Request, res: Response) {
        try {
            const { id } = req.params; 
            const questionData = req.body;

            const updatedQuestion = await QuestionService.updateQuestion(id, questionData);
            if (!updatedQuestion) {
                res.status(404).json({ error: 'Question not found' });
                return;
            }
            res.status(200).json(updatedQuestion);
        } catch (error) {
            console.error("Error updating question:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async findQuestionByName(req: Request<RequestQuery>, res: Response) {
        try {
            const {name} = req.query as unknown as RequestQuery;

            const foundQuestion = await QuestionService.findQuestionByName(name);
            if (!foundQuestion) {
                res.status(404).json({ error: 'Question not found' });
                return;
            }
            res.status(200).json(foundQuestion);
        } catch (error) {
            console.error("Error finding question:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async findAllQuestions(req: Request, res: Response) {
        try {
            const questions = await QuestionService.findAllQuestions();
            res.status(200).json(questions);
        } catch (error) {
            console.error("Error finding question:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
