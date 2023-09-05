const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/team_pj', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('몽고디비에 연결되었습니다.');
  } catch (error) {
    console.error('몽고디비 연결 오류:', error);
  }
};

module.exports = connectDB;
