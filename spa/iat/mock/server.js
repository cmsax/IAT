const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Submit IAT result.
server.post("/feiwei/iat", function(req, res) {
  console.log(req.body);
  setTimeout(() => {
    res.status(200).send("ok");
  }, 500);
});

// Listen and serve.
server.listen(3000, () => {
  console.log("mock server is running on http://localhost:3000");
});
