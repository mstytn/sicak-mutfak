// jshint esversion: 6
// jshint -W033
const yemekler = [
  {
    ad :  'Tavuklu Şehriye Çorbası',
    aciklama: 'Tavuklu Şehriye Çorbası',
    fiyat: 18.0,
    foto: 'images/tavuksuyucorbasi_big.jpg'
  },
  {
    ad :  'Süzme Mercimek Çorbası',
    aciklama: 'Süzme Mercimek Çorbası',
    fiyat: 17.0,
    foto: 'images/suzmemercimekcorbasi_big.jpg'
  },
  {
    ad :  'Ezogelin Çorbası',
    aciklama: 'Ezogelin Çorbası',
    fiyat: 17.0,
    foto: 'images/ezogelincorbasi_big.jpg'
  },
  {
    ad :  'Cacık',
    aciklama: 'Cacık',
    fiyat: 15.0,
    foto: 'images/cacik_big.jpg'
  },
  {
    ad :  'Pelmeni Rus Mantısı',
    aciklama: 'İnce hamur, kıyma',
    fiyat: 35.0,
    foto: 'images/pelmenirusmantisi_20210512143556_big.jpg'
  },
  {
    ad :  'Buharda Özbek Mantısı',
    aciklama: 'Dana kıyma, baharat (6 Adet)',
    fiyat: 40.0,
    foto: 'images/buhardaozbekmantisi6adet_20210512143245_big.jpg'
  },
  {
    ad :  'Özbek Çuçvarası (Mantı)',
    aciklama: 'Sulu Mantı',
    fiyat: 35.0,
    foto: 'images/ozbekcucvarasisulumanti_20210512140540_big.jpg'
  },
  {
    ad :  'Patlıcan Salatası',
    aciklama: 'Kore usulü',
    fiyat: 20.0,
    foto: 'images/patlicansalatasi_20210512143936_big.jpg'
  },
  {
    ad :  'Çoban Salatası',
    aciklama: 'Çoban Salatası işte... Biliyonuz.',
    fiyat: 20.0,
    foto: 'images/cobansalatasi_20210512144241_big.jpg'
  },
  {
    ad :  'Kıymalı Çiğ Börek',
    aciklama: 'Kıymalı Çiğ Börek',
    fiyat: 15.0,
    foto: 'images/kiymali-cig-borek_big.jpg'
  },
  {
    ad :  'Ekstra Kahvaltı Tabağı',
    aciklama: 'Beyaz peynir, kaşar peyniri, siyah zeytin, yeşilzeytin, salam, yumurta, tereyağı, bal, domates, salatalık, ekmek',
    fiyat: 50.0,
    foto: 'images/140417_ekstra-kahvalti_big.jpg'
  },
  {
    ad :  'Karışık Menemen',
    aciklama: 'Sucuk, kaşar peyniri, 2 adet yumurta',
    fiyat: 28.0,
    foto: 'images/menemen_big.jpg'
  },
  {
    ad :  'Sade Omlet',
    aciklama: 'Yumurta, domates ve marul ile',
    fiyat: 22.0,
    foto: 'images/rezene-sade_omlet_big.jpg'
  },
  {
    ad :  'Meksika Usulü Tavuk',
    aciklama: 'Pirinç pilavı, salata ile',
    fiyat: 50.0,
    foto: 'images/140417_meksika-soslu-tavuk_big.jpg'
  },
  {
    ad :  'Tavuk Şiş',
    aciklama: 'Pirinç pilavı, salata ile',
    fiyat: 50.0,
    foto: 'images/140417_tavuk-sis_big.jpg'
  },
  {
    ad :  'Soya Soslu Tavuk',
    aciklama: 'Pirinç pilavı, salata ile',
    fiyat: 50.0,
    foto: 'images/soya-soslu-tavuk_big.jpg'
  },
  {
    ad :  'Ekşili Köfte',
    aciklama: 'Ekşili Köfte',
    fiyat: 35.0,
    foto: 'images/140417_eksili-kofte_big.jpg'
  },
  {
    ad :  'Kadınbudu Köfte',
    aciklama: 'Püre, mevsim salata ile',
    fiyat: 48.0,
    foto: 'images/kadinbudu-kofte-2-adet_big.jpg'
  },
  {
    ad :  'Ev Köftesi',
    aciklama: '4 adet ev köftesi. Pirinç pilavı, salata ile',
    fiyat: 48.0,
    foto: 'images/140417_evkoftesi_big.jpg'
  },
  {
    ad :  'Karışık Köfte Tabağı',
    aciklama: 'Rezene köfte, tavuklu köfte, ev köftesi. Pirinç pilavı, salata ile',
    fiyat: 50.0,
    foto: 'images/140417_karisik-kofte_big.jpg'
  }
]
class urun {
  constructor(ad, aciklama, fiyat, foto) {
    this.urun = {
      ad, aciklama, fiyat, foto
    }
    return this.urun
  }
}

