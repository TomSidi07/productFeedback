class DetailView {
  form = document.querySelector(".feedBack-detail-form");
  submitBtn = document.querySelector(".btn--submit-comment");
  placeholder = document.querySelector(".current-feedback");
  commentContainer = document.querySelector(".feedback-details___content");
  commentCount = document.querySelector(".comment-count");
  inputControl = document.querySelector(".input-control");
  btnCancel = document.querySelector(".btn--cancel");
  comment__Char__count = document.querySelector(".comment__Char-count");
  editBtn = document.getElementById("btnEdit");
  editEnv = document.getElementById("editEnv");
  collectionC = [];
  currentUser = new user(
    "/src/assets/user-images/image-elijah.jpg",
    "Tom",
    "tomsidi07"
  );
  constructor() {
    if (this.inputControl && this.comment__Char__count)
      this.inputControl.addEventListener("keypress", (eve) => {
        let counter = 225 - this.inputControl.value.length;
        this.comment__Char__count.innerHTML = counter;
        if (counter === 0) {
          eve.preventDefault();
          return "You cannot type any letter again !";
        }
      });
    if (this.editBtn) {
      this.editBtn.addEventListener("click", (eve) => {
        eve.preventDefault();
        console.log("Edit Mode");
        this.showEditMode();
        this.btnCancel.addEventListener("click", () => {
          this.editEnv.classList.remove("active");
        });
      });
    }
    
  }

  showEditMode() {
    this.editEnv.classList.toggle("active");
  }
  render() {
    if (this.placeholder) {
      this.placeholder.innerHTML = localStorage.getItem("current");
      this.placeholder.classList.add("card--suggestion-content", "card");
    }
  }

  generateComment(feedback) {
    let newCommentVal = new comment(
      feedback.comments.length++,
      this.commentInput.value,
      this.currentUser
    );
    newCommentVal.reliedFeedback = JSON.parse(
      localStorage.getItem("currentObj")
    ).id;
    // add the comment to locale Storage
    this.setComment(newCommentVal);
    //set current comment to relied feedback
    this.setCurrentComment(newCommentVal);
    // Update ui on submit
    this.updateCommentOnSubmit(newCommentVal);
    console.log(newCommentVal);
  }
  adjustComment() {
    if (this.commentContainer)
      this.getComment().forEach((el) => {
        let newComment = document.createElement("div");
        newComment.classList.add(
          "card",
          "card--suggestion-content",
          "current-feedback__comment"
        );
        newComment.innerHTML = this.addHtml(el);
        this.commentContainer.append(newComment);
      });
    // console.log("submit");
  }
  cleanCurrentComment() {
    return setTimeout(() => {
      console.log("local storage comment cleaned");

      return localStorage.removeItem("comment");
    }, 3000);
  }
  getComment() {
    return JSON.parse(localStorage.getItem("comment") || "[]");
  }
  setComment(comment) {
    let commentArray = this.getComment();
    if (Array.isArray(commentArray)) {
      commentArray.push(comment);
      return localStorage.setItem("comment", JSON.stringify(commentArray));
    }
  }
  setCurrentComment() {
    let currentObj = JSON.parse(localStorage.getItem("currentObj"));
    let currentComment = JSON.parse(localStorage.getItem("comment"));
    if (currentObj.comments) {
      currentObj.comments.push(...currentComment);
    }
    if (!currentObj.comments) {
      currentObj.comments = [];
      currentObj.comments.push(currentComment);
    }

    return localStorage.setItem(currentObj.id, JSON.stringify(currentObj));
  }
  getCommentReply(comment) {
    console.log(comment.reply || "no reply yet !");
  }
}
class comment {
  constructor(id, content, user, reliedFeedback) {
    this.id = id;
    this.content = content;
    this.user = user;
    this.reliedFeedback = reliedFeedback;
    this.reply = [];
  }
}

class user {
  constructor(image, name, username) {
    this.image = image;
    this.name = name;
    this.username = username;
  }
}
export default new DetailView();
