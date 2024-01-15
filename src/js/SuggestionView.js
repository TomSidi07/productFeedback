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
  }
  setCurrent(feedbacks) {
    feedbacks.forEach((feedback) => {
      feedback.addEventListener("click", (eve) => {
        // eve.preventDefault();
        // console.log(feedback);
        localStorage.setItem("current", feedback.innerHTML);
      });
    });
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
        if (feedback.comments) {
          return feedback;
        }
      })
      .sort((a, b) => {
        return a.comments.length > b.comments.length;
      });
    let leastCommented = collection
      .filter((feedback) => {
        return feedback.comments;
      })
      .sort((a, b) => {
        return b.comments.length > a.comments.length;
      });

    let mostUpvoted = collection
      .filter((feedback) => {
        return feedback.upvotes;
      })
      .sort((a, b) => {
        return a.upvotes > b.upvotes;
      });
    let leastUpvoted = collection
      .filter((feedback) => {
        return feedback.upvotes;
      })
      .sort((a, b) => {
        return a.upvotes < b.upvotes;
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
