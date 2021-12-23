const express = require('express')
const router = express.Router()
const db = require('../../lib/db')

router.get('/funds', (req, res) => {
  const funds = db.funds.findAll().slice(0).sort((a, b) => a.name > b.name ? 1 : 0)
  console.log("htting the funds route", funds[0]);
  res.json(funds)
})

router.get('/funds/:id', (req, res) => {
  const fund = db.funds.find(req.params.id)
  res.json(fund)
})

router.post('/funds', (req, res) => {
  const newFund = db.funds.insert({
    "name": req.body.name,
    "ticker": req.body.ticker,
    "assetClass": req.body.assetClass,
    "expenseRatio": req.body.expenseRatio,
    "price": req.body.price,
    "priceChange": req.body.priceChange,
    "ytd": req.body.ytd,
    "oneyr": req.body.oneyr,
    "fiveyr": req.body.fiveyr,
    "tenyr": req.body.tenyr,
    "sinceInception": req.body.sinceInception
  });
  res.json(newFund)
});

router.put('/funds/:id', (req, res) => {
  const updatedFund = db.funds.findByIdAndUpdate(req.params.id, {
    "name": req.body.name,
    "ticker": req.body.ticker,
    "assetClass": req.body.assetClass,
    "expenseRatio": req.body.expenseRatio,
    "price": req.body.price,
    "priceChange": req.body.priceChange,
    "ytd": req.body.ytd,
    "oneyr": req.body.oneyr,
    "fiveyr": req.body.fiveyr,
    "tenyr": req.body.tenyr,
    "sinceInception": req.body.sinceInception
  });
  res.json(updatedFund);
});

// router.patch('/books/cart/add/:id', function (req, res) {
//   const book = db.books.find(req.params.id)
//   book.inCart = true
//   res.json(book)
// })

// router.patch('/books/cart/remove/:id', function (req, res) {
//   const book = db.books.find(req.params.id)
//   book.inCart = false
//   res.json(book)
//})

router.patch('/funds/:id', (req, res) => {
   const fund = db.funds.findByIdAndUpdate(req.params.id, req.body)
   res.json(db.funds.findAll())
})

router.delete('/funds/:id', (req, res) => {
  let selectedFund = db.funds.find(req.params.id)
  db.funds.delete(req.params.id)
  res.json(selectedFund)

})



module.exports = router
