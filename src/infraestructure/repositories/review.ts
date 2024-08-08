import mongoose from "mongoose";
import ReviewSchema, { Review } from "../../models/review.model";

interface IReviewRepository {
    saveReview(review: Review): Promise<Review>,
    findReviewByName(name: string): Promise<Review[]>,
}

export class ReviewRepository implements IReviewRepository {
    
    async saveReview(review: Review): Promise<Review> {
        const newReview = await ReviewSchema.create(review);
       return newReview;
    }

    async findReviewByName(name: string): Promise<Review[]> {
        const review = await ReviewSchema.find({ "name" : { $regex: name, $options: 'i' }})
        return review!;
    }

    async findAllReviews(): Promise<Review[]> {
        const review = await ReviewSchema.find({});
        return review!;
    }
}