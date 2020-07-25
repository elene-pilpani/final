// რეგისტრაციის გვერდზე არსებობს users ბაზა, რომელიც შენახულია ცვლადში users
var users = new Database('users')


// რეგისტრაციის ღილაკზე დაჭერის შემთხვევაში users ბაზაში ემატება მომხმარებელი username სახელით და password პაროლით
function getValue(query) {
    return document.querySelector(query).value
}

function register(){
    var user = {
        username: getValue('input#username'),
        password: getValue('input#password')
    }


    if (Check(user.username,user.password)){
        users.create(user)
    }
}
function Check(username,password){


    var upperReg = new RegExp('[A-Z]');
    var lowerReg = new RegExp('[a-z]');
    var digitReg = new RegExp('[0-9]');

    if (password.length < 8 ||
        password.search (upperReg) == -1 || 
        password.search (lowerReg) == -1 ||
        password.search(digitReg) == -1){ 
         return false;
    }

    if(users.get(username)) return false;

    if(password != getValue("input#repeat_password")) return false;

    return true;


    
  
}