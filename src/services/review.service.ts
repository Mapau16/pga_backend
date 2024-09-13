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

    async findReviewById(idreview: string): Promise<Review> { 
        const findedReview = await this._reviewRepository.findReviewById(idreview);
        return findedReview; 
    }

    async updateReview(id: string, review: Review): Promise<Review> { 
        const updatedReview = await this._reviewRepository.updateReview(id, review);
        return updatedReview;
    }

    async reviewsByClients(): Promise<any> { 
        const data = await this._reviewRepository.getReviewsByClients();
        return data;
    }
    
    async reviewsByRoles(): Promise<any> { 
        const data = await this._reviewRepository.getReviewsByRoles();
        return data;
    }

    async reviewsByItems(): Promise<any> { 
        const data = await this._reviewRepository.getItemsByReviews();
        return data;
    }
}

export default new ReviewService(new ReviewRepository());