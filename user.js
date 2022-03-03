// jshint esversion: 6
// jshint -W033

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

export {UserCredentials} 


