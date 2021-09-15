import http from "../http-common"

class Service {

    doLogin(data) {
        return http.post("/adviz/login", data);
    }

    fetchUsers() {
        //TODO this fetches the passwords of every user too. TERRIFIC IDEA, but it works
        return http.get("/adviz/login");
    }

    fetchAddresses(user, all) {
        return http.get(`/adviz/contacts?userId=${user.name}&all=${all}`);
    }

    /*
	Fetches the lon and lat of a given address.
	The given address parameters will be used to get the location from the "Nominatim API"
	Returns an array with lon at index 0 and lat at index 1
    */
    async fetchLonLat(street, houseNumber, postcode, country) {
        let url = 'https://nominatim.openstreetmap.org/search?format=json'+
            '&street='+street+' '+houseNumber+
            '&postalcode='+postcode+
            '&country='+country;

        let promise = await new Promise( function (resolve, reject)
        {
            let ret;

            http.get(url).then(res => {

                if (res.data[0] !== null && res.data[0] !== undefined) {
                    console.log("LON: " + res.data[0].lon)
                    ret = [res.data[0].lon, res.data[0].lat];

                    console.log("RET: " + ret);
                    resolve(ret);
                } else {
                    reject(ret);
                }
            });
        });

        return promise;
    }

    postNewAddress(data) {
        return http.post("/adviz/contacts", data);
    }
}

export default new Service();