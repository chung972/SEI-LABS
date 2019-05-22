var express = require('express');
var router = express.Router();
var moviesApiCtrl = require('../controllers/api/movies');

router.get('/movies', moviesApiCtrl.getAllMovies);
router.get('/movies/:id', moviesApiCtrl.getOneMovie);
router.post('/movies', moviesApiCtrl.createMovie);
router.delete('/movies/:id', moviesApiCtrl.deleteMovie);
router.put('/movies/:id', moviesApiCtrl.updateMovie);

module.exports = router;