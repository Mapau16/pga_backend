import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { validateToken } from "../middlewares/auth.middleware";


export class ReviewRouter {

    static get routes(): Router {
        const router = Router();

        const reviewController = new ReviewController();
    
        router.get('/search', validateToken, reviewController.findReviewByName);
        router.post('/', reviewController.saveReview);
        router.get('/', validateToken, reviewController.findAllReviews);

        return router;
    }

}