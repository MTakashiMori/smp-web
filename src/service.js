import axios, {AxiosError} from "axios";
import messages from "@/constants/messages";
import Cookies from "js-cookie";
import store from "@/store";

export default {

    get(path, data) {

        let config = {
            headers: { Authorization: `Bearer ${Cookies.get('smp_token')}` }
        };
        config.params = data;

        return axios.get((process.env.VUE_APP_API_URL + path), config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                // this.notify(messages.messages.MSG002);
                console.log(error);
            });

    },

    save(path, data, id) {
        if(id) {
            return this.update(path, data);
        }
        return this.create(path, data);
    },

    create(path, data) {

        let config = null;

        return axios.post((process.env.VUE_APP_API_URL + path), data, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                // this.notify(messages.messages.MSG002);
                console.log(error);
            });
    },

    update(path, data) {

        let config = null;

    },

    remove() {

    },

    login(data, path = 'auth/login') {
        let config = null;

        return axios.post((process.env.VUE_APP_API_URL + path), data, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                // this.notify(messages.messages.MSG002);
                console.log(error);
            });
    },

    getUser(path = 'auth/getUser') {
        let config = {
            headers: { Authorization: `Bearer ${Cookies.get('smp_token')}` }
        };
        config.params = {};

        return axios.post((process.env.VUE_APP_API_URL + path),null, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                // this.notify(messages.messages.MSG002);
                console.log(error);
            });

    }

}