const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  priority: { type: Number, required: true },
});

module.exports = mongoose.model('task', taskSchema);
