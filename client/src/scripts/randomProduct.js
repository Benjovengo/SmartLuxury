export const randomPhoto = () => {
  let i = Math.floor(Math.random() * 24);
  let photos = [
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Hobo-Preta_01.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Hobo-Preta_02.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Hobo-Preta_03.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Hobo-Preta_04.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Dior-Vintage-Sunglasses_01.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Dior-Vintage-Sunglasses_02.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Dior-Vintage-Sunglasses_03.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Flap-Jackie_01.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Flap-Jackie_02.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Flap-Jackie_03.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Gucci-Swing-Vermelha_01.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Gucci-Swing-Vermelha_02.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Gucci-Swing-Vermelha_03.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Gucci-Swing-Vermelha_04.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Gucci-Swing-Vermelha_05.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Speedy-EPI-Bege_01.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Speedy-EPI-Bege_02.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Speedy-EPI-Bege_03.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Mark-Jacobs-Aviator-Sunglasses_01.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Mark-Jacobs-Aviator-Sunglasses_02.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/Mark-Jacobs-Aviator-Sunglasses_03.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/RockStud-Bege_01.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/RockStud-Bege_02.webp",
    "https://raw.githubusercontent.com/Benjovengo/SmartLuxury/master/client/src/assets/images/RockStud-Bege_03.webp"
  ]
  return photos[i]
}