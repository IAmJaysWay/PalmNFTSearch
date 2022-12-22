const express = require("express");
const cors = require("cors");
const Moralis = require("moralis").default;
require("dotenv").config();
const app = express();
const port = 3000;

app.use(cors());

app.get("/getPalmNfts", async (req, res) => {

    const { query } = req;

    const response = await Moralis.EvmApi.nft.searchNFTs({
        chain:"11297108109",
        q: query.q,
        limit: "4"
    })

    let imgs = [];

    for (nft of response.raw.result){
        let url = JSON.parse(nft.metadata).image

        if (!url) continue
        if (url?.includes("ipfs://")) {
            imgs.push("https://ipfs.io/ipfs/" + url.substring(7));
        } else {
            imgs.push(url)
        }
        
    }

    console.log(imgs)
    res.send(imgs);
  
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for reqs`);
  });
});
