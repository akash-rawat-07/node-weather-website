const request = require('request'); // request library we downloaded from npm to make http request


// NOT USING DESTRUCTURING AND SHORTHAND SYNTAX
// const geocode = (address, callback) => {
//     const url = "https://geocode.xyz/"+encodeURIComponent(address)+"?json=1&auth=909093798787691661720x52821"
//     request({url: url, json: true}, (error, response) => {
//         if(error){
//             callback('Unable to connect to location service!', undefined);
//         }
//         else if(response.body.error){
//             callback('Unable to find location Try another search!', undefined);
//         }
//         else{
//             callback(undefined, {
//                 latitude: response.body.latt,
//                 longitude: response.body.longt,
//                 location: response.body.standard.city +", "+response.body.standard.countryname
//             });
//         }
//     })
// }



// USING DESTRUCTURING AND SHORTHAND SYNTAX
const geocode = (address, callback) => {
    const url = "https://geocode.xyz/"+encodeURIComponent(address)+"?json=1&auth=909093798787691661720x52821"
    request({url, json: true}, (error, {body}={}) => {   // using shorthand syntax = {url} and destructuring = {body}
        if(error){
            callback('Unable to connect to location service!', undefined);
        }
        else if(body.error){
            callback('Unable to find location Try another search!', undefined);
        }
        else{
            callback(undefined, {
                latitude: body.latt,
                longitude: body.longt,
                location: body.standard.city +", "+body.standard.countryname
            });
        }
    })
}



module.exports = geocode;