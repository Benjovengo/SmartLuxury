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
      imageUrl: json.image[0],
      creator: "First Owner!",
      creatorImg: ava01,
      currentBid: json.attributes.value     
    }
    data.push(formatJson)
  }
  return data
}

let nftData
nftData = await getData(folder)
console.log(nftData)


export const NFT__DATA = [
  {
    id: "01",
    title: "Medium Dior Vibe Hobo Bag",
    desc: "New this season, Maria Grazia Chiuri imagines the Dior Vibe bag with the allure of a Hobo bag showcasing modern lines. The black Cannage lambskin style features a suede interior while a white 'CHRISTIAN DIOR PARIS' signature adorns the bottom of the bag. Featuring a handle in addition to a removable and adjustable shoulder strap with a military-inspired buckle, the medium Dior Vibe bag can be carried by hand, worn on the shoulder or crossbody for a sportier look.",
    imgUrl: img01,
    creator: "Christian Dior",
    creatorImg: ava01,
    currentBid: 5.89,
  },

  {
    id: "02",
    title: "Gucci Flap Jackie",
    desc: "Classic 1961 model made of alligator leather.",
    imgUrl: img02,
    creator: "Gucci",
    creatorImg: ava02,
    currentBid: 5.09,
  },

  {
    id: "03",
    title: "Civilian",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    imgUrl: img03,
    creator: "Trista Francis",
    creatorImg: ava03,
    currentBid: 6.89,
  },

  {
    id: "04",
    title: "Guard",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    imgUrl: img04,
    creator: "Trista Francis",
    creatorImg: ava04,
    currentBid: 7.89,
  },

  {
    id: "05",
    title: "Travel Monkey Club",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    imgUrl: img05,
    creator: "Trista Francis",
    creatorImg: ava05,
    currentBid: 4.89,
  },

  {
    id: "06",
    title: "Sir Lion Swag",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    imgUrl: img06,
    creator: "Trista Francis",
    creatorImg: ava06,
    currentBid: 4.99,
  },

  {
    id: "07",
    title: "Civilian",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    imgUrl: img07,
    creator: "Trista Francis",
    creatorImg: ava03,
    currentBid: 5.89,
  },

  {
    id: "08",
    title: "Guard",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    imgUrl: img08,
    creator: "Trista Francis",
    creatorImg: ava04,
    currentBid: 5.89,
  },

  {
    id: "09",
    title: "Travel Monkey Club",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    imgUrl: img09,
    creator: "Trista Francis",
    creatorImg: ava05,
    currentBid: 5.89,
  },
];

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

console.log(NFT__DATA)