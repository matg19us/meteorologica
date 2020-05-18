const request = require('request')
const translate = require('translate')  
translate.engine = 'yandex'
translate.key = 'trnsl.1.1.20200506T153830Z.3be1a1a70d9aca54.e7d8510afb68f6e9f8c4cb342c0f663e3d7cc440'
let weather_description

const pronostico = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=f81ac0f1d0610e19f07f745b00bfbb38&query='+latitude+','+longitude
    request({url:url, json:true},(error,response) =>{ // peticion http el clima, Manejo de errores
        if(error){ // erro de bajo nivel, por ejemplo sin internet
            callback("Unable to connect with Weatherstack server",undefined)
        } else if(response.body.error){
        callback("Unable to finde location",undefined) //error de alto nivel , referente al servidor
        } else {
            weather_description = response.body.current.weather_descriptions[0]
            translate(weather_description, {from: 'en', to:'es'}).then(text=>{  // peticion http y funcion promesa
                callback(undefined,{
                    weather_description: text,
                    temperature: response.body.current.temperature,
                    precipitation: response.body.current.precip,
                    temperature_feelslike: response.body.current.feelslike
                    //aqui se agregan los elementos del current deseados
                })
                
            })
            /* console.log("La temperatura actual es de "+response.body.current.temperature+" grados")
            console.log("Sensación térmica "+response.body.current.feelslike+" grados")
            console.log("Precipitación "+response.body.current.precip+" %") */
    
        }
               
        
    
    })

}

module.exports = pronostico