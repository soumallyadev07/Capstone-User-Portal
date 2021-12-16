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



var ref = firebase.database().ref(`/${pbTokken}/`);
var refLast = firebase.database().ref(`/${pbTokken}/`).limitToLast(1);
var refWeek = firebase.database().ref(`/${pbTokken}/`);
var refYear = firebase.database().ref(`/${pbTokken}/`);
var refHour = firebase.database().ref(`/${pbTokken}/`);



var weeklyIncidents = [0,0,0,0,0,0,0];
var monthlyIncidents = [0,0,0,0,0,0,0,0,0,0,0,0];
var hourlyIncidents = [0,0,0,0,0,0,0,0];

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var totalIncidents24 = 0;


refLast.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var key = childSnapshot.key;

      var childData = childSnapshot.val();

      var dtparts  = (childData.date).split('/');
      var thisDate = new Date(dtparts[2], dtparts[1]-1, dtparts[0]);
      document.getElementById("lastIncidentDate").innerText = `${thisDate.getDate()} ${months[thisDate.getMonth()]}`;
      document.getElementById("lastIncidentTime").innerText = childData.time;
      document.getElementById("lastIncidentLocation").innerText = childData.location;
  });
});

ref.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var key = childSnapshot.key;

      var childData = childSnapshot.val();
      var dtparts  = (childData.date).split('/');
      var tymparts = (childData.time).split(' ');
      var timeParts = tymparts[0].split(":");
      var hour = '';
      if(tymparts[1] == "PM" && timeParts[0] != "12"){
          hour = String(parseInt(timeParts[0])+12);
      }
      else if(tymparts[1] == "AM" && timeParts[0] == "12"){
          hour = '00';
      }
      else{
          hour = timeParts[0];
      }
      var thisDate = new Date(dtparts[2], dtparts[1]-1, dtparts[0], hour, timeParts[1]);
      var currDate = new Date();
      if(Math.floor((currDate-thisDate)/3600000) <= 24){
        totalIncidents24++;
      }
      
  });
  document.getElementById("incidents24hrs").innerText = totalIncidents24;
});

refWeek.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var key = childSnapshot.key;

      var childData = childSnapshot.val();
      var dtparts  = (childData.date).split('/');
      var thisDate = new Date(dtparts[2], dtparts[1]-1, dtparts[0]);
      if(thisDate.getDay()-1 == -1){
        weeklyIncidents[6]++;
    } else{
      weeklyIncidents[thisDate.getDay()-1]++;
    }
  });

  dataDailySalesChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
            [weeklyIncidents[0], weeklyIncidents[1], weeklyIncidents[2], weeklyIncidents[3], weeklyIncidents[4], weeklyIncidents[5], weeklyIncidents[6]]
        ]
    };

    optionsDailySalesChart = {
    lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
    }),
    low: 0,
    high: 50, 
    chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    md.startAnimationForLineChart(dailySalesChart);

});








refYear.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var key = childSnapshot.key;

      var childData = childSnapshot.val();
      var dtparts  = (childData.date).split('/');
      var thisDate = new Date(dtparts[2], dtparts[1]-1, dtparts[0]);

      monthlyIncidents[thisDate.getMonth()]++;
  });
    //console.log(monthlyIncidents);
    var dataWebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [monthlyIncidents[0], monthlyIncidents[1], monthlyIncidents[2], monthlyIncidents[3], monthlyIncidents[4], monthlyIncidents[5], monthlyIncidents[6], monthlyIncidents[7], monthlyIncidents[8], monthlyIncidents[9], monthlyIncidents[10], monthlyIncidents[11]]

        ]
      };
    var optionsWebsiteViewsChart = {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: 25,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      };
    var responsiveOptions = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }]
      ];
    var websiteViewsChart = Chartist.Bar('#websiteViewsChart', dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    md.startAnimationForBarChart(websiteViewsChart);
});

refHour.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var key = childSnapshot.key;

      var childData = childSnapshot.val();

      var dtparts  = (childData.date).split('/');
      var tymparts = (childData.time).split(' ');
      var timeParts = tymparts[0].split(":");
      var hour = '';
      if(tymparts[1] == "PM" && timeParts[0] != "12"){
          hour = String(parseInt(timeParts[0])+12);
      }
      else if(tymparts[1] == "AM" && timeParts[0] == "12"){
          hour = '00';
      }
      else{
          hour = timeParts[0];
      }
      var thisDate = new Date(dtparts[2], dtparts[1]-1, dtparts[0], hour, timeParts[1]);

      //console.log(thisDate.getHours());
      
      switch(thisDate.getHours()){
        case 0:
            hourlyIncidents[0]++;
            break;
        case 3:
            hourlyIncidents[1]++;
            break;
        case 6:
            hourlyIncidents[2]++;
            break;
        case 9:
            hourlyIncidents[3]++;
            break;
        case 12:
            hourlyIncidents[4]++;
            break;
        case 15:
            hourlyIncidents[5]++;
            break;
        case 18:
            hourlyIncidents[6]++;
            break;
        case 21:
            hourlyIncidents[7]++;
            break;
      }
      
  });
  //console.log(hourlyIncidents);
    dataCompletedTasksChart = {
        labels: ['12A', '3A', '6A', '9A', '12P', '3P', '6P', '9P'],
        series: [
          [hourlyIncidents[0], hourlyIncidents[1], hourlyIncidents[2], hourlyIncidents[3], hourlyIncidents[4], hourlyIncidents[5], hourlyIncidents[6], hourlyIncidents[7]]
        ]
      };

    optionsCompletedTasksChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 25, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
    md.startAnimationForLineChart(completedTasksChart);
});


var refLast4 = firebase.database().ref(`/${pbTokken}/`).limitToLast(4);
refLast4.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var key = childSnapshot.key;

      var childData = childSnapshot.val();
      let tr = document.createElement('tr');
      var value = `<td>${childData.location}</td>
                        <td>${childData.time}</td>
                        <td>${childData.date}</td>`;
      tr.innerHTML = value;
      document.getElementById("seizureStats").appendChild(tr);
  });
});

var refLast4Alert = firebase.database().ref(`/${pbTokken}/`).limitToLast(4);

refLast4Alert.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var key = childSnapshot.key;

      var childData = childSnapshot.val();
      let tr = document.createElement('tr');
      var value = `<td>${key}</td>
                        <td>${childData.token}</td>`;
      tr.innerHTML = value;
      document.getElementById("alertStats").appendChild(tr);
  });
});