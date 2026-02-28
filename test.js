const person = {
    name:"suman",
    age:22,
    address:"Kathmandu",
    phone:9702790990
}

const Address=[
    { "id": 1, "name": "Kathmandu" },
    { "id": 2, "name": "Pokhara" },
    { "id": 3, "name": "Lalitpur" },
    { "id": 4, "name": "Bhaktapur" },
    { "id": 5, "name": "Biratnagar" },
    { "id": 6, "name": "Birgunj" },
    { "id": 7, "name": "Chitwan" },
    { "id": 8, "name": "Butwal" },
    { "id": 9, "name": "Dharan" },
    { "id": 10, "name": "Janakpur" },
    { "id": 11, "name": "Hetauda" },
    { "id": 12, "name": "Nepalgunj" },
    { "id": 13, "name": "Dhangadhi" },
    { "id": 14, "name": "Itahari" },
    { "id": 15, "name": "Bharatpur" },
    { "id": 16, "name": "Ghorahi" },
    { "id": 17, "name": "Tulsipur" },
    { "id": 18, "name": "Rajbiraj" },
    { "id": 19, "name": "Malangwa" },
    { "id": 20, "name": "Kalaiya" },
    { "id": 21, "name": "Banepa" },
    { "id": 22, "name": "Dhulikhel" },
    { "id": 23, "name": "Kirtipur" },
    { "id": 24, "name": "Tikapur" },
    { "id": 25, "name": "Lamahi" },
    { "id": 26, "name": "Waling" },
    { "id": 27, "name": "Putalibazar" },
    { "id": 28, "name": "Baglung" },
    { "id": 29, "name": "Tansen" },
    { "id": 30, "name": "Beni" },
    { "id": 31, "name": "Jomsom" },
    { "id": 32, "name": "Damauli" },
    { "id": 33, "name": "Gorkha" },
    { "id": 34, "name": "Sindhuli" },
    { "id": 35, "name": "Lahan" },
    { "id": 36, "name": "Siraha" },
    { "id": 37, "name": "Inaruwa" },
    { "id": 38, "name": "Gaighat" },
    { "id": 39, "name": "Triyuga" },
    { "id": 40, "name": "Dhankuta" },
    { "id": 41, "name": "Ilam" },
    { "id": 42, "name": "Bhadrapur" },
    { "id": 43, "name": "Kakarbhitta" },
    { "id": 44, "name": "Dipayal" },
    { "id": 45, "name": "Dadeldhura" },
    { "id": 46, "name": "Mahendranagar" },
    { "id": 47, "name": "Jumla" },
    { "id": 48, "name": "Simikot" },
    { "id": 49, "name": "Dolpa" },
    { "id": 50, "name": "Rukum" }
  ]

const {name,age,...remaining}=person;

Address.forEach((item)=>{
    if(item.name===remaining.address){
        remaining.address=item.id;
        console.log(remaining);
    }
    
    
})
console.log(remaining);
