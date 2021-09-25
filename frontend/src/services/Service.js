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
                    ret = [res.data[0].lon, res.data[0].lat];

                    resolve(ret);
                } else {
                    reject(ret);
                }
            });
        });

        return promise;
    }

    async postNewAddress(data) {

        let promise = await new Promise( function (resolve, reject) {
            let res = http.post("/adviz/contacts", data);

            if(res !== null && res !== undefined){
                resolve(res);
            } else {
                reject(res);
            }
        });
        return promise;
    }

    deleteAddress(data) {
        return http.delete(`/adviz/contacts?firstName=${data.firstName}&lastName=${data.lastName}`);
    }

    async changeAddress(originalData, data) {

        let promise = await new Promise( function (resolve, reject) {
            let res = http.put(`/adviz/contacts?firstName=${originalData.firstName}&lastName=${originalData.lastName}`, data);

            if(res !== null && res !== undefined){
                resolve(res);
            } else {
                reject(res);
            }
        });
        return promise;
    }
}

export default new Service();