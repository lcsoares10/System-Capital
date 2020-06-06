
import axios from 'axios';

//defino qual será a base para as requições
const api = axios.create({
    baseURL:'http://localhost:3333'
    //baseURL:'http://192.168.1.2:3333'
});

export default api;
