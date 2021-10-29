const request = require('supertest')('https://jsonplaceholder.typicode.com');
const assert = require('chai').assert;

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
describe('Post API', () => {
  it('GET /posts', () => {
    // Make a GET request to the posts route 
    return request
      .get('/posts')
      .expect(200)
      .then ((res) => {
        //assert data being return to not be empty
        assert.isNotEmpty(res.body);
        console.log("type = "+typeof(res.body));
        console.log("length = " + res.body.length);
        let postsArray = res.body;

        for (let i = 0; i < postsArray.length; i++) {
          if (postsArray[i]["userId"] == delphineUserId) {
            postsOfDelphine.push(postsArray[i])
          } 
        }

        console.log("Delphine post count :" + postsOfDelphine.length)
        assert.isNotEmpty(postsOfDelphine)
      });
  });
});
