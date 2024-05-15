import { Router } from "express";
import { QuestionController } from "../controllers/question.controller";
import { validateToken } from "../middlewares/auth.middleware";


export class QuestionRouter {

    static get routes(): Router {
        const router = Router();

        const questionController = new QuestionController();
    
        router.get('/search', validateToken, questionController.findQuestionByName);
        router.post('/', validateToken, questionController.saveQuestion);
        router.patch('/:id', validateToken, questionController.updateQuestion);
        router.get('/', validateToken, questionController.findAllQuestions);

        return router;
    }

}