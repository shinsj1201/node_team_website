const mongoose = require('mongoose');

// 댓글 스키마 정의
const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  personal_password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

// Comment 모델 생성
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
