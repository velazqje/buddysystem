import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import asyncHandler from "express-async-handler";

const PORT = process.env.PORT;
const app = express();

app.use(express.static("public"));
// Note: Don't add or change anything above this line.

/* Add your code below this line. It will:
   Define variables for the middleware counting.
   Count the calls.
   Get the random person data.
   Respond using an error handler middleware function when it doesn't work.
*/

const reportWhenTen = 10;
let serverCallCount = 0;

// uses data calls to increment and report the count at intervals of 10
app.use("/random-person", (req, res, next) => {
  serverCallCount += 1;

  if (serverCallCount % reportWhenTen === 0) {
    console.log(`Total server requests for random-person: ${serverCallCount}. Note
    this does not include entries submitted through the browser.`);
  }
  next();
});

// gets data by awaiting and fetching from an external API url
app.get(
  "/random-person",
  asyncHandler(async (req, res) => {
    // fetch() starts a request and returns a promise
    // await simplifies work with promises
    const response = await fetch("https://randomuser.me/api/");
    // when request completes, promise is resolved with response
    const data = await response.json();
    res.send(data);
  })
);

app.use((err, req, res, next) => {
  console.log(`Unhandled error ${err}.`);
});

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
