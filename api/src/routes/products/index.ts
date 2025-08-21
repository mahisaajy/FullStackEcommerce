import {Router} from 'express';

const router = Router();

// products endpoints
router.get('/', (req, res) => {
    res.send('the list of producsts');
});

router.get('/:id', (req, res) => {
    console.log(req.params);
    res.send('A Products');
})

router.post('/', (req, res) => {
    res.send('New product created');
});

export default router;