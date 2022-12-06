const post = require("bent") ("POST", {"Content-Type": "application/soap+xml"})
const t_KPSPublicYabanciDogrula = require("fs").readFileSync(__dirname + "/KPSPublicYabanciDogrula.xml", "utf-8")
const url_KPSPublicYabanciDogrula = process.env.KPSPUBLICYABANCIDOGRULA_URL || "https://tckimlik.nvi.gov.tr/Service/KPSPublicYabanciDogrula.asmx?WSDL"
const kpspublicyabancidogrula = (params) =>
    Object.keys(params)
        .reduce((str, param) =>
            str.replace("₺" + param, params[param]), template)
module.exports = (params) => 
    post(URL, kpspublicyabancidogrula(params))
    .then(e => e.text())
    .then(e => {
      const match = e.match("Result>(true|false)</")
      return match
        ? match[1] === "true"
        : Promise.reject("Invalid response")
    })