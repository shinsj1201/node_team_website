

const express = require('express');
const router = express.Router();
const Comment = require('../schemas/comment');


router.post('/', async (req, res) => {
  const { name, comment, personal_password } = req.body;

  try {
    const newComment = new Comment({ name, comment, personal_password });
    await newComment.save();
    res.status(201).send('댓글이 성공적으로 저장되었습니다.');
  } catch (error) {
    console.error('댓글 저장 오류:', error);
    res.status(500).send('댓글 저장에 실패하였습니다.');
  }
});


router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    console.error('댓글 조회 오류:', error);
    res.status(500).send('댓글 조회에 실패하였습니다.');
  }
});



router.delete('/api/comment/:id', async (req, res) => {
  console.log("aaaaaaaaaaaaaaaaaa");
  const commentId = req.params.id;

  try {
    // 댓글이 존재하는지 확인
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    // 댓글 삭제
    const deletedComment = await Comment.findOneAndDelete({ _id: commentId, personal_password: req.body.personal_password });
    if (!deletedComment) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    return res.status(200).json({ message: '댓글이 삭제되었습니다.' });
  } catch (error) {
    console.error('댓글 삭제 오류:', error);
    return res.status(500).json({ message: '댓글 삭제에 실패하였습니다.' });
  }
});

// 댓글 수정
router.put('/api/comment/:id', async (req, res) => {
  const commentId = req.params.id;
  const { comment, personal_password } = req.body;

  try {
    // 해당 ID를 가진 댓글을 찾아서 수정
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: commentId, personal_password },
      { comment },
      { new: true } // 수정된 댓글 반환
    );

    if (!updatedComment) {
      return res.status(404).json({ error: '댓글을 찾을 수 없습니다.' });
    }

    return res.status(200).json({ message: '댓글이 수정되었습니다.', updatedComment });
  } catch (error) {
    console.error('댓글 수정 오류:', error);
    return res.status(500).json({ error: '댓글 수정에 실패하였습니다.' });
  }
});


module.exports = router;
