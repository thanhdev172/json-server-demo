const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const queryString = require("query-string");

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  } else if (req.method === "PATCH") {
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

router.render = (req, res) => {
  const headers = res.getHeaders();
  const totalCountHeaders =
    headers["x-total-count"].__wrapped__.products.length;
  // const totalCountHeaders = headers["x-total-count"];
  const queryParams = queryString.parse(req._parsedUrl.query);

  if (req.method === "GET" && totalCountHeaders) {
    console.log("abc");
    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page),
        _limit: Number.parseInt(queryParams._limit),
        _totalRows: Number.parseInt(totalCountHeaders),
      },
    };

    return res.jsonp(result);
  }

  res.jsonp(res.locals.data);
};

const PORT = process.env.PORT || 3000;
// Use default router
server.use("/api", router);
server.listen(PORT, () => {
  console.log("JSON Server is running");
});
