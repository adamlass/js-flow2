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
app.use(function (req, res, next) {
  ...
  next()
});
```

>**Explain, using relevant examples, how to implement sessions and the legal implications of doing this.**

```
var cookieSession = require('cookie-session')
...

app.use(cookieSession({
  name: 'session',
  keys: [/* secret keys */],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

...
```

Using session and cookies without user consent is very illegal due to the new GDPR enforced by the European Union. The law states that any information that together with other information can be linked to a european citizen is personal data. Therefore a session cookie is inherently personal data if its linked to a session containing personal data and must approved by the user with a concent. If consent is not an option, the data kept must be anonymous in its form.

>**Compare the express strategy toward (server side) templating with the one you used with Java on second semester.**

They practically use the same strategy by rendering the imbedded language on serverside. In express there are many options to what imbedding strategy you can use (like ejs), and in java the option is primarily JSX.

>**Demonstrate a simple Server Side Rendering example using a technology of your own choice (pug, EJS, ..).**

`joke.js`

```
var express = require("express")
var router = express.Router()
const jokes = require("../model/jokes")

router.get("/", (req,res,next) => {
    if(!req.session.jokeCount) req.session.jokeCount = 0
    req.session.jokeCount += 1
    console.log(req.session.jokeCount);
    
    res.render("joke", {joke:jokes.getRandomJoke() })
})

module.exports = router
```

`joke.ejs`

```
<!DOCTYPE html>
<html>

<head>
    <title>Page Title</title>
</head>

<body style="background-color: black; color: dodgerblue">
    <h1><%= joke %></h1>
    <br><br>
    <a style="color: dodgerblue" href="/">back</a>
</body>

</html>
```

>**Explain, using relevant examples, your strategy for implementing a REST-API with Node/**

To implement a REST API i would make use of express and its router like so:
```
app.use("/api",apiRouter)
```

This makes it easy to se up the api in different modules. Here is an expample of how different API endpoints look in the `apiRouter`:


```
router.post("/joke", (req,res,next) => {
    console.log(req.body)
    var joke = req.body.joke
    jokes.addJoke(joke)
    res.json(joke)
})

router.get("/jokes", (req,res,next) => {
    res.json(jokes.getAllJokes())
})
```

>**Express and show how you can "test" all the four CRUD operations programmatically using, for example, the Request package.**

I would make a file for testing it with mocha, and put it in the `test` folder in the root of the project.

Then i would make sure that an express server get spawned before all test by using the *before* method

Then, in every test, i would use *node-fetch* to call the API:

```
var expect = require("chai").expect;
var http = require('http');
var app = require('../app');
var fetch = require("node-fetch");
var TEST_PORT = 3344;
var URL = `http://localhost:${TEST_PORT}/api`;
var jokes = require("../model/jokes");
var server;
describe("Verify the Joke API", function () {
  before(function (done) {
    server = http.createServer(app);
    server.listen(TEST_PORT, () => {
      console.log("Server Started")
      done()
    })
  })
  after(function (done) {
    server.close();
    done();
  })
  beforeEach(function () {
    jokes.setJokes(["aaa", "bbb", "ccc"])
  })

  it("Should add the joke 'ddd", async function () {
    var init = {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({ joke: "ddd" })
    }
    await fetch(URL + "/joke", init).then(r => r.json());
    //Verify result
    expect(jokes.getAllJokes()).lengthOf(4);
    expect(jokes.getAllJokes()).to.include("ddd")
  })

  it("should get all jokes", async function () {
    
    await fetch(URL + "/jokes").then(r => r.json());
    //Verify result
    expect(jokes.getAllJokes()).lengthOf(3);
  })

  it("should get random jokes", async function () {
    
    let joke = await fetch(URL + "/joke/random").then(r => r.json());
    console.log("joke",joke)
    //Verify result
    expect(jokes.getAllJokes()).to.include(joke)
  })
  
})


```

>**Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.**

mocha is a good way to test your JS code in Node. By making your test in the *test* folder, you can simply call mocha by using the `mocha`command in the root of the project.

Mocha looks for the *describe* method, and assume that it contains a test.

it the *describe* method you would give a callback containing your tests defined by the *it* method also containing a callback with an assert statement like so:

```
describe("LocationBlogFacade", function () {
    ...

    it("should add the user to the liked list", async function () {
        const blog = await blogFacade.likeLocationBlog(testBlog1, testUser1)
        assert.ok(blog.likedBy[0].equals(testUser1))
    })

	...
})
```

to test async code you can simply make use of async/await annotation like above, or you can use the `done` callable to indicate that Mocha should wait for it like so:

```
 after(function (done) {
    server.close();
    done();
  })
```


>**Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.**

Mocking is a way of imitating an endpoints behaviore, whitout ever making a call to the endpoint itself. the is done by setting up nock to point trafic to a specific endpoint to returning some kind of object.

You can use Nock to mock an endpoint like so:

```
...
const nock = require("nock");

const testPerson = {"name": "Luke Skywalker", "height": "172", "mass": "77",}

const n = nock('https://swapi.co');

describe('swapiModule Get person', function () {
    
    beforeEach(function () {
        n.get('/api/people/1').reply(200, testPerson);
    });
    
    it('should fetch Luke Skywalker', async function () {
        let person = await swapi.getPerson(1);
        assert.equal(person.name, "Luke Skywalker")
    });
});
```

>**Explain, preferably using an example, how you have deployed your node/Express applications, and which of the Express Production best practices you have followed.**

Like explained previously i would have used nginx.

also i would make sure to diable all print statements, because they are blocking, and maybe set up a debug mode if needed. Also i would add logging. For DB i would use MongoDB with mongoose.

## NoSQL, MongoDB and Mongoose
>**Explain, generally, what is meant by a NoSQL database.**

A NoSQL database is a database that doesn't use SQL to persist data.

>**Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.**

**pros**

- Scalable on a cluster!!
- Faster than joining a lot of databases
- Simple to query nested objects

**cons**

- Stores redundant data
- Not perfectly consistent with data.

>**Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB**

Since MongoDB on its own is schemaless, which can cause some troubles, using a layer on top like mongoose makes it possible also to reference documents in other collections inside a document.

#### These two topics will be introduced in period-3
>**Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.**

Indexes are a way to uptimize querying a collection in MongoDB. When using indexes in mongoDB it creates a mapping of indexes under the surface, making it much faster to find a matching an index, rather than iteration all documents in a collection to check the values:

to set a index on a field:
```
db.collection.createIndex( { name: -1 } )
```
here the index is decending.

>**Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere**

*Waiting for flow3 to answer this...*

>**Demonstrate, using a REST-API you have designed, how to perform all CRUD operations on a MongoDB**

```
class UserFacade {
    async addUser(firstName, lastName, userName, password, email) {
        let user = new User({ firstName, lastName, userName, password, email })
        return user.save()
    }

    async addJobToUser(user, job) {
        user.job.push(job)
        return user.save()
    }

    async findByUserName(username) {
        return (await User.find({userName: username}))[0]
    }
    
    async removeUser(id){
        return await User.remove({_id: id})
    }

}

```

>**Explain the benefits of using Mongoose, and demonstrate, using your own code, an example involving all CRUD operations**


Done above??

>**Explain the “6 Rules of Thumb: Your Guide Through the Rainbow” as to how and when you would use normalization vs. denormalization.**

1. **favor embedding unless there is a compelling reason not to**
 - It is much faster to get a result when the DB doesn't have to join documents, and therefore your starting point should allways be to imbed unless you have good reasons not to.

2. **needing to access an object on its own is a compelling reason not to embed it**

 - If you often have to use an object on its own, it is not ideal to have to also retrive the whole parent object every time you make that object. So even if there is a link between two entities, it is not allways a good idea to imbed.

3. **Arrays should not grow without bound. If there are more than a couple of hundred documents on the “many” side, don’t embed them; if there are more than a few thousand documents on the “many” side, don’t use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed.**
	- Imbedding huge arrays of data makes the task of retriving data from a single parent a very slow.

4. **Don’t be afraid of application-level joins: if you index correctly and use the projection specifier (as shown in part 2) then application-level joins are barely more expensive than server-side joins in a relational database.**

	- The process of joining is not that expensive, so don't be afraid to use it if needed.

5. **Consider the write/read ratio when denormalizing. A field that will mostly be read and only seldom updated is a good candidate for denormalization: if you denormalize a field that is updated frequently then the extra work of finding and updating all the instances is likely to overwhelm the savings that you get from denormalizing.**

	 - Think of the real-life write/read ratio when making decitions in the designing phase.

6. **As always with MongoDB, how you model your data depends – entirely – on your particular application’s data access patterns. You want to structure your data to match the ways that your application queries and updates it.**
	- Again: Think of the real-life write/read ratio when making decitions in the designing phase.


>**Demonstrate, using your own code-samples, decisions you have made regarding → normalization vs denormalization**

When desinging the *mini-project* we made a decition to not imbed a position in one Schema, and to not imbed it in another. This was because our LocationBlog collection would need frequent position updates, whereas our Users position would change constantly:

`LocationBlog.js`
```
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LocationBlogSchema = new Schema({
    info: {type: String, required: true},
    img: String,
    pos: {
        longitude: {type: Number, required: true},
        latitude: {type: Number, required: true},
    },
    author: {type: Schema.Types.ObjectId, ref:"User", required: true},
    created: {type: Date, default: Date.now},
    lastUpdated: Date,

    //TODO Why not ref below?
    likedBy: [{type: Schema.Types.ObjectId, ref:"User"}],

    //slug: ,

})

LocationBlogSchema.virtual("likedByCount").get(function(){
    return this.likedBy.length
})


LocationBlogSchema.pre("update", function(next){
    this.update({},{$set: {lastUpdated: new Date()}})
    next()
})

var LocationBlog = mongoose.model("LocationBlog", LocationBlogSchema)

module.exports = LocationBlog

```

`Position.js`
```
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const SECONDS = 1;
var EXPIRES = 60  * SECONDS ;

var PositionSchema = new Schema({
 //Make sure that next line reflects your User-model
 user: {type: Schema.ObjectId, ref: 'User', required: true},
 created: { type: Date, expires: EXPIRES, default: Date.now },
 loc: {
 'type': { type: String, enum: "Point", default: "Point" },
 coordinates: { type: [Number] }
 }
})

PositionSchema.index({ loc: "2dsphere" },{ "background": true });

module.exports = mongoose.model("Position",PositionSchema);
```


>**Explain, using a relevant example, a full JavaScript backend including relevant test cases to test the REST-API (not on the production database)**

"Like explained previously i would have used nginx.

also i would make sure to diable all print statements, because they are blocking, and maybe set up a debug mode if needed. Also i would add logging. For DB i would use MongoDB with mongoose."

testing the db could look like this:

```
const assert = require("assert")
const blogFacade = require("../facade/blogFacade")
const LocationBlog = require("../models/LocationBlog")
const User = require("../models/User")

const connect = require("../dbConnect")
connect(require("../settings").TEST_DB_URI);

describe("LocationBlogFacade", function () {
    var testUser1
    var testBlog1

    beforeEach(async function () {
        testUser1 = new User(
            {
                firstName: "Jenne",
                lastName: "Teste",
                userName: "jenn",
                password: "1234",
                email: "jenn@",
            })
        await testUser1.save()

        testBlog1 = new LocationBlog({
            info: "Very Nice blog i wrote here",
            pos: { longitude: 22, latitude: 23 },
            author: testUser1
        })
        await testBlog1.save()
    })

    afterEach(async function () {
        await User.deleteMany({})
        await LocationBlog.deleteMany({})
    })

    it("should should add the locationblog", async function () {
        const blog = await blogFacade.addLocationBlog("Nice blog i wrote here", { longitude: 24, latitude: 23 }, testUser1)
        assert.equal(blog.author, testUser1)
    })


    it("should add the user to the liked list", async function () {
        const blog = await blogFacade.likeLocationBlog(testBlog1, testUser1)
        assert.ok(blog.likedBy[0].equals(testUser1))
    })

    it("should not be able to have the same user to like twice", async function () {
        const blog = await blogFacade.likeLocationBlog(testBlog1, testUser1)
        await blogFacade.likeLocationBlog(blog, testUser1)
        assert.equal(blog.likedByCount, 1) 
    })
})
```







