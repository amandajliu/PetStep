listingsData = {
  "petListings": [{
    ownerName: "Cornelio Rosales",
    petName: "Fluffy",
    petType: "Snake",
    petImg: "fluffy0.jpg",
    zipcode: "02142",
    startDate: "4/20/2015",
    endDate: "5/1/2015",
    payment: "$"
  }, {
    ownerName: "Lily Paxton",
    petName: "Sugar",
    petType: "Dog",
    petImg: "dog-beach.jpg",
    zipcode: "02139",
    startDate: "6/15/2015",
    endDate: "6/17/2015",
    payment: "$$"
  }, {
    ownerName: "Janet Mason",
    petName: "Burrito",
    petType: "Cat",
    petImg: "burritoCat0.jpg",
    zipcode: "02142",
    startDate: "5/20/2015",
    endDate: "5/21/2015",
    payment: "$$$"
  }, {
    ownerName: "Penny Marshall",
    petName: "Okabe Rintaro",
    petType: "Bird",
    petImg: "bird0.jpg",
    zipcode: "02467",
    startDate: "9/2/2015",
    endDate: "10/1/2015",
    payment: "$$$$"
  }, {
    ownerName: "Lin Mei",
    petName: "Napoleon",
    petType: "Dog",
    petImg: "puppy0.jpg",
    zipcode: "02142",
    startDate: "4/20/2015",
    endDate: "5/10/2015",
    payment: "$"
  }, {
    ownerName: "Shaila Higgins",
    petName: "Genghis Khan",
    petType: "Hamster",
    petImg: "hamster1.jpg",
    zipcode: "02142",
    startDate: "4/15/2015",
    endDate: "5/1/2015",
    payment: "$"
  }, {
    ownerName: "Doug Schumaker",
    petName: "Porky",
    petType: "Dog",
    petImg: "puppy1.jpg",
    zipcode: "02142",
    startDate: "6/14/2015",
    endDate: "6/21/2015",
    payment: "$$"
  }, {
    ownerName: "Minnie Preston",
    petName: "Snoop Dogg",
    petType: "Cat",
    petImg: "cat0.jpg",
    zipcode: "02459",
    startDate: "8/20/2015",
    endDate: "9/10/2015",
    payment: "$$$$"
  }, {
    ownerName: "Flynn Rider",
    petName: "Sam the Wise",
    petType: "Rabbit",
    petImg: "bunny0.jpg",
    zipcode: "02142",
    startDate: "4/21/2015",
    endDate: "4/28/2015",
    payment: "$"
  }, {
    ownerName: "Craig Newton",
    petName: "Miss Piggy",
    petType: "Guinea Pig",
    petImg: "guineaPig0.jpg",
    zipcode: "02142",
    startDate: "7/17/2015",
    endDate: "8/1/2015",
    payment: "$$"
  }, {
    ownerName: "Cornelia Rose",
    petName: "Rapunzel",
    petType: "Dog",
    petImg: "dog0.jpg",
    zipcode: "02142",
    startDate: "9/20/2015",
    endDate: "11/1/2015",
    payment: "$$"
  }, {
    ownerName: "Laura Pine",
    petName: "Granny Laura",
    petType: "Cat",
    petImg: "cat1.jpg",
    zipcode: "02142",
    startDate: "4/20/2015",
    endDate: "5/1/2015",
    payment: "$"
  }, {
    ownerName: "Stephanie Castle",
    petName: "Pumpkin",
    petType: "Hamster",
    petImg: "hamster0.jpg",
    zipcode: "02139",
    startDate: "5/1/2015",
    endDate: "5/2/2015",
    payment: "$"
  }, {
    ownerName: "Deng Xiaoping",
    petName: "Mao Zedong",
    petType: "Cat",
    petImg: "chinaCat.jpg",
    zipcode: "02142",
    startDate: "4/20/2015",
    endDate: "5/1/2015",
    payment: "Negotiable"
  }],
  "personListings": [{
    sitterName: "Lin Mei",
    sitterImg: "LinMei.jpg",
    zipcode: "02142",
    petTypes: ["Dog", "Cat"]
  }, {
    sitterName: "Penny Marshall",
    sitterImg: "pennyMarshall.jpg",
    zipcode: "02139",
    petTypes: ["Dog"]
  }, {
    sitterName: "Stephanie Castle",
    sitterImg: "stephanieCastle.jpg",
    zipcode: "02142",
    petTypes: ["Dog", "Cat", "Hamster"]
  }, {
    sitterName: "Craig Newton",
    sitterImg: "craigNewton.jpg",
    zipcode: "02142",
    petTypes: ["Dog"]
  }, {
    sitterName: "Janet Mason",
    sitterImg: "JanetMason.jpg",
    zipcode: "02459",
    petTypes: ["Cat", "Hamster", "Guinea Pig"]
  }, {
    sitterName: "Flynn Rider",
    sitterImg: "FlynnRider.jpeg",
    zipcode: "02142",
    petTypes: ["Dog", "Cat", "Snake"]
  }, {
    sitterName: "Missy Clinton",
    sitterImg: "MissyClinton.jpg",
    zipcode: "02139",
    petTypes: ["Cat"]
  }, {
    sitterName: "Doug Schumaker",
    sitterImg: "DougSchumaker.jpg",
    zipcode: "02214",
    petTypes: ["Cat", "Rabbit"]
  }]
}

