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
    if (Check() == true){
    users.create(user)
    }
}

// ამის ტესტებს ვერაფერი გავუგე :დ რაც არ გამიკეთებია მაგაზე კიო მეუბნება, რასაც წესით ვაკეთებ(?) არაო ;დდდ
function Check(){
    if (password.length >= 8 &&
        password.search [/A-Z/i] >=1 && 
        password.search [/a-z/i] >=1 &&
        password.search [/0-9/] >= 1){ 
         return true;
    }else{ 
         return false; 
    }
  
}