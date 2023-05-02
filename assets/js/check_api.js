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



function getUsers() {
    fetch("axios")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log(data);
        // return data;
        // Access your data here
      });
  }
getUsers();

// const data = null;
// var XMLHttpRequest = require('xhr2');
//  var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://api.sandbox.co.in/bank/CNRB0000973');
// xhr.setRequestHeader('accept', 'application/json');
// xhr.setRequestHeader('x-api-version', '1.0');
// xhr.onreadystatechange = () => {
//     if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//       console.log(xhr.response)
//     }
//   }
// xhr.send(data);





