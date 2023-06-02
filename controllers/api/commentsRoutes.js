const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
    Comment.findAll({})
        .then(commentData => res.json(commentData))
        
});

router.get('/:id', (req, res) => {
    Comment.findAll({
            where: {
                    id: req.params.id
                   }
        })
        .then(commentData => res.json(commentData))
        
});

router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            })
            .then(commentData => res.json(commentData))
    
    }
});


router.put('/:id', withAuth, (req, res) => {
    Comment.update({
        comment_text: req.body.comment_text
        },{
        where: {
            id: req.params.id
            }
    }).then(commentData => {
        if (!commentData) {
            return res.status(404).json({ message: 'No comment found!' });
        }
        res.json(commentData);
    }).catch(err => {
        res.status(500).json(err);
    });
});


router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(commentData => {
        if (!commentData) {
            return res.status(404).json({ message: 'No comment found!' });
            
        }
        res.json(commentData);
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;