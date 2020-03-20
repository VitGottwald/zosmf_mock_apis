const jsonServer = require("json-server");
const path = require("path");
const routes = require(path.join(__dirname, "routes.json"));
const querystring = require("querystring");

const DEFAULT_PORT = 3000;

const server = jsonServer.create();

const db = path.join(__dirname, "db.json");
const router = jsonServer.router(db);
// const rewriter = jsonServer.rewriter(routes);
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);


// const rewriter = jsonServer. rewriter({
//     '/getJobs':'/jobs'
// })

server.use(jsonServer.rewriter({
    '/zosmf/*' : "/$1",
    '/restjobs/jobs/:jobName/:jobId/files' : '/jobs?jobname=:jobName&jobid=:jobId'
}));
// Order matters! rewriter needs to be before router
// server.use(rewriter);
// mount the router on a different endpoint
server.use(router);

server.listen(DEFAULT_PORT, () => {
    console.log(`z/OSMF Mock Server is running on port ${DEFAULT_PORT}`);
    console.log(`http://localhost:${DEFAULT_PORT}`);
})
