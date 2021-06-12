import axios from "axios";

export default axios.create({
  baseURL:
    "https://opalescent-cord-legal.glitch.me/api/v1/restaurants",
  headers: {
    "Content-type": "application/json"
  }
});
