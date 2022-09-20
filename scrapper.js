fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

var array = fs.readFileSync("tpbLinks.txt").toString().split("\n");
var writeStream = fs.createWriteStream("magnetLinks.txt");
for (i in array) {
  let link = array[i];
  setTimeout(() => {
    axios
      .get(link)
      .then(function (response) {
        const $ = cheerio.load(response.data);
        const magnet = $(".download a").last().attr("href");
        writeStream.write(magnet + "\n");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, 1000);
}
