import http from "../http-common"
import axios from "axios";

class Service {

    doLogin(data) {
        //let response = http.post("/adviz/login", data);

        return http.post("/adviz/login", data);

    }
}

export default new Service();