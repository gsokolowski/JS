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
    setTimeout(() => {
        posts.push(post);
    }, 2000)
};

createPost({ title: 'Post Three', description: 'This is post three' })
getPosts();


