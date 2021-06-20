import axios from "axios";

export default axios.create({
  baseURL:
    //"https://opalescent-cord-legal.glitch.me/api/v1/restaurants",
    "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/restaurant-reviews-lelfz/service/restaurants/incoming_webhook/",
  headers: {
    "Content-type": "application/json"
  }
});
