const express = require('express')
const router = express.Router()
const Category = require('../Models/ModelCategory')
const { categoryValidation } = require('../validation')
const PDFDocument = require("pdfkit")
const fs = require("fs")
const path = require('path');
const fontPath = (__dirname + '/../public/fonts/Roboto-Black.ttf');
const imagePath = (__dirname + '/../public/images/pdf-header.jpg');
const verifyAuthentication = require('./verifyToken')


const getDate = () => {
  const nowDate = new Date();
  let date = nowDate.getDate() + '/' + nowDate.getMonth() + '/' + nowDate.getFullYear();
  return date
}

const generateHeader = (doc, user) => {
  doc
    .font(fontPath)
    .fillColor("#444444")
    .fontSize(20)
    .image(imagePath, { width: 500, height: 100 })
    .moveDown();
}

const generateContent = (doc, user) => {
  const randomNumber = Math.random(2000, 99999999)

  const date = getDate()

  doc
    .font(fontPath)
    .fillColor("#000000")
    .fontSize(10)
    .text("SAYI : " + randomNumber + "", { align: "left" })
    .moveDown()
    .text("KONU : ", { align: "left" })
    .text("TARİH : " + date + "", { align: "right" })

    .moveDown()
    .moveDown()
    .moveDown()
    .moveDown()
    .font(fontPath)
    .fillColor("#000000")
    .fontSize(20)
    .text("İLGİLİ MAKAMA", { align: "center" })
    .moveDown()


}

const generateSecondContent = (doc, user) => {

  const date = getDate()

  doc
    .moveDown()
    .fillColor("#000000")
    .fontSize(10)
    .font(fontPath)
    .text("         19550527172 T.C. kimlik no'lu Ecz. " + user.user_name + " " + date + " tarihinde 37580515 sicil numarasıyla Odamıza kayıt olmuştur. " + user.user_pharmacy[0].pharmacy_province + " ili " + user.user_pharmacy[0].pharmacy_district + " ilçesi " + user.user_pharmacy[0].pharmacy_address + " faaliyet gösteren " + user.user_pharmacy[0].pharmacy_name + " Eczanesinin sahibi ve mesul müdürüdür. İşbu belge ilgilinin kendi isteği üzerine Oda kayıtlarına uygun olarak verilmiştir.", { align: 'left' })
    .moveDown()
    .text("         Bilgilerinize sunulur.")
    .moveDown()
    .moveDown()
    .moveDown()
    .moveDown()
    .moveDown()
    .text("Sivas Eczacı Odası", { align: "right" })
    .moveDown()
    .text("Genel Sekreter", { align: "right" })

}

const generateFooter = (doc, user) => {
  doc
    .fontSize(10)
    .font(fontPath)

    .text(
      "NOT: Cevabı verilen yazıların Tarih ve Numaralarının yazılması rica olunur.",
      0,
      730,
      { align: "center", width: 500 }
    );
}

// generate pdf by id
router.get('/generate/:fileId', verifyAuthentication, async (req, res) => {


  const user = req.user.userData[0]
  console.log(user);

  switch (req.params.fileId) {
    case '0':
      let doc = new PDFDocument({ margin: 50 })

      generateHeader(doc, user)
      generateContent(doc, user)
      generateSecondContent(doc, user)
      generateFooter(doc, user)

      await doc.pipe(await fs.createWriteStream('./public/pdf/' + user._id + '.pdf'))
      await doc.end()

      res.send({
        response: true,
        file_name: user._id,
        responseData: 'Başarılı'
      })


    default:
      return false
  }

})



router.get('/download/:fileName', (req, res) => {
  const path = process.cwd()
  res.download(path + '/public/pdf/' + req.params.fileName + '.pdf');
})


module.exports = router