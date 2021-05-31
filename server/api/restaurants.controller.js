const RestaurantsDAO = require('../dao/restaurantsDAO.js');

class RestaurantsController {
  static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurant, 10) : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    
    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.qeury.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }
    
    const { restaurantsList, NumRestaurants } = await RestaurantsDAO.getRestaurants({
      filters,
      page,
      restaurantsPerPage
    });
    
    let response = {
      restaurants: restaurantsList,
    }
  }
}

module.exports = RestaurantsController;