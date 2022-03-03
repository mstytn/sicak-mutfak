// jshint esversion: 6
// jshint -W033

import { UserCredentials } from "./user.js"
// Yemek listesi jscript objesi olarak
// local dosya olduğundan JSON fetch edemiyoruz
import { yemekler } from "./productsData.js"
// Katalog oluşturucu sınıf ve bu sınıfın View'i (Sonra ayrılabilir model'den)
import {catalog, listConstructor} from './products.js'


const updateUserNav = (user) => {
  const nameField = document.getElementById('visitor')
  const imageField = document.getElementById('usrImage')
  nameField.innerText = `Merhaba ${user.first}`
  imageField.src = user.thumbnail
}

// JS Giriş Noktası

const u = new catalog()
yemekler.forEach(element => {
  u.ekle(element)
});
const lc = new listConstructor(u, 'urunSonuc')


// LOAD EVENT KANCASI
window.addEventListener('load', (_ev) => {
  const cred = new UserCredentials()

  cred.getUser().then(usr => {
    updateUserNav(usr)
  })
  lc.hookSearch() //Key Up Bağlantısı
  // Açılışta boş arama başlat
  lc.searchFunction(lc,{srcElement: {value: ''}}) 
})
