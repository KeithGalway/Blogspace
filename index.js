let postsArray = []                                           // declare postsArray to hold blog posts
const titleInput = document.getElementById('post-title')      // get post-title element
const bodyInput = document.getElementById('post-body')        // get post-body element
const form = document.getElementById('new-post')              // get new-post element

// renderPosts function
function renderPosts() {
    let html = ''                                             // declare html for post data
    for (let post of postsArray) {                            // iterate over posts array
        html += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr />
        `                                                     // set html with embedded post data
    }
    document.getElementById('blog-list').innerHTML = html     // set blog-list element to post data html
}

// api fetch call to retrive posts
fetch('https://apis.scrimba.com/jsonplaceholder/posts')       // fetch posts from api
    .then(res => res.json())                                  // get response data
    .then(data => {
        postsArray = data.slice(0, 5)                         // populate post array by selecting the first 5 posts
        renderPosts()                                         // run renderPosts function to display fetched data
    })

// submit event listener
form.addEventListener('submit', (e) => {
    e.preventDefault()                                        // prevent page from reloading
    const postTitle = titleInput.value                        // get title input value from titleInput element value
    const postBody = bodyInput.value                          // get body input value from bodyInput element value
    const data = {
        title: postTitle,
        body: postBody
    }                                                         // create data object that holds title and body values

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }                                                         // create POST request with the data object in JSON format

    // api fetch call to post request
    fetch('https://apis.scrimba.com/jsonplaceholder/posts', options)
        .then(res => res.json())                              // get response data
        .then(post => {
            postsArray.unshift(post)                          // adds new post to posts array
            renderPosts()                                     // run renderPosts function to display fetched data
            form.reset()                                      // clear form by clearing tile and body value
        })
})  