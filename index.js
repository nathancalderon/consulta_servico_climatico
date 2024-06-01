require('dotenv').config()
const axios = require('axios')

const {appid, q, units, language, urlCoordenadas, urlSensacaoDescricao} = process.env

const endCoordenadas = `${urlCoordenadas}appid=${appid}&q=${q}`

let latitude
let longitude

axios.get(endCoordenadas)
.then((res) => {
    // console.log(res['data'])
    return res['data']
})

.then(res => {
    for(let latlon of res){
         latitude = latlon.lat
         longitude = latlon.lon
        console.log(`Latitude = ${latlon.lat}`)
        console.log(`Longitude = ${latlon.lon}`)
    }

    const endSensacaoDescricao = `${urlSensacaoDescricao}lat=${latitude}&lon=${longitude}&appid=${appid}&units=${units}&lang=${language}`
    // console.log(endSensacaoDescricao)

    axios.get(endSensacaoDescricao)
    .then((resSensacao)=>{
        // console.log(resSensancao['data'])
    return resSensacao['data']
    })
    .then(resSensacao => {
        console.log(`Sensação Térmica: ${resSensacao.main.feels_like}`)
        console.log(`Descrição: ${resSensacao.weather[0].description}`)
    })
})

