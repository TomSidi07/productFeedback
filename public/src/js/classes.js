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
  updateComment(collection) {
    if (localStorage.getItem("current")) {
      let { currentFeedbackCode } = localStorage.getItem("current");
      // console.log(currentFeedbackCode);
      let currentString = localStorage
        .getItem("current")
        .match(/h2>.+/gi)[0]
        .replace("h2>", "")
        .replace("</h2>")
        .replace("undefined", "")
        .replace("&amp;", "");
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
                // console.log(commentHTML);
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
        // eve.preventDefault();
        let newCommentVal = new comment(
          1,
          this.inputControl.value,
          this.currentUser
        );
        this.setComment(newCommentVal);
        this.setCurrentComment();
        this.cleanCurrentComment();
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
  cleanCurrentComment() {
    console.log("comment cleaned");
    return localStorage.removeItem("comment");
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

class FeedBackView {
  parentElement = document.querySelector(".container");
  feedbackTitle = document.getElementById("feedbackTitle");
  feedbackCategory = document.getElementById("feedbackCategory");
  feedbackComment = document.getElementById("commentFeedback");
  btnaddFeedback = document.querySelector(".add-feedback");
  suggestionCont = document.querySelector(".suggestion__content");
  placeholder = document.querySelector(".current-feedback");

  render(newFeedback) {
    let comments = newFeedback.comments || 0;
    let commentsLength = comments.length;
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
              <div class="card--comment">
    <div class="comment--pan">
    <svg class="icon">
      <use
        xlink:href="/src/assets/shared/sprite.svg#icon-comments"
      ></use>
    </svg>
    <span class="comment__pan__counter">${commentsLength || 0}</span>
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
class RoadmapView {
  roadmap = document.querySelector(".roadmap");
  blocContainer = document.querySelector(".roadmap__content__container");
  totalPlanned = document.querySelector(".total--planned");
  totalInProgress = document.querySelector(".total--inprogress");
  totalLive = document.querySelector(".total--live");
  progressBloc = document.querySelector(
    ".inprogress-bloc .roadmap__bloc__content"
  );
  plannedBloc = document.querySelector(".planned-bloc .roadmap__bloc__content");
  liveBloc = document.querySelector(".live-bloc .roadmap__bloc__content");
  collection;
  constructor() {
    this.renderByStatus();
    this.collection = this.getRoadMaps();
    let lives = this.renderByStatus(this.collection, "live");
    let planned = this.renderByStatus(this.collection, "planned");
    let inprogress = this.renderByStatus(this.collection, "in-progress");
    // console.log(lives);
    localStorage.setItem("live", JSON.stringify(lives));
    localStorage.setItem("planned", JSON.stringify(planned));
    localStorage.setItem("in-progress", JSON.stringify(inprogress));
    // console.log(this.collection);
    if (this.totalPlanned || this.totalLive || this.totalInProgress) {
      this.getTotaleCount("planned", this.totalPlanned);
      this.getTotaleCount("live", this.totalLive);
      this.getTotaleCount("in-progress", this.totalInProgress);
    }

    // this.HTMLpusher(this.plannedBloc,this.generator());
    if (this.plannedBloc)
      this.pushAll(planned, this.plannedBloc, "card--planned");
    if (this.progressBloc)
      this.pushAll(inprogress, this.progressBloc, "card--inprogress");
    if (this.liveBloc) this.pushAll(lives, this.liveBloc, "card--live");
  }
  pushAll(collection, Destination, feedclass) {
    this.cleanBlock(Destination);
    console.log(Destination);
    collection.forEach((feedback) => {
      // return this.HTMLpusher(
      //   Destination,
      //   this.addStatusStyle(this.generator(feedback), feedClass)
      // );
      let feed = this.generator(feedback);
      this.HTMLpusher(Destination, feed);
      this.addStatusStyle(feed, feedclass);
    });
  }
  getRoadMaps() {
    let result = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (JSON.parse(localStorage.getItem(i)))
        result.push(JSON.parse(localStorage.getItem(i)));
    }
    return result;
  }
  getTotaleCount(status, HTMLElement) {
    if (HTMLElement)
      return (HTMLElement.innerHTML = JSON.parse(
        localStorage.getItem(status)
      ).length);
  }

  HTMLpusher(Destination, element) {
    if (Destination && element)
      // console.log("HTMLpusher");
      return Destination.append(element);
  }
  generator(feedbackObject) {
    if (!feedbackObject) return;
    let code = `
    <div class="header">
        <h2 class="feedback-title">${feedbackObject.title}</h2>
        <p class="feedBack-descripcrition">
        ${feedbackObject.description}</p>
        <div class="pan">${feedbackObject.category}</div>
    </div>
    <div class="content">
        <div class="pan uvoptes">${feedbackObject.upvotes}</div>
        <div class="comment--pan">
        <img src="/src/assets/shared/icon-comments.svg"/>
        <span class="comment__pan__counter">${
          feedbackObject.comments ? feedbackObject.comments.length : 0
        }</span>
    </div>
    </div>`;
    let card = document.createElement("a");
    card.href = "/src/feedback-detail.html";

    card.classList.add("card", "card--roadmap");
    card.innerHTML = code;
    // console.log(card);
    return card;
  }
  cleanBlock(bloc) {
    return (bloc.innerHTML = "");
  }
  addStatusStyle(card, feedclass) {
    if (card) return card.classList.add(feedclass);
  }

  // makeInprogress(card) {
  //   return card.classList.add("card--progress");
  // }
  // makeLive(card) {
  //   return card.classList.add("card--Live");
  // }
  renderByStatus(collection, status) {
    let filterArr = [];
    if (Array.isArray(collection)) {
      filterArr = collection.filter((feedback) => {
        return feedback.status == status;
      });
    }
    // console.log(filterArr);
    // cleanSuggestCont();
    return filterArr;
  }
}
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
  feedBacks = document.querySelectorAll(".card");
  btnCancel = document.querySelector(".btn--cancel");
  editBtn = document.getElementById("btnEdit");
  editEnv = document.getElementById("editEnv");
  saveChangesBtn = document.getElementById("saveChanges");
  newTitle = document.getElementById("newTitle");
  newCategory = document.getElementById("newCategory");
  newStatus = document.getElementById("newStatus");
  suggestionTotal = document.querySelector(".suggestion-total ");
  constructor() {
    let FBVCollection = this.invokeCollection();
    if (this.btnCancel)
      this.btnCancel.addEventListener("click", () => {
        console.log("Esprit tranquille");
      });

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
          this.filterSort(FBVCollection, value);
        });
      });
    }
    // console.log(this.getCurrentObj());
    // console.log(this.btnCancel);
  }
  setCurrent(feedbacks, collection) {
    feedbacks.forEach((feedback) => {
      feedback.addEventListener("click", (eve) => {
        // eve.preventDefault();
        // console.log(feedback);
        localStorage.setItem("current", feedback.innerHTML);
        let currentTitle =
          feedback.children[1].children[0].children[0].textContent;
        console.dir(currentTitle);
        console.log(this.setCurrentObj(collection, currentTitle));
      });
    });
  }
  setCurrentObj(collection, title) {
    const result = collection.filter(
      (feedback) => feedback != null && feedback.title === title
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