//KATALOG MODAL
class catalog {
  constructor() {
    this.urunler = []
  }
  
  ekle(yeniUrun) {
    this.urunler.push(yeniUrun)
  }

  ara(urunAdi) {
    return new Promise((res, rej) => {
      let filtered = this.urunler.filter(val => 
        (val.ad.toLowerCase().includes(urunAdi.toLowerCase()) || val.aciklama.toLowerCase().includes(urunAdi.toLowerCase())
        )
      )
      if (filtered.length === 0) {
        rej(null)
      }else {
        res(filtered)
      }
    })
  }
}

//MODAL
class listConstructor {
  constructor(catalog, connectObject) {
    this.connectObject = connectObject
    this.catalog = catalog
    this.searchOld = '$'
    this.searched = false
  }

  hookSearch() {
    const searcher = document.getElementById('search')
    searcher.addEventListener('keyup', ev => this.searchFunction(this, ev))
  }

  searchFunction(self, event) {
    const srcString = event.srcElement.value
    
    // içerik değişmediğinde listeleme
    if (this.searchOld === srcString) return;
    this.searchOld = srcString

    const cObj = document.getElementById(this.connectObject)
    cObj.innerHTML = ""
    this.catalog.ara(srcString).then(
      datas => {
        datas.map(val => {
          cObj.appendChild(this.objCreator(val))
        })
      }
    ).catch(msg => {

        cObj.appendChild(this.errorObj('Ürün Bulunamadı'))
      }
    )
  }

  //BUNDAN SONRASINI AYIRIP VIEWE ALMAK LAZIM
  errorObj(msg) {
    const row = document.createElement('div')
      row.classList.add
      (
        'row', 
        'justify-content-center', 
        'align-items-center',
        'mt-3',
        'mt-md-0'
      )
        const error = document.createElement('div')
        error.classList.add('col-10', 'text-center')
        error.textContent = msg
        row.appendChild(error)
        return row
  }

  objCreator(src) {
    const row = document.createElement('div')
    row.classList.add
    (
      'row', 
      'justify-content-center', 
      'align-items-center',
      'mt-3',
      'mt-md-0'
    )

    const col1 = document.createElement('div')
    col1.classList.add('col-2')
    const img = document.createElement('img')
    img.classList.add('img-fluid', 'p-md-3')
    img.alt = src.ad
    img.src = src.foto
    col1.appendChild(img)

    const col2 = document.createElement('div')
    col2.classList.add('col-4', 'col-md-5')
    const head = document.createElement('h3')
    head.textContent = src.ad
    const detail = document.createElement('p')
    detail.textContent = src.aciklama
    col2.appendChild(head)
    col2.appendChild(detail)

    const col3 = document.createElement('div')
    col3.classList.add('col-3', 'col-md-2')
    const money = document.createElement('h4')
    money.textContent = `${src.fiyat.toFixed(2)}₺`
    col3.appendChild(money)

    const col4 = document.createElement('div')
    col4.classList.add('col-1')
    const btn = document.createElement('button')
    btn.classList.add('btn', 'btn-danger')
    const cart = document.createElement('i')
    cart.classList.add('bi', 'bi-cart-plus')
    cart.textContent = ' Ekle'
    btn.appendChild(cart)
    col4.appendChild(btn)

    row.appendChild(col1)
    row.appendChild(col2)
    row.appendChild(col3)
    row.appendChild(col4)

    return row
  }
}

class UserCredentials {
  constructor() {
    this.userDummy = {
      first: "Ziyaretçi",
      last: "Bilinmeyen",
      title: "M",
      thumbnail: "images/defaultDuumy.png"
    }
  }
  getUser() { 
    return new Promise((res, _rej) => {
      fetch('https://randomuser.me/api/?nat=tr')
        .then(response => response.json())
        .catch(() => res(this.userDummy))
        .then(data => {
          const cred = data.results[0].name;
          const userObj = Object.assign({thumbnail: data.results[0].picture.thumbnail}, cred)
          res(userObj)
        })
        .catch(() => {res(this.userDummy)})
    })
  }
}



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
