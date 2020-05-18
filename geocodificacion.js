const request = require('request')

const geocodificacion = (address,callback)=>{
    const url_geocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWF0ZzE5dXMiLCJhIjoiY2s5dmppODB2MGN4MzNtbXZsY3lndmphNCJ9.Ql5sni_wmmtSPJc744XzXw&limit=1&language=es'
    request({url:url_geocoding,json:true},(error,response) =>{ // peticion http de geolocalización, Manejo de errores
        if(error){ // erro de bajo nivel
            callback("Unable to connect with Mapbox server",undefined)//sin internet

        } else if(response.body.message){ // error de alto nivel
            callback("Not found",undefined)
        } else if (response.body.features.length==0){ //no encontro ninguna coincidencia en la ubicacion proporcionada
            callback("Unable to finde location, try another search",undefined)
        }else{ //Cuando no hay ningun error
            longitude = response.body.features[0].center[0]
            latitude = response.body.features[0].center[1]
            callback(undefined,{
                longitude: longitude, 
                latitude: latitude
            })
        }
        
    }) 
}

module.exports = geocodificacion