profileData = {
    "users" : [{
        currentUser: true,
        username: "cornelio",
        name: "Cornelio Rosales",
        userImg: "Cornelio.png",
        sitsFor: [],
        zipcode: "02142",
        pets: [{
            petType: "Snake",
            petName: "Fluffy",
            petImg: "fluffy0.jpg"
        }],
        ownerRating: 4,
        sitterRating: null,
        reviews: [{
            reviewer: "Lily Paxton",
            owner: "Cornelio",
            pet: "Fluffy",
            ownerRating: 3,
            petRating: 5,
            message: "Fluffy was awesome but Cornelio was not."
        }, {
            reviewer: "Flynn Rider",
            owner: "Cornelio",
            pet: "Fluffy",
            ownerRating: 5,
            petRating: 5,
            message: "FLUFFY IS THE BEST SNAKE EVER!!!!!!!!!!!!AND CORNELIO IS MY BEST FRIEND!!!!!!!"
        }],
        bio: "Hi! I'm Cornelio and I have a pet snake named Fluffy. I am looking for professional sitters who have experience with snakes."
    }, {
        currentUser: false,
        username: "lily",
        name: "Lily Paxton",
        userImg: "lilyPaxton.jpg",
        sitsFor: [],
        zipcode: "02139",
        pets: [{
            petType: "Dog",
            petName: "Sugar",
            petImg: "dog-beach.jpg"
        }],
        ownerRating: 4,
        sitterRating: 5,
        reviews: [],
        bio: "Lily Paxton's biography"
    }, {
        currentUser: false,
        username: "flynn",
        name: "Flynn Rider",
        userImg: "FlynnRider.jpeg",
        sitsFor: ["Dog", "Cat", "Snake"],
        zipcode: "02142",
        pets: [{
            petType: "Rabbit",
            petName: "Sam the Wise",
            petImg: "bunny0.jpg"
        }],
        ownerRating: 3,
        sitterRating: 4,
        reviews: [],
        bio: "Flynn Rider's biography"
    }]
}

petInfo = {
  "petInfo": [{
      petName: "Fluffy",
      petType: "Snake",
      petImage: "fluffy0.jpg"

    },
    {
      petName: "Napoleon",
      petType: "Dog",
      petImage: "puppy0.jpg"
    }]
}

personalInfo = {
  "personalInfo": [{
      ownerName: "Cornelio Rosales",
      email: "corn@gmail.com",
      phoneNumber: "(123)456-7890",
      zip: "02142",
      presetCount: 0,
    },
    {
      ownerName: "Cornelio Rosales",
      email: "corn@gmail.com",
      phoneNumber: "(999)456-7890",
      zip: "90210",
      presetCount: 1,
    }]
}
