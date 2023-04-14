const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.KEY);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

/* app.post("/checkout", async (req, res) => {
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({ price: item.id, quantity: item.quantity });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ url: session.url });
}); */
app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  console.log(items);
  res.json({ msg: "recivido" });
});

app.listen(4000, () => console.log("Listen on port 4000"));
