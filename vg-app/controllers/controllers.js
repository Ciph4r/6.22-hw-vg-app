const bcrypt = require('bcryptjs');
const User = require('../routes/models/User')
const Game = require('../routes/models/games');
const { session } = require('passport');
require('dotenv').config()
const key = process.env.KEY


module.exports = {
    index: (req, res) => {
        res.render('main/index')
    },

    home: (req, res) => {
        Game.find().then((data) => {
            res.render('main/home', {
                data
            })
        })



    },

    signup: (req, res) => {
        User.findOne({
            email: req.body.email
        }).then((user) => {
            if (user) {
                req.flash('errors', 'Account exists')
                return res.redirect(301, '/')
            } else {
                const newUser = new User()
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(req.body.password, salt)

                newUser.name = req.body.name
                newUser.username = req.body.username
                newUser.email = req.body.email
                newUser.password = hash
                req.body.secret === process.env.ADMIN ? newUser.admin = true : newUser.admin = false

                newUser
                    .save()
                    .then((user) => {
                        req.login(user, (err) => {
                            if (err) {
                                res
                                    .status(500)
                                    .json({
                                        confirmation: false,
                                        message: 'Server Error'
                                    });
                            } else {
                                res.redirect('/home')
                            }
                        })
                    })
                    .catch((err) => console.log('Error here'))
            }
        })
    },

    delete: (req, res) => {
        Game.findByIdAndDelete(req.params.id).then(game => {
            res.redirect('/home')
        }).catch(err => {
            res.status(404).json({
                comfirmation: 'fail',
                message: 'server error'
            })
        })
    },

    game: (req, res) => {
        Game.findById(req.params.id).then(game => {
            res.render('main/game', {
                game
            })
        })
    },

    addGames: (req, res) => {
        const {
            title,
            description,
            yearreleased,
            playtime,
            image
        } = req.body


        if (req.body.title === "" || description === "" || yearreleased === "" || playtime === "") {
            req.flash('errors', 'MUST FILL ALL FIELD')
            return res.redirect('/home')

        }

        Game.findOne({
            title: req.body.title
        }).then((game) => {
            if (game) {
                req.flash('errors', 'Game exists')
                return res.redirect('/home')
            }

            let newGame = new Game({
                title,
                description,
                yearreleased,
                playtime,
                image
            })

            newGame.save().then((game) => {
                    req.flash('success', 'game created')
                    return res.redirect('/home')


                }).catch(err => res.json({
                    comformation: 'failed',
                    message: 'game not saved'
                }))
                .catch(err => {
                    res.status(500).json({
                        comfirmation: 'failed',
                        message: 'server error'
                    })
                })


        })


    },
    fav: (req,res) => {
        User.findById(req.user._id).then(currentUser => {
        //   const exist =  currentUser.favorite.filter(x => x === '5ef243828a3dd15d8cf5927a' )
        // //   console.log(exist)
        // //   console.log(currentUser.favorite)
            currentUser.favorite.push(req.params.gameId)
            currentUser.save()
            req.flash('success', `added to favorites`);
            return res.redirect('back')
        })
        
    },

    showFav: (req,res) => {
        User.findById(req.user._id).populate('favorite').exec((err , fav) =>{
            res.render('main/fav',{fav})
        })
    },

    login: (req, res) => {
        res.render('main/home')
    },

    logout: (req, res) => {
        req.logout();
        // req.sessions.destroy()
        req.flash('success', 'You are now logged out');
        return res.redirect('/')
    }


}