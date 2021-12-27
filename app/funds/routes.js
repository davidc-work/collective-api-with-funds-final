const express = require('express')
const router = express.Router()
const db = require('../../lib/db')

function formatNumber(n, type) {
  if (!['dollars', 'percent'].includes(type)) return n;

  var str = n.toString().split('').filter(c => !isNaN(parseInt(c)) || c == '.').join('');
  str = parseFloat(str, 10).toFixed(2);
  if (str == 'NaN') str = '0.00';
  if (type == 'dollars') return '$' + str;
  return str + '%';
}

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
    "expenseRatio": formatNumber(req.body.expenseRatio, 'percent'),
    "price": formatNumber(req.body.price, 'dollars'),
    "priceChange": formatNumber(req.body.priceChange, 'dollars'),
    "ytd": formatNumber(req.body.ytd, 'percent'),
    "oneyr": formatNumber(req.body.oneyr, 'percent'),
    "fiveyr": formatNumber(req.body.fiveyr, 'percent'),
    "tenyr": formatNumber(req.body.tenyr, 'percent'),
    "sinceInception": formatNumber(req.body.sinceInception, 'percent')
  });
  res.json(newFund)
});

router.put('/funds/:id', (req, res) => {
  const updatedFund = db.funds.findByIdAndUpdate(req.params.id, {
    "name": req.body.name,
    "ticker": req.body.ticker,
    "assetClass": req.body.assetClass,
    "expenseRatio": formatNumber(req.body.expenseRatio, 'percent'),
    "price": formatNumber(req.body.price, 'dollars'),
    "priceChange": formatNumber(req.body.priceChange, 'dollars'),
    "ytd": formatNumber(req.body.ytd, 'percent'),
    "oneyr": formatNumber(req.body.oneyr, 'percent'),
    "fiveyr": formatNumber(req.body.fiveyr, 'percent'),
    "tenyr": formatNumber(req.body.tenyr, 'percent'),
    "sinceInception": formatNumber(req.body.sinceInception, 'percent')
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
