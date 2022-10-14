const { Schema, model } = require('mongoose');
const reaction = require('./Reaction');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      // required: true,
      // default: Date.now,
    },
    username: {
      type: String,
      required: true,
      default: 'Anonymous'
    },
   
   reactions: [reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
