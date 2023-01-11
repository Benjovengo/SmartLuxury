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
      creator: "First Owner!",
      creatorImg: "../images/ava-01.png",
      currentBid: json.attributes[0].value
    }
    data.push(formatJson)
  }
  return data
}

export const NFT__DATA = await getData(folder)

//console.log(NFT__DATA)


