const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use("/image", express.static(path.join(__dirname, "image")));
app.use(
  session({
    secret: "keyboard cat",
  })
);

const products = [
  {
    id: 1,
    name: "Macbook Air M1",
    image: "/image/air.png",
    price: 899,
    description:
      "MacBook Air with M1 is an incredibly portable laptop — it's nimble and quick, with a silent, fanless design and a beautiful Retina display.",
  },
  {
    id: 2,
    name: "Macbook Air M2",
    image: "/image/air.png",
    price: 1099,
    description:
      "MacBook Air — supercharged by the M2 chip — features all-day battery life and an all-new design with 13.6” Liquid Retina display and 1080p HD camera.",
  },
  {
    id: 3,
    name: "Macbook Pro M1",
    image: "/image/pro.png",
    price: 1299,
    description:
      "MacBook Pro with the incredibly powerful M1 Pro or M1 Max chip. Amazing battery life. And a brilliant Liquid Retina XDR display.",
  },
  {
    id: 4,
    name: "Macbook Max",
    image: "/image/pro.png",
    price: 1499,
    description:
      "MacBook Pro with the incredibly powerful M1 Pro or M1 Max chip. Amazing battery life. And a brilliant Liquid Retina XDR display.",
  },
];

function addItemToCartSession(session, product) {
  if (!product) return;
  if (!session.cart) session.cart = {};
  const { cart } = session;
  const productLine = cart[product.name];
  if (productLine) {
    productLine.quantity++;
    return;
  }
  cart[product.name] = {
    ...product,
    quantity: 1,
  };
}

app.get("/", (req, res) => {
  return res.render("shop", {
    products,
    productLines: Object.values(req.session.cart || {}),
  });
});
app.get("/detail", (req, res) => {
  return res.render("product", {
    productLines: Object.values(req.session.cart || {}),
    product: products.find((p) => p.id === parseInt(req.query.id)),
  });
});
app.post("/addToCart", (req, res) => {
  const { name, price } = req.body;
  const product = products.find(
    (p) => p.name === name && p.price === parseInt(price)
  );
  addItemToCartSession(req.session, product);
  return res.redirect("/cart");
});
app.get("/cart", (req, res) => {
  return res.render("shoppingcart", {
    productLines: Object.values(req.session.cart || {}),
  });
});

app.listen(3000, () => console.log("Server started"));
