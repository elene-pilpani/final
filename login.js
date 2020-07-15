function getValue(query) {
	return document.querySelector(query).value
}

var users = new Database('users')

function login() {
	var user = users.get('username', getValue('input#username'))
	if (user.password === getValue('input#password')) {
		localStorage.setItem('status', 'loggedin')
		window.location = "./index.html"				
	} else {
		console.log('wrong password')
		//  თუ მომხმარებლის შეყვანილი პაროლი არ არის სწორი, error_message ელემენტში უნდა დაეწეროს 'პაროლი არასწორია'
		document.getElementById('error_message').innerHTML += 'პაროლი არასწორია';
	}   
	   
}

  // პრობ 1: როცა 'მომხ.. არსებობს'-ს წერს პირველ დავალებასში ერორს აგდებს.
  // რობ 2: რაცხა ნიტოა ასე შემოწმება, წესით არასწორად მაქვს.
 if(user !== getValue('input#username')){
		document.getElementById('error_message').innerHTML += '<br> მომხმარებელი არ არსებობს';
}
  



	