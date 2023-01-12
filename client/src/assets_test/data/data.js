/* TEST IMAGES */
import ava01 from "../images/ava-01.png";
import ava02 from "../images/ava-02.png";
import ava03 from "../images/ava-03.png";
import ava04 from "../images/ava-04.png";
import ava05 from "../images/ava-05.png";
import ava06 from "../images/ava-06.png";


/* Get info for products */

const folder = [
  "./metadata/Dior-Hobo-Black_IA002000811.json",
  "./metadata/Dior-Vintage-Sunglasses_IA002000251.json",
  "./metadata/Gucci-Flap-Jackie-Bag.json",
  "./metadata/Gucci-Swing-Red_IA002000868.json",
  "./metadata/Louis-Vuitton-Speedy-Bag.json",
  "./metadata/Marc-Jacobs-Aviator-Glasses_CF003000012.json",
  "./metadata/Valentino-RockStud-1234.json"
]

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
      creator: "0xC74a9a98Af6108adD8EB17A4262d3dc9B924c429",
      creatorImg: "../images/ava-01.png",
      currentBid: json.attributes[0].value
    }
    data.push(formatJson)
  }
  return data
}

export const NFT__DATA = await getData(folder)

//console.log(NFT__DATA)


export const SELLER__DATA = [
  {
    id: "01",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia",
    sellerName: "Ryan Carder",
    sellerImg: ava01,
    currentBid: 5.89,
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },

  {
    id: "02",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia",
    sellerName: "Trista Francis",
    sellerImg: ava02,
    currentBid: 5.89,
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },

  {
    id: "03",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia",
    sellerName: "Ryan Carder",
    sellerImg: ava03,
    currentBid: 5.89,
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },

  {
    id: "04",

    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia",

    sellerName: "Ryan Carder",
    sellerImg: ava04,
    currentBid: 5.89,
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },

  {
    id: "05",

    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia",

    sellerName: "Trista Francis",
    sellerImg: ava05,
    currentBid: 5.89,
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },

  {
    id: "06",

    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia",

    sellerName: "Trista Francis",
    sellerImg: ava06,
    currentBid: 5.89,
    fbUrl: "#",
    instaUrl: "#",
    twitUrl: "#",
  },
];