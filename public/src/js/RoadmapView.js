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

export default new RoadmapView();
