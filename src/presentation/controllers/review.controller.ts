import { Request, Response } from "express";
import ReviewService from "../../services/review.service";

interface RequestQuery {
    name: string;
}

export class ReviewController {

    public async saveReview(req: Request, res: Response) {
        try {
            const reviewData = req.body;

            const savedReview = await ReviewService.saveReview(reviewData);
            res.status(201).json(savedReview); // 201: Created
        } catch (error) {
            console.error("Error saving review:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async findReviewByName(req: Request, res: Response) {
        try {
            const {name} = req.query as unknown as RequestQuery;

            const foundReview = await ReviewService.findReviewByName(name);
            if (!foundReview) {
                res.status(404).json({ error: 'Review not found' });
                return;
            }
            res.status(200).json(foundReview);
        } catch (error) {
            console.error("Error finding review:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async findAllReviews(req: Request, res: Response) {
        try {
            const reviews = await ReviewService.findAllReviews();
            res.status(200).json(reviews);
        } catch (error) {
            console.error("Error finding review:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
