const request = require('request'); // request library we downloaded from npm to make http request

// NOT USING DESTRUCTURING AND SHORTHAND SYNTAX
// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=c3872202064a36157a5e795033ffc7e6&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m';
//     request({url: url, json: true}, (error, response) => {
//         if(error){
//             callback('Unable to connect to weather service!', undefined);
//         }
//         else if(response.body.error){
//             callback('Unable to find location!', undefined);
//         }
//         else{
//             callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currenty ${response.body.current.temperature} degress out. It feels like ${response.body.current.feelslike } degress out.`)
//         }
//     })
// }


// USING DESTRUCTURING AND SHORTHAND SYNTAX
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c3872202064a36157a5e795033ffc7e6&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m';
    request({url, json: true}, (error, {body}={}) => {  // using shorthand syntax {url} and destructuring {body}
        if(error){
            callback('Unable to connect to weather service!', undefined);
        }
        else if(body.error){
            callback('Unable to find location!', undefined);
        }
        else{
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currenty ${body.current.temperature} degress out. It feels like ${body.current.feelslike } degress out.`)
        }
    })
}


module.exports = forecast;