const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const save = async () => {
  const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
  console.log("save", hash);
};
save();

bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
  // Store hash in your password DB.
  console.log(hash);
});

const hash = "$3b$10$X52tQdIHLrZ2IomxjJnxVOvGdzrnbLruG3p2K6S4b/iKnDBdbGpqW";
bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
  // result == true
  console.log(result);
});

// var jwt = require("jsonwebtoken");
// var token = jwt.sign({ foo: "bar" }, "shhhhh", { expiresIn: "1m" });
// console.log(token);

// const old =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2OTYzODk4MDIsImV4cCI6MTY5NjM4OTg2Mn0.Zy1W_nDj4booPUHxirl6qh9h5xEbFNyN0JGZW_4EgdA";
// var decoded = jwt.verify(token, "shhhhh");
// console.log(decoded.foo); // bar

// try {
//   decoded = jwt.verify(token, "wrong-secret");
//   console.log("decoded???");
// } catch (err) {
//   // err
//   console.log("err", err);
// }
