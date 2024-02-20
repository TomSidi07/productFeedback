class SuggestionView {
  currentUser = new user(
    "assets/user-images/image-elijah.jpg",
    "Tom",
    "tomsidi07"
  );

  upDateUI(data) {
    let comment = data.comments || 0;
    let commentsLength = comment.length;
    let code = `<a href="/details" ><div class="card--suggestion-content card feedback">
           
          
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
                <a href="/details" class="comment--pan">
                <svg class="icon">
                  <use
                    xlink:href="src/assets/shared/sprite.svg#icon-comments"
                  ></use>
                </svg>
                <span class="comment__pan__counter">${
                  commentsLength || 0
                }</span>
</a>
            </div></div></a>`;
    return code;
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
            "src/" + comment.user.image || "src/" + this.currentUser.image
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
export default new SuggestionView();
