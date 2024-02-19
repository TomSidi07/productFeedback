import CommentView from "./CommentView.js";
import DetailView from "./DetailView.js";
import RoadmapView from "./RoadmapView.js";
import SuggestionView from "./SuggestionView.js";
import FeedbackView from "./createFeedbackView.js";
let suugsestionMain = document.querySelector(".suggestion");
let roadmapMain = document.querySelector(".roadmap");
let suggestionCont = document.querySelector(".suggestion__content");
let btn__addFeedback = document.querySelector(".btn--add-feedback");
let btnCancel = document.querySelector(".btn--cancel");
let btnaddFeedback = document.querySelector(".add-feedback");
let IdCount;
let popup = document.querySelector(".popup");
let categories = document.querySelectorAll(".btn--cat");
let status = document.querySelectorAll(".btn--stat");
let suggestionTotal = document.querySelector(".suggestion-total ");
let url = "./data.json";
// collection de feedback
let collection = [];
let feedBacks;
//******************************************************************************************** */ Resquest Data

// Fetch and store to LS
async function request() {
  try {
    await fetch(url || "")
      .then((req) => {
        return req.json();
      })
      .then((response) => {
        try {
          // collection = [...response.productRequests];
          console.log("req");
          IdCount = collection.length++;
          SuggestionView.upDateUI(response.productRequests);
          localStorage.setItem(
            "collection",
            JSON.stringify(response.productRequests)
          );
          response.productRequests.forEach((feedback) => {
            if (!localStorage.getItem(feedback.id))
              localStorage.setItem(feedback.id, JSON.stringify(feedback));
          });
          feedBacks = document.querySelectorAll(".feedback");
          let upvotesBtns = document.querySelectorAll(".pan.uvoptes");
          console.log(upvotesBtns);
          if (upvotesBtns)
            upvotesBtns.forEach((upvotesBtn) => {
              upvotesBtn.addEventListener("click", (eve) => {
                eve.preventDefault();
                eve.target.classList.add("active");
                if (eve.target.classList.contains("active")) {
                  console.log("active");
                  let CureentFeedback = JSON.parse(
                    localStorage.getItem("currentObj") || "{}"
                  );
                  CureentFeedback.upvotes += 1;
                  localStorage.setItem(
                    CureentFeedback.id,
                    JSON.stringify(CureentFeedback)
                  );
                  localStorage.setItem(
                    "currentObj",
                    JSON.stringify(CureentFeedback)
                  );
                }
              });
              // console.log(upvotesBtn);
            });
          SuggestionView.setCurrent(feedBacks, collection);

          if (btn__addFeedback)
            btn__addFeedback.addEventListener("click", (event) => {
              let addFeedback = document.querySelector(".add-feedback");

              event.preventDefault();
              if (popup) popup.classList.toggle("active");
              if (btnCancel)
                btnCancel.addEventListener("click", (eve) => {
                  event.preventDefault();
                  // addFeedBack(collection);
                  popup.classList.remove("active");
                });
            });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
}
request();
let UpdatedCollection = [];
for (let i = 0; i < localStorage.length; i++) {
  let feedFromLS = JSON.parse(localStorage.getItem(i));
  if (feedFromLS != null) UpdatedCollection.push(feedFromLS);
}
let prom = new Promise((resolve, reject) => {
  setTimeout(() => {
    SuggestionView.upDateUI(UpdatedCollection);
    let feedBacks = document.querySelectorAll(".feedback");
    let roadmapCards = document.querySelectorAll(".card--roadmap ");
    let upvotes = document.querySelectorAll(".pan.upvotes");
    SuggestionView.setCurrent(feedBacks, UpdatedCollection);
    SuggestionView.setCurrentRoadMap(roadmapCards, UpdatedCollection);
    SuggestionView.showCurrentComments();

    console.log(upvotes);
    // console.log(feedBacks)
    console.log("okey");
  }, 300);
});
// Copy to collection
for (let i = 0; i < localStorage.length; i++) {
  if (JSON.parse(localStorage.getItem(i)))
    collection.push(JSON.parse(localStorage.getItem(i)));
}
// Events
status.forEach((btn) => {
  btn.addEventListener("click", (eve) => {
    status.forEach((btns) => {
      btns.classList.remove("active");
      eve.target.classList.toggle("active");
    });
    console.log(btn);
    SuggestionView.filterFeeds(collection, btn.textContent.toLowerCase());
  });
});
if (suggestionTotal)
  suggestionTotal.innerHTML = renderByStatus("suggestion").length;
console.log();
if (collection.length == 0) {
  suggestionCont.innerHTML = `<div class="emptyFeedback">
      <img src="/src/assets/suggestions/illustration-empty.svg" alt="">
      <h2>There is no feedback yet</h2>
      <p>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <button class="btn suggestion__header__right btn--add-feedback">
        + Add Feedback
      </button>
    </div>`;
}
// Add FEEDBACK
class FeedBack {
  id;
  title;
  category;
  upvotes;
  status;
  comments;
  description;
  constructor(
    title,
    comments = [],
    description,
    category,
    upvotes = 0,
    status
  ) {
    this.id = collection.length;
    this.comments = comments;
    this.category = category;
    this.description = description;
    this.status = status;
    this.title = title;
    this.upvotes = upvotes;
  }
}

function cleanSuggestCont() {
  (suggestionCont || "").innerHTML = "";
}
function createFeedback() {
  let { title, category, description } = FeedbackView;
  let newFeedback = new FeedBack(
    title,
    [],
    description,
    category,
    0,
    "suggestion"
  );
  collection.push(newFeedback);
  FeedbackView.render(newFeedback);
  localStorage.setItem(newFeedback.id, JSON.stringify(newFeedback));
}

function renderByStatus(status) {
  let filterArr = collection.filter((feedback) => {
    return feedback.status == status;
  });
  // cleanSuggestCont();
  return filterArr;
}

// console.log(UpdatedCollection);
let init = () => {
  // SuggestionView.setCurrent(feedBacks, collection);

  FeedbackView.Handler(createFeedback);
  // FeedbackView.render();

  // SuggestionView.upDateUI(collection);
  console.log(UpdatedCollection);
  SuggestionView.sort(collection);
  // DetailView.updateComment(collection);
  DetailView.render();
  // DetailView.adjustComment();
};
init();
