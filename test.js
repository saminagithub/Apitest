const request = require('supertest')('https://jsonplaceholder.typicode.com');
const assert = require('chai').assert;

//Defining email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(String(email).toLowerCase());
    console.log(email + " -> " + result);
    return result;
}

//Searching for the username Delphine from the users endpoint and asserting that the users data is not be empty  
let delphineUserId = null
describe('Users API', () => {
  it('GET /users', () => {
    // Make a GET request to the users route 
    return request
      .get('/users') 
      .expect(200)
      .then ((res) => {
        //assert data being return to not be empty
        assert.isNotEmpty(res.body);
        console.log("type = "+typeof(res.body));
        console.log("length = " + res.body.length);
        let usersJsonString = res.body; 

        
        for (let i = 0; i < usersJsonString.length; i++) {
          console.log(usersJsonString[i]["username"]);
          if (usersJsonString[i]["username"] == "Delphine") {
            delphineUserId = usersJsonString[i]["id"]
          } 
        }
        console.log("We found the id of Delphine: "+delphineUserId);
        //console.log(res.body);
        assert.isNotNull(delphineUserId);
      });
  });
});

//Searching for all the posts made by Delphine and asserting that her posts are not empty
let postsOfDelphine = []
describe('Posts API', () => {
  it('GET /posts', () => {
    // Make a GET request to the posts route
    return request
      .get('/posts')
      .expect(200)
      .then ((res) => {
        //assert data being returned is not be empty
        assert.isNotEmpty(res.body);
        console.log("type = "+typeof(res.body));
        console.log("length = " + res.body.length);
        let postsOfEveryone = res.body;

        for (let i = 0; i < postsOfEveryone.length; i++) {
          if (postsOfEveryone[i]["userId"] == delphineUserId) {
            postsOfDelphine.push(postsOfEveryone[i])
          } 
        }

        console.log("Delphine post count :" + postsOfDelphine.length)
        assert.isNotEmpty(postsOfDelphine)
      });
  });
});

//Fetching all the posts for Delphine and validating that the email is in a proper format
describe('Comments API', () => {
  it('GET /comments', () => {
    // Make a GET request from the comments route 
    return request
      .get('/comments')
      .expect(200)
      .then ((res) => {
        assert.isNotEmpty(res.body);
        console.log("type = "+typeof(res.body));
        console.log("length = " + res.body.length);
        let commentsOfEveryone = res.body;

        let commentsMadeToDelphinePosts = []
        for (let i = 0; i < commentsOfEveryone.length; i++) {
          for (let j = 0; j < postsOfDelphine.length; j++){
            if (commentsOfEveryone[i]["postId"] == postsOfDelphine[j]["id"]) {
              commentsMadeToDelphinePosts.push(commentsOfEveryone[i])
            } 
          }
        }

        invalidUserEmails=[]
        for(let k = 0; k<commentsMadeToDelphinePosts.length; k++) {
          // console.log(commentsMadeToDelphinePosts[k]["email"] + " made a comment to a post by Delphine")
          if (!validateEmail(commentsMadeToDelphinePosts[k]["email"])) {
            invalidUserEmails.push(commentsMadeToDelphinePosts[k]["email"]);
          }
        }
        console.log("Found erroneus emails:" + invalidUserEmails.length)
        console.log("Comments made to Delphines' posts :" + commentsMadeToDelphinePosts.length)
        assert.isNotEmpty(commentsMadeToDelphinePosts)
      });
  });
});
