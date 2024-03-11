import axios, {AxiosError} from "axios";
import messages from "@/constants/messages";

export default {

    get(path) {
        let config = null;

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

    }

}