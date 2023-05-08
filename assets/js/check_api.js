// const url = 'https://google-maps-geocoding.p.rapidapi.com/geocode/json?latlng=40.714224%2C-73.96145&language=en';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'content-type': 'application/octet-stream',
// 		'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
// 		'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com'
// 	}
// };
// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

// const axios = require('axios');

// let response = null;
// new Promise(async (resolve, reject) => {
//   try {
//     response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
//       headers: {
//         'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
//       },
//     });
//   } catch(ex) {
//     response = null;
//     // error
//     console.log(ex);
//     reject(ex);
//   }
//   if (response) {
//     // success
//     const json = response.data;
//     console.log(json);
//     resolve(json);
//   }
// });


// function getUsers() {
//     fetch("axios")
//       .then((results) => {
//         return results.json();
//       })
//       .then((data) => {
//         console.log(data);
//         // return data;
//         // Access your data here
//       });
//     const url = 'https://lexper.p.rapidapi.com/v1.1/card?url=https%3A%2F%2Fthenextweb.com%2Fnews%2Fpixel-6-teaser&js_timeout=30';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '0936ccdcb4msh5b6ef4889dd3c12p152ea8jsn1bade0549ed2',
// 		'X-RapidAPI-Host': 'lexper.p.rapidapi.com'
// 	}
// };

// fetch(url,options)
//       .then((results) => {
//         return results.json();
//       })
//       .then((data) => {
//         console.log(data);
//         // return data;
//         // Access your data here
//       });
//   }
// getUsers();



// let xhrReq = new XMLHttpRequest();

// xhrReq.onload = function() {

//   let resJS0N =JSON.parse(xhrReq.response); 
//   console.log(resJS0N);
  
//   } ;
  
//   xhrReq.open("get", "https://api.sandbox.co.in/bank/CNRB0000973", true); 
//   xhrReq.send();
$.ajax({

  url: 'https://api.sandbox.co.in/bank/CNRB0000973',
   method: 'GET',
  success: function(data){{
    console.log(data);
  }}

}) ;
