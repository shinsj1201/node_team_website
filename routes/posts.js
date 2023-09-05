const express = require('express');
const router = express.Router();

const result_team = {
  team_learn: '팀게시글 [프리코스를 통해 배운 것들] 값',
  team_promise: '팀게시글 [우리팀의 약속] 값',
  
};

const result_person = {
  postId1: {
    person1: '원하는 개발자상',
    person2: '개인에 대한 설명및 mbti',
    person3: '자신의 장점/아쉬운점',
    person4: '블로그 주소',
  },
  postId2: {
    person1: '원하는 개발자상',
    person2: '개인에 대한 설명및 mbti',
    person3: '자신의 장점/아쉬운점',
    person4: '블로그 주소',
  },
  postId3: {
    person1: '원하는 개발자상',
    person2: '개인에 대한 설명및 mbti',
    person3: '자신의 장점/아쉬운점',
    person4: '블로그 주소',
  },
  postId4: {
    person1: '원하는 개발자상',
    person2: '개인에 대한 설명및 mbti',
    person3: '자신의 장점/아쉬운점',
    person4: '블로그 주소',
  },
  
};

router.get('/:teamId', (req, res) => {
  const { teamId } = req.params;
  console.log("aaa")
  if (result_team[teamId]) {
    res.send(result_team[teamId]);
  } else {
    res.status(404).send('해당 팀게시글에 대한 결과 값이 없습니다.');
  }
});

router.get('/:postId/:personId', (req, res) => {
  const { postId, personId } = req.params;
  const postIdString = `postId${postId}`;

  if (result_person[postIdString] && result_person[postIdString][personId]) {
    res.send(result_person[postIdString][personId]);
  } else {
    res.status(404).send('해당 postId 또는 personId에 대한 결과 값이 없습니다.');
  }
});

module.exports = router;
