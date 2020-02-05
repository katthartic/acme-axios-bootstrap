const URL = 'https://acme-users-api-rev.herokuapp.com/api/'

Promise.all([axios.get(`${URL}companies`), axios.get(`${URL}products`)])
    .then(response => response.map(result => result.data))
    .then(console.log)

