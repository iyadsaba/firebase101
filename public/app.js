document.addEventListener("DOMContentLoaded", event =>{

    const app = firebase.app();
    console.log('====================================');
    console.log(app);
    console.log('====================================');
});

function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then( result =>{
        const user = result.user;
        // document.write(`Hello ${user.displayName}`);
        console.log('====================================');
        console.log(user);
        console.log('====================================');

         console.log("user is logged in ");
         console.log(`${numberOfOnlineUsers} users online `)
         updateOnlineUsers();
    })
    .catch(console.log);
}

function emailLogin(event){
    
    // const provider = new firebase.auth.
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    console.log('====================================');
    console.log(email);
    console.log(password);
    console.log('====================================');
      firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(data =>{

        console.log("user is logged in ");
        console.log(`${numberOfOnlineUsers} users online `)
        updateOnlineUsers();
      })
      .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
          } else {
              alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
      });
}

function checkTotalUsersOnline(){
   return numberOfOnlineUsers;
}

function logoutUser(){
    firebase.auth().signOut()
    .then(function () {
    console.log('====================================');
    console.log("user logged out");
    console.log('====================================');
    }).catch(function (error) {
        console.log('====================================');
        console.log(`error while logging out user,${error}`);
        console.log('====================================');
    });

    userRef.signOut()
}

var numberOfOnlineUsers;

var listRef = new Firebase("https://eastern-crawler-190014.firebaseio.com/presence/");
var userRef = listRef.push();

// Add ourselves to presence list when online.
var presenceRef = new Firebase("https://eastern-crawler-190014.firebaseio.com/.info/connected");
presenceRef.on("value", function (snap) {
    if (snap.val()) {
        // Remove ourselves when we disconnect.
        userRef.onDisconnect().remove();

        userRef.set(true);
    }
});

// Number of online users is the number of objects in the presence list.
listRef.on("value", function (snap) {
    console.log("# of online users = " + snap.numChildren());
    numberOfOnlineUsers = snap.numChildren();
});



function updateOnlineUsers(){
    document.getElementById("online").innerHTML = numberOfOnlineUsers;
}
 





