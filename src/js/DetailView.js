// import createFeedbackView from "./createFeedbackView";
class DetailView {
  form = document.querySelector(".feedBack-detail-form");
  submitBtn = document.querySelector(".btn--submit-comment");
  placeholder = document.querySelector(".current-feedback");
  commentContainer = document.querySelector(".feedback-details___content");
  commentCount = document.querySelector(".comment-count");
  inputControl = document.querySelector(".input-control");
  comment__Char__count = document.querySelector(".comment__Char-count");
  currentUser = new user(
    "/src/assets/user-images/image-elijah.jpg",
    "Tom",
    "tomsidi07"
  );
  constructor() {}
  render() {
    if (this.placeholder) {
      this.placeholder.innerHTML = localStorage.getItem("current");
      this.placeholder.classList.add("card--suggestion-content", "card");
    }
  }
  updateComment(collection) {
    if (localStorage.getItem("current")) {
      let { currentFeedbackCode } = localStorage.getItem("current");
      console.log(currentFeedbackCode)
      let currentString = localStorage
        .getItem("current")
        .match(/h2>.+/gi)[0]
        .replace("h2>", "")
        .replace("</h2>")
        .replace("undefined", "");
      collection.forEach((feedback) => {
        if (feedback.title == currentString && feedback.comments) {
          // console.log(feedback.comments);
          if (Array.isArray(feedback.comments))
            feedback.comments.forEach((comment) => {
              if (
                this.commentContainer &&
                feedback.comments &&
                this.commentCount
              ) {
                this.commentCount.textContent = feedback.comments.length;
                let commentHTML = document.createElement("div");
                commentHTML.classList.add(
                  "card",
                  "card--suggestion-content",
                  "current-feedback__comment"
                );
                this.commentContainer.append(commentHTML);
                commentHTML.innerHTML = this.addHtml(comment);
                console.log(commentHTML);
              }
            });
        }
      });
    }
  }
  addHtml(feedBackComment) {
    return `
     
      <div href="#" class="card card--suggestion-content current-feedback__comment">
        <div class="left">
          <img class="user-profil" src="${feedBackComment.user.image}"/>
        </div>
        <div class="right">
          <header class="comment__header">
            <span class="user-infos">
              <h3 class="user-name">${feedBackComment.user.name}</h3>
              <p class="user-pseudo">@${feedBackComment.user.username}</p>
            </span>
            <a href="" class="btn btn--reply">Reply</a>
          </header>
          <div class="comment__content">
           ${feedBackComment.content}
          </div>
        </div>
      </div>`;
  }
  adjustComment() {
    if (this.inputControl && this.comment__Char__count)
      this.inputControl.addEventListener("keypress", (eve) => {
        let counter = 225 - this.inputControl.value.length;
        this.comment__Char__count.innerHTML = counter;
        if (counter === 0) {
          eve.preventDefault();
          return "You cannot type any letter again !";
        }
      });
    if (this.submitBtn)
      this.submitBtn.addEventListener("click", (eve) => {
        eve.preventDefault();
        let newCommentVal = new comment(1, "test", this.currentUser);
        this.setComment(newCommentVal);

        // commentObj.content = this.inputControl.value;
        // console.log(commentObj);
      });
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
}
class comment {
  constructor(id, content, user) {
    this.id = id;
    this.content = content;
    this.user = user;
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