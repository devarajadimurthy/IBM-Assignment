const userRoutes = (app, fs) => {

    // variables
    const dataPath = './data/employee.json';

    // refactored helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

   const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };


    // READ all Employees Operation
    app.get('/api/employees', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            // Send all Employee records as JSON response
            res.send(JSON.parse(data));
        });
    });

    // READ a specific Employee Operation
    app.get('/api/employees/:id', (req, res) => {
        readFile(data => {
            // Read employee ID from request parameter
            const userId = req.params["id"];

            // Send Employee record for requested ID as JSON response
            res.status(200).send(data[userId]);
        },
            true);
    });

    // CREATE new Employee record Operation
    app.post('/api/employees', (req, res) => {

        readFile(data => {
            const newUserId = Object.keys(data).length + 1;

            var currentDate = new Date(); // (YYYY-MM-DD) 
            var hireDate = new Date(req.body.hiredate);

            if (req.body.role != 'ceo' && req.body.role != 'vp' && req.body.role != 'manager' && req.body.role != 'lackey')
            {
                res.status(200).send('Invalid Role : Allowed Roles are - ceo, vp, manager and lackey');
            }
            else {
                // Hire Date validation to check if its in the past
                if (hireDate.getTime() > currentDate.getTime()){
                    res.status(200).send('Hire Date should be lesser than Current Date');
                }
                else {
                    // CEO record validation to check to see only one CEO record should be there
                    var ceoFound = 'false';
                    if (req.body.role == 'ceo'){
                        for (var i = 1; i <= Object.keys(data).length; i++)
                        {
                            if (data[i].role == 'ceo'){
                                res.status(200).send('Cannot insert this Record as we already have a CEO');
                                ceoFound = 'true';
                                break;
                            }
                        }
                        if (ceoFound == 'false'){
                            // add the new user
                            data[newUserId] = req.body;
                        }
                    }
                    else {
                        // add the new user
                        data[newUserId] = req.body;
                    }
                }
            }

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    });

    // UPDATE an Employee record Operation
    app.put('/api/employees/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            
            var ceoFound = 'false';

            var currentDate = new Date(); // (YYYY-MM-DD) 
            var hireDate = new Date(req.body.hiredate);

            if (req.body.role != 'ceo' && req.body.role != 'vp' && req.body.role != 'manager' && req.body.role != 'lackey')
            {
                res.status(200).send('Invalid Role : Allowed Roles are - ceo, vp, manager and lackey');
            }
            else {
                // Hire Date validation to check if its in the past
                if (hireDate.getTime() > currentDate.getTime()){
                    res.status(200).send('Hire Date should be lesser than Current Date');
                }
                else {
                    if (req.body.role == 'ceo'){
                        
                        for (var i = 1; i <= Object.keys(data).length; i++)
                        {
                            if (data[i].role == 'ceo' && i != userId){
                                res.status(200).send('Cannot update this Record as we already have a CEO');
                                ceoFound = 'true';
                                break;
                            }
                        }
                        if (ceoFound == 'false'){
                            // add the new user
                            data[userId] = req.body;
                        }
                    }
                    else {
                        // add the new user
                        data[userId] = req.body;
                    }
                }
            }

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    });

    // DELETE an Employee record Operation
    app.delete('/api/employees/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    });

};

module.exports = userRoutes;
