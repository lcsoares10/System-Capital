import axios from 'axios';

//defino qual será a base para as requições
const api = axios.create({
    //baseURL:'http://localhost:3333'
    baseURL:'http://192.168.1.6:3333'
});

//===================
// // Add a response interceptor
//   api.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   console.log('aqui1');

//   return response;
// }, function (error) {

//   //const { _logout } = useContext(AuthContext);
//   const { _logout } = useAuthContext();

//   if (error.response.status == 401) {
//     _logout();
//   }
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error.response);
// });

export default api;
