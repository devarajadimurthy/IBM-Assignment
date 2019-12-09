// load up our routes for Employees Application
const userRoutes = require('./api/employees');

const appRouter = (app, fs) => {
    // we've added in a default route here that handles empty routes
    // at the base API url
    app.get('/', (req, res) => {
        res.send('welcome to the IBM Assignment');
    });

    // run employee route module here to complete the wire up
    userRoutes(app, fs);
};

module.exports = appRouter;

