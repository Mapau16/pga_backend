import { Router } from "express";
import { QuestionController } from "../controllers/question.controller";


export class QuestionRouter {

    static get routes(): Router {
        const router = Router();

        const questionController = new QuestionController();
    
        router.post('/', questionController.saveQuestion);
        router.patch('/:id', questionController.updateQuestion);
        router.get('/', questionController.findQuestionByName);

        return router;
    }

}