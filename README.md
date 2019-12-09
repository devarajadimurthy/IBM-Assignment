# Take Home Assignment

REST APIs allowing CRUD functionality for an employee resource :

APIs Implemented -
1) GET http://localhost:3000/api/employees/:id
- Return the record corresponding to the id parameter

2) GET http://localhost:3000/api/employees
- Return all current records

3) DELETE http://localhost:3000/api/employees/:id
- delete the record corresponding to the id parameter

4) PUT http://localhost:3000/api/employees/:id
- Replace the record corresponding to :id with the contents of the PUT body

5) POST http://localhost:3000/api/employees
- Create a new record using a randomly generated value as the unique identifier (i.e. _id field).

Validations Implemented -
1) There should be only one CEO
2) Hire Date should be less than Current Date
3) Role should be one of the following -
  - CEO
  - VP
  - MANAGER
  - LACKEY

Future Enhancements -
1) Front End / UI for this Employee CRUD Node js application
2) two fields in each new record that are populated by different external APIs.  For example, a favorite joke and a favorite quote, or a favorite joke and a second favorite joke.  As long as the two external APIs are different.
    - Possible API endpoints:
    
           - https://ron-swanson-quotes.herokuapp.com/v2/quotes
           
           - https://icanhazdadjoke.com
           
           - https://quotes.rest/qod

