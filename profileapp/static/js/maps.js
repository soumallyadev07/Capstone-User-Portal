// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASFc4Awvg_1-GkUJMnXCnqhKeZUbuKWDQ",
    authDomain: "carevive-90041.firebaseapp.com",
    databaseURL: "https://carevive-90041-default-rtdb.firebaseio.com",
    projectId: "carevive-90041",
    storageBucket: "carevive-90041.appspot.com",
    messagingSenderId: "921387804409",
    appId: "1:921387804409:web:4036ec7397f4537ed9e428"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var pbTokkenEdit = document.getElementById("PushBulletTocken").innerText;

var pbTokken = pbTokkenEdit.replaceAll(".", "(*)");

var refLast = firebase.database().ref(`/${pbTokken}/`).limitToLast(1);


var locationData = ""; 


refLast.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var key = childSnapshot.key;

      var childData = childSnapshot.val();
      locationData = childData.location;
      
  });
});