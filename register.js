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

// ამის ტესტებს ვერაფერი გავუგე :დ რაც არ გამიკეთებია მაგაზე კიო მეუბნება, რასაც წესით ვაკეთებ(?) არაო ;დდდ

//აქ ვერ ხვდებოდა რო RegEx იყო და დავანაწევრე და ისე შევამოწმე. თუ არ არსებობს -1 აგდებს და ეგეც შევცვალე 

//ამას გარდა, ამ ფუნქციაში დავამატე თუ ემთხვევა პაროლის და გამეორებული პაროლის შეყვანილი მნიშვნელობები

//აქვე დავწერე username არსებობს თუ არა.

//ფული არ არის საჭირო მეგობარო, პატარა საჩუქარი იყოს, თითქმის ყველაფერი გეწერა :3
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