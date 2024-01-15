class FeedBackView {
  parentElement = document.querySelector(".container");
  feedbackTitle = document.getElementById("feedbackTitle");
  feedbackCategory = document.getElementById("feedbackCategory");
  feedbackComment = document.getElementById("commentFeedback");
  btnaddFeedback = document.querySelector(".add-feedback");
  suggestionCont = document.querySelector(".suggestion__content");
  placeholder = document.querySelector(".current-feedback");

  //     id;
  //   title;
  //   category;
  //   upvotes;
  //   status;
  //   comments;
  //   description;
  constructor() {
    // atitle,
    // acategory,
    // upvotes = "no upvotes",
    // status,
    // acomments = "no comment yet"
    //   this.id = "001";
    //   this.comments = acomments;
    //   // this.category = acategory;
    //   this.status = status;
    //   // this.title = atitle;
    //   this.upvotes = upvotes;
  }
  render(newFeedback) {
    let code = `<div class="left">
       
              <a href="#"><btn class="pan"> ${newFeedback.upvotes} </btn></a>
            </div>
            <div class="right">
              <div class="header">
                <h2>${newFeedback.title}</h2>
              </div>
              <div class="content">
                <p>
                  ${newFeedback.description}
                </p>
               <a href="#"> <btn class="pan">${newFeedback.category}</btn></a>
              </div>
            </div>`;
    let newFeedBackHTML = document.createElement("a");
    newFeedBackHTML.innerHTML = code;
    newFeedBackHTML.href = "/src/feedback-detail.html";
    newFeedBackHTML.classList.add(
      "card--suggestion-content",
      "card",
      "feedback"
    );
    if (this.suggestionCont) this.suggestionCont.appendChild(newFeedBackHTML);
    if (this.placeholder) this.placeholder.appendChild(newFeedBackHTML);
  }
  get title() {
    if (this.feedbackTitle) return this.feedbackTitle.value;
  }
  get category() {
    if (this.feedbackCategory) return this.feedbackCategory.value;
  }
  get description() {
    if (this.feedbackComment) return this.feedbackComment.value;
  }

  Handler(func) {
    if (typeof func === "function" && this.btnaddFeedback) {
      this.btnaddFeedback.addEventListener("click", func.bind(this));
    }
  }
}
export default new FeedBackView();
