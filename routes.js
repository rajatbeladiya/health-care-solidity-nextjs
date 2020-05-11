const routes = require('next-routes')();

routes
    .add('/doctor/:address','/doctor/view')
    .add('/patient/:address','/doctor/view')
    .add('/meetings/:address','/meetings/view')
    .add('/meetings/add/:address','/meetings/add')

module.exports = routes;