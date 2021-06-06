const ReviewsDAO = require('../dao/reviewsDAO.js');

class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id;
      const review = req.body.text;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const date = new Date();
      
      const ReviewResponse = await ReviewsDAO.addReview(
        restaurantId,
        userInfo,
        review,
        date
      )
    }
  }
}

module.exports = ReviewsController;