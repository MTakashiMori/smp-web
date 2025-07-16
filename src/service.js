import axios, {AxiosError} from "axios";
import messages from "@/constants/messages";
import Cookies from "js-cookie";
import store from "@/store";
import router from '@/router';

export default {

    get(path, data, notifySuccess = true) {

        let config = {
            headers: { Authorization: `Bearer ${Cookies.get('smp_token')}` }
        };
        config.params = data;

        const loadingKey = (Math.random() + 1).toString(36).substring(2);

        this.setLoading(loadingKey);

        return axios.get((process.env.VUE_APP_API_URL + path), config)
            .then((response) => {
                if(notifySuccess) {
                    this.notify(messages.messages.MSG001);
                }
                return response;
            })
            .catch((error) => {
                this.notify(messages.messages.MSG002);
                console.log(error);
            })
            .finally(() => {
                this.setLoading(loadingKey);
            });

    },

    save(path, data, id) {
        if(id) {
            return this.update(path, data, id);
        }
        return this.create(path, data);
    },

    create(path, data) {

        let config = null;

        return axios.post((process.env.VUE_APP_API_URL + path), data, config)
            .then((response) => {
                this.notify(messages.messages.MSG003);
                return response;
            })
            .catch((error) => {
                // this.notify(messages.messages.MSG002);
                console.log(error);
                throw new Error(error);
                //TODO WORK HERE TO RETURN ERROR TO METHOD
            });
    },

    update(path, data, id) {

        let config = null;

        return axios.put((process.env.VUE_APP_API_URL + path + '/' + id), data, config)
            .then((response) => {
                this.notify(messages.messages.MSG004);
                return response;
            })
            .catch((error) => {
                // this.notify(messages.messages.MSG002);
                console.log(error);
            });

    },

    remove(path, id) {
        let config = null;

        return axios.delete((process.env.VUE_APP_API_URL + path + '/' + id), config)
            .then((response) => {
                this.notify(messages.messages.MSG006);
                return response;
            })
            .catch((error) => {
                // this.notify(messages.messages.MSG002);
                console.log(error);
                throw new Error(error);
                //TODO WORK HERE TO RETURN ERROR TO METHOD
            });
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
                console.log(error.response);
                if(error.response.status == 401) {
                    this.notify(messages.messages.MSG005);
                    router.push({name: 'login'});
                }

                // this.notify(messages.messages.MSG002);
                // console.log(error.response);
            });

    },

    getAddressByZipCode(zipCode) {
        return axios.get(('https://viacep.com.br/ws/' + zipCode +'/json/'))
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error.response);
                if(error.response.status == 401) {
                    this.notify(messages.messages.MSG005);
                    router.push({name: 'login'});
                }

                // this.notify(messages.messages.MSG002);
                // console.log(error.response);
            });
    },

    notify( message, type= null) {
        store.dispatch('notify', {
            'message': message,
            'type': type
        })
    },

    setLoading(key) {
        store.dispatch('isLoading', key);
    }

}