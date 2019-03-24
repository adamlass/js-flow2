# Period-2 Node.js, Express + JavaScript Backend Testing, NoSQL, MongoDB and Mongoose

>**Why would you consider a Scripting Language as JavaScript as your Backend Platform?**

Developing with a scripting language is very simple and easy, there is less overhead and it is also less code intensive.

Also scripting languages like JS and python are generally more modern/used, making it much easier to find help, templates and libraries online. They are also mordern in the sense that many of the libraries and code aspects around SCs consider real-world usage scenarios first, making them much more intuitive.

>**Explain Pros & Cons in using Node.js + Express to implement your Backend compared to a strategy using, for example, Java/JAX-RS/Tomcat**

**pros**

1. Node is faster to write
3. Integrates well with NoSQL DBs like mongoDB, making scaling much easier
4. Can run on its own, whitout a tomcat server

**cons**

1. Libraries depends on long chains of dependencies which lifetime support is not guarrenteed, which can result in not being able to update dependencies and security updates whitout crashing.
2. Writing asyncronous code can be a pain



>**Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to implement a Node.js based server architecture that still could take advantage of a multi-core Server.**
     
By using a Process manager, you could utilize all cores in the cpu by letting the PM spawn several instances of the server. This of course requires you to make the code compatible in this environment, by handeling sessions on a centered level.
     
>**Explain briefly how to deploy a Node/Express application including how to solve the following deployment problems:**

To deploy a node server, we would have to:

1. Upload/download the project (by github)
2. run `npm install` to get all the node modules
3. Edit the NGINX config to point all trafic to the project
4. Run it in production mode (Preferably with a Process Manager)
 
>* **Ensure that you Node-process restarts after a (potential) exception that closed the application**

Use a Process Manager like PM2

>* **Ensure that you Node-process restarts after a server (Ubuntu) restart**

Use a Process Manager like PM2
>* **Ensure that you can take advantage of a multi-core system**

Use a Process Manager like PM2
>* **Ensure that you can run “many” node-applications on a single droplet on the same port (80)**

This is handled by NGINX

>**Explain the difference between “Debug outputs” and application logging. What’s wrong with console.log(..) statements in our backend-code.**

Debugging outputs are outputs that are triggred when a debugging enviromental variable is set telling a task to print debug-statements in the terminal. - The point of this is for a developer or administrator to see errors realtime. Logs are written in log files, and their purpose is to log events in the code over time, making it posible to track down errors or hackers in the future. 

>**Demonstrate a system using application logging and “coloured” debug statements.**

**logging**

`logger-setup.js`

```
const winston = require('winston')

var logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })
    ],
    exitOnError: false
})

module.exports = logger;
```

`app.js`

```
const appLogger= require('./logger-setup')

...

//using morgan middleware whit configuration
app.use(require("morgan")("combined", { stream: appLogger.stream }));

```

*example of output in log file:*

```
{"level":"error","message":"127.0.0.1 - there's no place like home"}
{"level":"warn","message":"127.0.0.1 - there's no place like home"}
{"level":"info","message":"127.0.0.1 - there's no place like home"}
```
<hr>

**debugging**

```
var debug = require('debug')('debug-log-demo:app');

//Printing debug statement in a random place in the code
...
  debug("Hello World")
...

```
*output in terminal:*

```
debug-log-demo:app Hello World +3ms
```
>**Explain, using relevant examples, concepts related to testing a REST-API using Node/JavaScript + relevant packages**

To test a REST api in a Node application you would need at least 2 things: a testing program (like *mocha*) and a http handler (like *fetch*). To test the code with mocha you have to place your test in a folder called `test` and then use the `decribe` method to initate the test like this:

```
describe("Test", function () {
    ...
})
```

inside the function aboove you can make your individual tests by using the `it` method, and in it calling a assert method like so:

```
const fetch = require("node-fetch")
...
describe("Test", function () {
    it("should find user", async function () {
            let res = await fetch(url_users + testUser1.userName)
            let user = await handleHttpErrors(res)

            assert.equal(user._id, testUser1._id)
    })
})
```


>**Explain, using relevant examples, the Express concept; middleware.**

A middleware in express is a function that gets called whenever the applicating is called. The order of assinging the middlewares defines the sequence that the middlewares are called, making it possible for one middleware to process the data in the request before another middleware gets it. Passing the the server call to the next middleware is done by calling the `next` callback. - Not ending a middleware "transaction" with eighter calling `next` or `req.send(...)` will make the request halt.

To set up a middleware, you have to use the method `use` like so:
```

```

>**Explain, using relevant examples, how to implement sessions and the legal implications of doing this.**


>**Compare the express strategy toward (server side) templating with the one you used with Java on second semester.**


>**Demonstrate a simple Server Side Rendering example using a technology of your own choice (pug, EJS, ..).**


>**Explain, using relevant examples, your strategy for implementing a REST-API with Node/**

>**Express and show how you can "test" all the four CRUD operations programmatically using, for example, the Request package.**

>**Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.**


>**Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.**


>**Explain, preferably using an example, how you have deployed your node/Express applications, and which of the Express Production best practices you have followed.**

## NoSQL, MongoDB and Mongoose
>**Explain, generally, what is meant by a NoSQL database.**


>**Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.**


>**Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB**

#### These two topics will be introduced in period-3
>**Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.**


>**Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere**


>**Demonstrate, using a REST-API you have designed, how to perform all CRUD operations on a MongoDB**


>**Explain the benefits of using Mongoose, and demonstrate, using your own code, an example involving all CRUD operations**


>**Explain the “6 Rules of Thumb: Your Guide Through the Rainbow” as to how and when you would use normalization vs. denormalization.**


>**Demonstrate, using your own code-samples, decisions you have made regarding → normalization vs denormalization**


>**Explain, using a relevant example, a full JavaScript backend including relevant test cases to test the REST-API (not on the production database)**
