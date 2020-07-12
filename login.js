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
	}

}