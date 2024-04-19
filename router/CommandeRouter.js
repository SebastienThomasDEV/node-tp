const express = require('express');
// const cors = require('cors');
const router = express.Router();

router.get('/play/:choice', gameController.play);


module.exports = router;