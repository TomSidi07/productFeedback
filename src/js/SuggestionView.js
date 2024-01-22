class SuuggestionView {
  main = document.querySelector(".suggestion");
  suggestionCont = document.querySelector(".suggestion__content");
  btn__addFeedback = document.querySelector(".btn--add-feedback");
  btnCancel = document.querySelector(".btn--cancel");
  btnaddFeedback = document.querySelector(".add-feedback");
  collapse = document.querySelector(".collapseContainer");
  collapseHeader = document.querySelector(".collappseHeader");
  collapseContent = document.querySelector(".collapseContent");
  listItems = document.querySelectorAll(".sortItemBtn");
  activeSort = document.querySelector(".active-sort");
  upvotesBtns = document.querySelectorAll(".pan.uvoptes");
  IdCount;
  popup = document.querySelector(".popup");
  categories = document.querySelectorAll(".btn--cat");
  status = document.querySelectorAll(".btn--stat");
  suggestionSort = document.getElementById("suggestionSort");
  addFeedback = document.querySelector(".add-feedback");
  clickables = document.querySelectorAll("a");
  inputControl = document.querySelector(".input-control");
  submitBtn = document.querySelector(".btn--submit-comment");

  feedBacks = document.querySelectorAll(".card");
  btnCancel = document.querySelector(".btn--cancel");
  btnHamberger = document.querySelector(".btn--hamberger");
  navBottom = document.querySelector(".nav-bottom");
  editBtn = document.getElementById("btnEdit");
  editEnv = document.getElementById("editEnv");
  saveChangesBtn = document.getElementById("saveChanges");
  newTitle = document.getElementById("newTitle");
  newCategory = document.getElementById("newCategory");
  newStatus = document.getElementById("newStatus");
  suggestionTotal = document.querySelector(".suggestion-total ");
  commentContainer = document.querySelector(".feedback-details___content");
  commentCount = document.querySelector(".comment-count");
  currentUser = new user(
    "/src/assets/user-images/image-elijah.jpg",
    "Tom",
    "tomsidi07"
  );
  constructor() {
    if (this.btnCancel)
      this.btnCancel.addEventListener("click", () => {
        console.log("Esprit tranquille");
      });
    let UpdatedCollection = [];
    for (let i = 0; i < localStorage.length; i++) {
      let feedFromLS = JSON.parse(localStorage.getItem(i));
      if (feedFromLS != null) UpdatedCollection.push(feedFromLS);
    }
    if (this.editBtn)
      this.editBtn.addEventListener("click", () => {
        let currentObj = this.getCurrentObj();
        console.log(currentObj);
        this.newTitle.value = currentObj.title;
        this.newStatus.value = currentObj.status;
        this.newCategory.value = currentObj.category;
        this.saveChangesBtn.addEventListener("click", (eve) => {
          eve.preventDefault();
          currentObj.title = this.newTitle.value;
          currentObj.category = this.newCategory.value;
          currentObj.status = this.newStatus.value;
          this.saveChange(currentObj);
          console.log(currentObj);
        });
      });
    if (this.collapse)
      this.collapseHeader.addEventListener("click", (eve) => {
        eve.preventDefault();
        console.log("collapse");
        this.collapse.classList.toggle("active");
      });
    if (this.listItems) {
      this.listItems.forEach((el) => {
        el.addEventListener("click", (eve) => {
          eve.preventDefault();
          this.listItems.forEach((el) => {
            el.classList.remove("active");
            eve.target.classList.add("active");
          });
          let value = eve.target.getAttribute("data-value");
          this.activeSort.textContent = eve.target.textContent;
          console.dir(eve.target);
          this.filterSort(UpdatedCollection, value);
        });
      });
    }
    if (this.btnHamberger)
      this.btnHamberger.addEventListener("click", (eve) => {
        eve.preventDefault();
        this.btnHamberger.classList.toggle("active");
        this.navBottom.classList.toggle("active");
      });
    if (this.submitBtn)
      this.submitBtn.addEventListener("click", (eve) => {
        // eve.preventDefault();
        let CureentFeedback = JSON.parse(
          localStorage.getItem("currentObj") || "{}"
        );
        this.addNewComment(CureentFeedback);
        // this.showCurrentComments();
        console.log("SUBMIT COMMENT");
      });
    // console.log(this.getCurrentObj());
    // console.log(this.btnCancel);
  }

  setCurrent(feedbacks, collection) {
    feedbacks.forEach((feedback) => {
      feedback.addEventListener("click", (eve) => {
        // eve.preventDefault();
        console.log(feedback);
        localStorage.setItem("current", feedback.innerHTML);
        let currentTitle =
          feedback.children[1].children[0].children[0].textContent;
        console.dir(currentTitle);
        console.log(this.setCurrentObj(collection, currentTitle));
      });
    });
  }
  setCurrentRoadMap(feedbacks, collection) {
    feedbacks.forEach((feedback) => {
      feedback.addEventListener("click", (eve) => {
        // eve.preventDefault();
        console.log(feedback);
        localStorage.setItem("current", feedback.innerHTML);
        let currentTitle =
          feedback.children[0].children[0].textContent;
        console.dir(currentTitle);
        console.log(this.setCurrentObj(collection, currentTitle));
      });
    });
  }
  // Set the current obeject from collection
  setCurrentObj(collection, title) {
    const result = collection.filter(
      (feedback) => feedback != null && feedback.title == title
    );
    localStorage.setItem("currentObj", JSON.stringify(result[0]));
    return result[0];
  }
  getCurrentObj() {
    let currentObj = JSON.parse(localStorage.getItem("currentObj") || "{}");
    // console.log(currentObj);
    return currentObj;
  }
  saveChange(Obj) {
    return localStorage.setItem(Obj.id, JSON.stringify(Obj));
  }
  Handler(func) {
    if (typeof func === "function" && this.btnaddFeedback) {
      this.btnaddFeedback.addEventListener("click", func.bind(this));
    }
  }

  upDateUI(collection) {
    if (this.suggestionCont) this.suggestionCont.innerHTML = "";
    collection.forEach((data) => {
      let comment = data.comments || 0;
      let commentsLength = comment.length;
      let suggestion__card__code = `
            <div class="left">
              <a href="#"><btn class="pan uvoptes">${data.upvotes}</btn></a>
            </div>
            <div class="right">
              <div class="header">
                <h2>${data.title}</h2>
              </div>
              <div class="content">
                <p>
                  ${data.description}
                </p>
               <a href="#"> <btn class="pan">${data.category}</btn></a>
              </div>
              </div>
              <div class="card--comment">
                <a href="/src/feedback-detail.html" class="comment--pan">
                <svg class="icon">
                  <use
                    xlink:href="/src/assets/shared/sprite.svg#icon-comments"
                  ></use>
                </svg>
                <span class="comment__pan__counter">${
                  commentsLength || 0
                }</span>
                
              </a>
            </div>`;
      let suggestionHtml = document.createElement("a");
      suggestionHtml.href = "/src/feedback-detail.html";
      suggestionHtml.innerHTML = suggestion__card__code;
      suggestionHtml.classList.add(
        "card--suggestion-content",
        "card",
        "feedback"
      );
      if (this.suggestionCont) this.suggestionCont.appendChild(suggestionHtml);
      // console.log(data.productRequests[0]);
    });
  }
  // Display comments on UI
  showCurrentComments() {
    let CureentFeedback = JSON.parse(
      localStorage.getItem("currentObj") || "{}"
    );
    console.log(CureentFeedback);
    if (!CureentFeedback.comments) {
      console.log("no comment yet");
      return;
    } else {
      console.log(CureentFeedback.comments);
      CureentFeedback.comments.forEach((comment) => {
        let commentCode = this.commentCodeGenerator(comment);
        if (this.commentContainer) {
          this.commentCount.textContent = CureentFeedback.comments.length;
          let commentHTML = document.createElement("div");
          commentHTML.innerHTML = commentCode;
          commentHTML.classList.add(
            "card",
            "card--suggestion-content",
            "current-feedback__comment"
          );
          this.commentContainer.append(commentHTML);
        }
      });
    }
  }
  addNewComment(feedBack) {
    let newComment = new comment(
      feedBack.comments.length + 1,
      this.inputControl.value,
      this.currentUser
    );
    // newComment.reliedFeedback = feedBack;
    console.log(newComment);
    feedBack.comments.push(newComment);
    console.log(feedBack);
    localStorage.setItem(feedBack.id, JSON.stringify(feedBack));
    localStorage.setItem("currentObj", JSON.stringify(feedBack));
  }
  //Generate code for each comment
  commentCodeGenerator(comment) {
    return `
     
      <div href="#" class="card card--suggestion-content current-feedback__comment">
        <div class="left">
          <img class="user-profil" src="${
            comment.user.image || this.currentUser.image
          }"/>
        </div>
        <div class="right">
          <header class="comment__header">
            <span class="user-infos">
              <h3 class="user-name">${comment.user.name}</h3>
              <p class="user-pseudo">@${comment.user.username}</p>
            </span>
            <a href="" class="btn btn--reply">Reply</a>
          </header>
          <div class="comment__content">
           ${comment.content}
          </div>
        </div>
      </div>`;
  }

  renderByStatus(collection, status) {
    let filterArr = [];
    if (Array.isArray(collection)) {
      filterArr = collection.filter((feedback) => {
        return feedback != null && feedback.status == status;
      });
    }
    // cleanSuggestCont();
    console.log(filterArr);
    return filterArr;
  }
  sort(collection) {
    if (this.suggestionSort)
      this.suggestionSort.addEventListener("change", (eve) => {
        console.log(this.suggestionSort.value);
        this.filterSort(collection, this.suggestionSort.value);
      });
  }
  filterSort(collection, value) {
    this.suggestionCont.innerHTML = "";
    let mostCommented = collection
      .filter((feedback) => {
        return feedback != null;
      })
      .sort((a, b) => {
        const A = a.comments ? a.comments.length : 0;
        const B = b.comments ? b.comments.length : 0;
        return B - A;
      });
    let leastCommented = collection
      .filter((feedback) => {
        return feedback != null;
      })
      .sort((a, b) => {
        const A = a.comments ? a.comments.length : 0;
        const B = b.comments ? b.comments.length : 0;
        return A - B;
      });

    let mostUpvoted = collection
      .filter((feedback) => {
        return feedback.upvotes;
      })
      .sort((a, b) => {
        return b.upvotes - a.upvotes;
      });
    let leastUpvoted = collection
      .filter((feedback) => {
        return feedback.upvotes;
      })
      .sort((a, b) => {
        return a.upvotes - b.upvotes;
      });
    if (value == "mostcomment") {
      console.log(mostCommented);
      this.upDateUI(mostCommented);
    }
    if (value == "leastcomment") {
      console.log(leastCommented);
      this.upDateUI(leastCommented);
    }
    if (value == "mostupvote") {
      console.log(mostUpvoted);
      this.upDateUI(mostUpvoted);
    }
    if (value == "leastupvote") {
      console.log(leastUpvoted);
      this.upDateUI(leastUpvoted);
    }
  }
  filterFeeds(collection, value) {
    this.suggestionCont.innerHTML = "";
    let fiteredArr = collection.filter((feedback) => {
      return (
        feedback.status === value.toLowerCase() ||
        feedback.category === value.toLowerCase()
      );
    });
    console.log(fiteredArr);
    this.upDateUI(fiteredArr);
  }
  cleanSuggestCont() {
    (suggestionCont || "").innerHTML = "";
  }
  invokeCollection() {
    return this.getFromLs("collection");
  }
  getFromLs(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  }
}
class comment {
  constructor(id, content, user) {
    this.id = id;
    this.content = content;
    this.user = user;
    this.reply = [];
    // this.reliedFeedback = undefined;
  }
}

class user {
  constructor(image, name, username) {
    this.image = image;
    this.name = name;
    this.username = username;
  }
}
export default new SuuggestionView();
