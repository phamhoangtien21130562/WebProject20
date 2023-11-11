document.addEventListener("DOMContentLoaded", function () {
    const commentInput = document.querySelector("textarea[name='comment']");
    const nameInput = document.querySelector("input[name='name']");
    const commentsList = document.getElementById("comments");
    const addCommentButton = document.getElementById("submit-comment");
    const ratingOptions = document.querySelectorAll("input[name='rating']");
  
    addCommentButton.addEventListener("click", function () {
      const commentText = commentInput.value;
      const userName = nameInput.value;
      let rating = "";
  
      for (const option of ratingOptions) {
        if (option.checked) {
          rating = option.value;
          break;
        }
      }
  
      if (commentText.trim() !== "" && userName.trim() !== "" && rating !== "") {
        const newComment = document.createElement("li");
        newComment.innerHTML = `
          <div class="name">${userName}:</div>
          <div class="rating">Đánh giá sản phẩm: ${rating}</div>
          <div class="comment">${commentText}</div>
        `;
        commentsList.appendChild(newComment);
        commentInput.value = "";
        nameInput.value = "";
        ratingOptions[0].checked = true;
      }
    });
  });
  