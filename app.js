const express = require('express');
const app = express();
const request = require('request');

const geocodificacion = require("./geocodificacion") // add
const pronostico = require("./pronostico") //add

//Settings
app.set('port',3000);
app.set('view engine', 'ejs');
app.use(express.json());

//Rotes
app.get('/buscar',(req,res,) => {
    
        geocodificacion("Colima",(error,data)=>{ //Funcion flecha que nos permite manejar los errores y los datos que se reciben
            if(error){
                console.log("Error: ",error)
            } 
            pronostico(data.latitude,data.longitude,(error,data_pronostico)=>{ //funcion para llamar el callback
                if(error){
                    return console.log("Error", error)
                }
                
                console.log(data_pronostico)
                res.render('resultado',{dia: data_pronostico.weather_description, temperatura: data_pronostico.temperature, sensacion: data_pronostico.temperature_feelslike,precipitacion: data_pronostico.precipitation})
            })
        })

});        
         
app.get('/',(req,res,) => {
    res.render('index');
}); 

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});