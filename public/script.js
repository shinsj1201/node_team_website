// script.js

document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');
  
    commentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const nameInput = document.getElementById('name');
      const passwordInput = document.getElementById('password');
      const contentInput = document.getElementById('content-input');
  
      const name = nameInput.value;
      const content = contentInput.value;
      const personal_password = passwordInput.value;
  
      if (!name || !personal_password || !content) {
        alert('모든 필드를 입력해주세요.');
        return;
      }
  
      try {
        const response = await fetch('/api/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, comment: content, personal_password }),
        });
  
        if (response.status === 201) {
          nameInput.value = '';
          passwordInput.value = '';
          contentInput.value = '';
  
          fetchComments(); // 댓글 불러오기
        } else {
          alert('댓글 저장에 실패하였습니다.');
        }
      } catch (error) {
        console.error('댓글 등록 오류:', error);
      }
    });
  
    async function fetchComments() {
      try {
        const response = await fetch('/api/comment');
        const comments = await response.json();
  
        commentList.innerHTML = '';
  
        comments.forEach((comment) => {
          const commentEntry = document.createElement('div');
          commentEntry.classList.add('comment-entry');
          commentEntry.innerHTML = `
            <div class="comment-content">
              <p><strong>${comment.name}</strong>: ${comment.comment}</p>
            </div>
            <div class="comment-actions">
              <button class="edit-button">수정</button>
              <button class="delete-button">삭제</button>
            </div>`;
  
          commentList.appendChild(commentEntry);
        });
      } catch (error) {
        console.error('댓글 불러오기 오류:', error);
      }
    }
  
    fetchComments(); // 페이지 로드 시 댓글 불러오기
  });
  