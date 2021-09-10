import axios from "axios";

export default axios.create({
    //baseURL: "http://localhost:5000/api/v1/restaurants",
    baseURL: "http://localhost:5000",
    headers: {
        "Content-type": "application/json"
    }
});