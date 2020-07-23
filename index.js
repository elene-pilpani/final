var COMMENTID = 0

var posts = new Database('posts')

function displayAllPosts() {
	var allPosts = posts.getAll()
	// ფიდის მოწესრიგება
	allPosts.sort(function(post1, post2) {
		if (post1.date - post2.date != 0){
	     	return post1.date - post2.date
	    }else{
			var postC1 = post1.likes.length + post1.comments.length 
			var postC2 = post2.likes.length + post2.comments.length 
			return postC1.length - postC2.length 
		}
	})
	for (let post of allPosts) {
		var elem = createPost(post)
		addNewPost(elem)
		for (let comment of post.comments || []) {
			addNewComment(createComment(comment, post.id), post.id)
		}
		for (let like of post.likes || []) {
			addNewLike(post)
		}
	}
	// ეს ხაზი აუცილებელია news feed ტესტერისთვის
	return allPosts
}


displayAllPosts()

function newPost() {
	var post = posts.create({
		text: getPostText(),
		user: getUser(),
		likes: [],
		//თარიღის შენახვა 
		date: new Date(),
		comments : []
	})
	var elem = createPost(post)
	//ახალი პოსტი არ დაიდოს, თუ post_text ველში ტექსტი არ არის შეყვანილი
	if(getPostText().length != 0){
		addNewPost(elem)
	}
}



function getCommentId() {
	return ++COMMENTID
}
function getPostText() {
	var postInputElement = document.getElementById('post_text')
	return postInputElement.value
}

function getUser() {
	return localStorage.getItem('currentUser') || 'unknown user'
}

function setUser(username) {
	localStorage.setItem('currentUser', username)
	document.getElementById('username').value = username
}

function deletePost(postId) {
	var postElem = document.getElementById(`post-${postId}`)
	postElem.parentNode.removeChild(postElem)
	posts.delete(postId)
}


function createPost(post) {
	return `
		<div id="post-${post.id}" class="post container">
			<div>
				<button class="post_delete_button" onclick="deletePost(${post.id})">
					delete
				</button>
			</div>
			<div class="post_title">
				${post.user}
			</div>
			<div class="post_text">
				${post.text}
			</div>
			<div class="post_date">
			    ${post.date}
			</div>
			${createPostLikes(post)}
			<div class="comments_container">
				<textarea class="comment_input_text"></textarea>
				<button class="new_comment" onclick="newComment(${post.id})">
					add comment
				</button>
				<div class="comments_feed">
				</div>
			</div>
		</div>
	`
}


function createComment(comment) {
	return `<div class="comment_container">
	    <button class="delete_comment" onclick="getCommentDeleteButton(...)">
	       delete comment
        </button>
		<div class="comment_text">
		${comment.text}
		</div>
	</div>`
}

// მაღლა კომენტარის წაშლის ღილაკი დავამატე, ფუნქცია აკლია.

function newComment(postId) {
	var postElem = document.getElementById(`post-${postId}`)
	var comment_input = postElem.querySelector('textarea.comment_input_text')
	const comment = {
		text: comment_input.value,
		id: getCommentId()
	}
	addNewComment(createComment(comment), postId)
}

function addNewComment(elem, postId) {
	var postElem = document.getElementById(`post-${postId}`)
	var postComments = postElem.querySelector('div.comments_feed')
	var commentContainer = document.createElement('div')
	commentContainer.innerHTML = elem
	postComments.insertAdjacentElement('afterbegin', commentContainer)
}

function createPostLikes(post) {
	return `
		<div class="post_likes_container">
			<div class="post_likes_info">
				<span class="post_likes_count">
					${post.likes.length}
				</span> 
				<span class="post_likes_text">
					likes
				</span>
			</div>
			<button class="post_like_button" onclick="newLike(${post.id})">
				like
			</button>
		</div>
	`
}


function newLike(postId) {
	var post = posts.getById(postId)
	var user = getUser()
	if (!post.likes.includes(user)) {
		post.likes.push(user)
	}
	posts.update(post) 
	addNewLike(post)
}

function addNewLike(post) {
	var postElem = document.getElementById(`post-${post.id}`)
	var postLikes = postElem.querySelector('div.post_likes_info')
	var postLikesCountElem = postLikes.querySelector('span.post_likes_count')
	var postLikesInfoElem = postLikes.querySelector('span.post_likes_text')
	postLikesCountElem.innerText = post.likes.length
}

function addNewPost(elem) {
	var posts = document.getElementById('posts')
	var post = document.createElement('div')
	post.innerHTML = elem
	posts.insertAdjacentElement('afterbegin', post)
}

