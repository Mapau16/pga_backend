import { ReviewRepository } from "../infraestructure/repositories/review";
import { Review } from "../models/review.model";

class ReviewService {

    private _reviewRepository: ReviewRepository
    constructor(reviewRepository: ReviewRepository) {
        this._reviewRepository = reviewRepository;
    }

    async saveReview(review: Review): Promise<Review> { 
        const savedReview = await this._reviewRepository.saveReview(review);
        return savedReview;
        //TODO: return Review
    }

    async findReviewByName(name: string): Promise<Review[]> { 
        const findedReview = await this._reviewRepository.findReviewByName(name);
        return findedReview; 
    }

    async findAllReviews(): Promise<Review[]> { 
        const findedReview = await this._reviewRepository.findAllReviews();
        return findedReview; 
    }
}

export default new ReviewService(new ReviewRepository());