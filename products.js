// jshint esversion: 6
// jshint -W033

//URUN MODAL
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

export {urun, catalog, listConstructor}
