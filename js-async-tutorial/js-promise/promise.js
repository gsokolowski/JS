// Based on 
// Async JS Crash Course - Callbacks, Promises, Async Await
// https://www.youtube.com/watch?v=PoRJizFvM7s

const posts = [
    { title: 'Post one', description: 'This is post one' },
    { title: 'Post two', description: 'This is post two' }
];

// takes 1 seccond
function getPosts() {
    setTimeout(() => {

        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        });

        document.body.innerHTML = output;
    }, 1000);
};

// takes 2 second
function createPost(post) {
    // return Promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);

            const error = false;
            if (!error) {
                resolve();
            } else {
                reject('Error. Something went wrong');
            }
        }, 2000)
    });
};

let newPost = { title: 'Post Three', description: 'This is post three' };
// Promise
// create post is returning promise. and promise is returnig resolve or rejects
// so promise will create new post and then you can get all Postes by getPosts
createPost(newPost)
    .then(getPosts)
    .catch(err => console.log(err));

