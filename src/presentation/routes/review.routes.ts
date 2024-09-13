import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { validateToken } from "../middlewares/auth.middleware";


export class ReviewRouter {

    static get routes(): Router {
        const router = Router();

        const reviewController = new ReviewController();
    
        router.get('/search', validateToken, reviewController.findReviewByName);
        router.get('/', validateToken, reviewController.findAllReviews);
        router.get('/statistics/clients', validateToken, reviewController.reviewsByClients);
        router.get('/statistics/roles', validateToken, reviewController.reviewsByRoles);
        router.get('/statistics/items', validateToken, reviewController.reviewsByItems);
        router.post('/', validateToken, reviewController.saveReview);
        router.get('/:idreview', validateToken, reviewController.findReviewById);
        router.patch('/:idreview', validateToken, reviewController.updateReview);

        return router;
    }

}