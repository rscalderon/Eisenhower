const mongoose = require('mongoose');
// init const Schema as Schema constructor
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task: { type: String, required: true },
  priority: { type: Number, required: true },
  // priority: { type: String, required: true },
});

// Export task module
module.exports = mongoose.model('task', taskSchema);
