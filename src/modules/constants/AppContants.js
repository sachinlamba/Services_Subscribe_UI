const localhost = false;
const localhostURL = "http://localhost:8080/api";
const herokuURL = "https://service-subscriber.herokuapp.com/api";
let url = "";
if(localhost){
  url = localhostURL;
}else{
  url = herokuURL;
}

export default {
  allServices: url + "/allServices",
  authenticate: url + "/authenticate",
  userSubscribeServices: url + "/userSubscribeServices",
  users: url + "/users"
}
