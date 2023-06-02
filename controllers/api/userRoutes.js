const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['password'] }
        })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'content',
                    ]
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'date_created'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                },
                {
                    model: Post,
                    attributes: ['title'],
                }
            ]
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


router.post('/', (req, res) => {

    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(userData => {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json(userData);
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/login', async (req, res) => {
    await User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'User does not exist!' });
                return;
            }
            console.log(userData.toJSON());
            const validPassword = userData.checkPassword(req.body.password);
            console.log(validPassword);
            if (!validPassword) {
                res.status(400).json({ message: 'Wrong Password! Try Again!' });
                return;
            }
            req.session.save(() => {

                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json({ user: userData, message: 'Successfully logged in!' });
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {

    User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'User does not exist!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            res.status(500).json(err);
        });

});

router.delete('/:id', (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'User does not exist!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;