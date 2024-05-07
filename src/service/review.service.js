const { Review } = require("../models/index");
class ReviewService {

    static async getReviewsMentor(mentorId, limit, offset) {

        let finalLimit = limit;
        let finalOffset = offset;

        if (limit === undefined || limit <= 0) {
            finalLimit = 10;
        }

        if (offset === undefined || offset < 0) {
            finalOffset = 0;
        }

        const reviews = await Review.findAll({
            where: {
                userId: mentorId
            },
            limit: limit,
            offset: offset,
        })
        return reviews;

    }
}

module.exports = ReviewService;