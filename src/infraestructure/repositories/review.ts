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
        const review = await ReviewSchema.aggregate([
            { $project: {
                name: 1,
                client: 1,
                date: 1
            }}
        ]);
        return review!;
    }

    async findReviewById(idreview: string): Promise<Review> {
        const review = await ReviewSchema.find({ _id : new mongoose.Types.ObjectId(idreview)});
        return review[0];
    }

    async updateReview(id: string, question: Review): Promise<Review> {
        const updateReview = await ReviewSchema.findByIdAndUpdate(
            {_id: new mongoose.Types.ObjectId(id)}, 
            { $set: {
                name: question.name,
                client: question.client,
                'cycle.name': question.cycle.name,
                'cycle.worker': question.cycle.worker,
                'cycle.role': question.cycle.role,
            }}, { upsert: true, new: true, overwrite: false });

        return updateReview;
     }
}