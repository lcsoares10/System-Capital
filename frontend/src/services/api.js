import axios from 'axios';

// import { useAuthContext } from '../Context/AuthContext';

//defino qual será a base para as requições
const api = axios.create({
  //baseURL: 'http://localhost:3333',
  //baseURL: 'http://193.168.100.7:3333',
  baseURL: process.env.REACT_APP_BASE_URL,
});

// //===================
// // Add a response interceptor
//   api.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   console.log('aqui1');
//   return response;

// }, function (error) {

//   //const { _logout } = useContext(AuthContext);
//   const { _logout } = useAuthContext();
//   //Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons

//   if (error.response.status == 401) {
//     _logout();
//   }
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error.response);
// });

export default api;
