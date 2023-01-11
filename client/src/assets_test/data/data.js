/* Get info for products */

import img01 from "../images/Dior-Vintage-Sunglasses_01.webp";
import img02 from "../images/Flap-Jackie_01.webp";
import img03 from "../images/img-03.jpg";
import img04 from "../images/img-04.jpg";
import img05 from "../images/img-05.jpg";
import img06 from "../images/img-06.jpg";
import img07 from "../images/img-07.jpg";
import img08 from "../images/img-08.jpg";
import img09 from "../images/img-09.jpg";

import ava01 from "../images/ava-01.png";
import ava02 from "../images/ava-02.png";
import ava03 from "../images/ava-03.png";
import ava04 from "../images/ava-04.png";
import ava05 from "../images/ava-05.png";
import ava06 from "../images/ava-06.png";

const folder = [
  "./metadata/Dior-Hobo-Black_IA002000811.json",
  "./metadata/Dior-Vintage-Sunglasses_IA002000251.json",
  "./metadata/Gucci-Flap-Jackie-Bag.json",
  "./metadata/Gucci-Swing-Red_IA002000868.json",
  "./metadata/Louis-Vuitton-Speedy-Bag.json",
  "./metadata/Marc-Jacobs-Aviator-Glasses_CF003000012.json",
  "./metadata/Valentino-RockStud-1234.json"
]

let newData

async function getData(_folder) {
  let response
  let json
  let formatJson
  let data = []
  for(let i=0; i < _folder.length; i++){
    response = await fetch(_folder[i])
    json = await response.json()
    formatJson = {
      id: json.id,
      title: json.name,
      description: json.description,
      imgUrl: json.image[0],
      creator: "First Owner!",
      creatorImg: "../images/ava-01.png",
      currentBid: json.attributes.value     
    }
    let imgTest = json.image
    //console.log(imgTest[0])
    data.push(formatJson)
  }
  return data
}

export const NFT__DATA = await getData(folder)

//console.log(NFT__DATA)


