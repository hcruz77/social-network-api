const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThoughts(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  createThoughts(req, res) {
    Thought.create(req.body)
      .then((thoughts) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thoughts._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Created a thought 🚀')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThoughts(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThoughts(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought deleted!' })
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      //YOU WILL PASS FRIEND-ID INSTEAD OF REQ.BODY
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
 
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      // you will pull your friend id from friends instead of reactions
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
};
