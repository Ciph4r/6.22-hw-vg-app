const express = require('express')
const router = express.Router()
const controller = require('../controllers/controllers')
const passport = require('passport');


const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.send('You are not authorized to view this page');
    }
  };


router.get('/' , controller.index)
router.post('/register' , controller.signup)
router.get('/home' , auth ,controller.home)
router.get('/delete/:id' ,auth, controller.delete)
router.get('/game/:id' , controller.game)
router.post('/addgames' ,auth, controller.addGames)
router.get('/addtofav/:gameId' , controller.fav)



router.post('/login',
passport.authenticate('local-login', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
}))


// router.get('/logged' ,auth, controller.logged)
router.get('/logout' , controller.logout)




module.exports = router