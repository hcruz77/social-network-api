const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(createThoughts);


router.route('/:thoughtId').get(getSingleThoughts).put(updateThoughts).delete(deleteThoughts);
  
router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
