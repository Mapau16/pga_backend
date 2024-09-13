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

    public async findReviewById(req: Request, res: Response) {
        try {
            const { idreview } = req.params as any;

            const review = await ReviewService.findReviewById(idreview);
            if (!review) {
                res.status(404).json({ error: 'Review not found' });
                return;
            }
            res.status(200).json(review);
        } catch (error) {
            console.error("Error finding review:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async updateReview(req: Request, res: Response) {
        try {
            const { idreview } = req.params; 
            const reviewData = req.body;

            const updatedreview = await ReviewService.updateReview(idreview, reviewData);
            if (!updatedreview) {
                res.status(404).json({ error: 'Review not found' });
                return;
            }
            res.status(200).json(updatedreview);
        } catch (error) {
            console.error("Error updating review:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async reviewsByClients(req: Request, res: Response) {
        try {
            const data = await ReviewService.reviewsByClients();
            res.status(200).json(data);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async reviewsByRoles(req: Request, res: Response) {
        try {
            const data = await ReviewService.reviewsByRoles();
            res.status(200).json(data);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async reviewsByItems(req: Request, res: Response) {
        try {
            const data = await ReviewService.reviewsByItems();
            res.status(200).json(data);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}
