const request = require('supertest')('https://jsonplaceholder.typicode.com');
const assert = require('chai').assert;

describe('Users API', () => {
     it('GET /users', () => {
       // Make a GET request to the users route 
     return request
     .get('/users')
     .expect(200)
     .then ((res) => {
         //assert data being return to not be empty
         assert.isNotEmpty(res.body);
     });
      });
      });


      describe('Users API', () => {
        it('Post/users', () => {
           const data = {
                name: "Test user",
                email:"test_user@gmail.com"
           };
          // Make a Post request to the users route 
        return request
        .post('/users')
        .send(data)//send payload data
        .then ((res) => {
          assert.hasAnyKeys(res.body, 'id');
          assert.equal(res.body.name, data.name);
          assert.equal(res.body.email, data.email); 
        });
         });
         });
   