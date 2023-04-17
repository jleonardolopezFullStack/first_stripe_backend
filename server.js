const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.KEY);
const port = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.post("/checkout", async (req, res) => {
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({ price: item.id, quantity: item.quantity });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url:
      /* "http://localhost:3000/success" ||  */ "https://coinmarketcap.com",
    cancel_url: /* "http://localhost:3000/cancel" || */ "https://platzi.com",
  });

  res.json({ url: session.url });
});
/* app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  console.log(items);
  res.json({ msg: "recibido" });
}); */
app.use("*", (req, res, next) => {
  res.status(404).json({ msg: "Page not found Daaaa" });
});

app.listen(port, () => console.log(`Listen on port ${port} `));
