const mongoose = require('mongoose');

// Định nghĩa schema cho người dùng
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Tạo model từ schema
const User = mongoose.model('User', userSchema);

// Xuất ra model để sử dụng trong các file khác
module.exports = User;
