class SuuggestionView {
  suggestionCont = document.querySelector(".suggestion__content");
  btn__addFeedback = document.querySelector(".btn--add-feedback");
  btnCancel = document.querySelector(".btn--cancel");
  btnaddFeedback = document.querySelector(".add-feedback");
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
  constructor() {
    // console.log(this.feedBacks);
    // this.renderByStatus("suggestion");
    // if (this.suggestionSort)
    //   this.suggestionSort.addEventListener("change", (eve) => {
    //     // filterSort(collection, suggestionSort.value);
    //     console.log(this.suggestionSort.value);
    //     this.filterSort(this.suggestionSort.value);
    //   });
    // this.setCurrent(this.feedBacks);
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
    console.log(this.getCurrentObj());
    console.log(this.btnCancel);
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
    console.log(currentObj);
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
    collection.forEach((data) => {
      let suggestion__card__code = `<div class="left">
              <a href="#"><btn class="pan">${data.upvotes}</btn></a>
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
        return feedback.status == status;
      });
    }
    // cleanSuggestCont();
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
}
export default new SuuggestionView();
