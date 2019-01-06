const router = require('express').Router()
const ShowCast = require('../models/showcast')

router.get('/', (req, res, next) => {
    res.render('index')
})
 
router.get('/showcast/:page', (req, res, next) => {
    const perPage = 9
    let page = req.params.page || 1

    res.header("Content-Type", 'application/json');
    ShowCast
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, item) => {
            ShowCast.countDocuments().exec((err, count) => {
                console.log(count);
                if (err) return next(err)
                res.end(JSON.stringify(item, null, 3));
            })
        })
})

router.get('/search/:search', (req, res, next) => {
    const perPage = 9
    let page = req.params.page || 1
    let search = req.params.search || 'Dude'

    res.header("Content-Type", 'application/json');
    ShowCast
        .find({ name: new RegExp(search, "i") })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, item) => {
            ShowCast.countDocuments().exec((err, count) => {
                console.log(count);
                if (err) return next(err)
                res.end(JSON.stringify(item, null, 3));
            })
        })
})
module.exports = router