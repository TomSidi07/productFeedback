class RoadmapView {
  roadmap = document.querySelector(".roadmap");
  blocContainer = document.querySelector(".roadmap__content__container");
  totalPlanned = document.querySelector(".total--plannedr");
  totalInProgress = document.querySelector(".total--plannedr");
  totalPlanned = document.querySelector(".total--plannedr");
  collection;
  constructor() {
    this.renderByStatus();
    this.collection = this.getRoadMaps();
    let lives = this.renderByStatus(this.collection,"live")
    let planned = this.renderByStatus(this.collection,"planned")
      let inprogress = this.renderByStatus(this.collection, "inp-rogress")
      localStorage.setItem("live",JSON.stringify(lives))
      localStorage.setItem("planned",JSON.stringify(planned))
      localStorage.setItem("in-progress",JSON.stringify(inprogress))
    console.log(this.collection);
  }
  getRoadMaps() {
    let result = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (JSON.parse(localStorage.getItem(i)))
        result.push(JSON.parse(localStorage.getItem(i)));
    }
    return result;
  }
  generator(feedBack) {
    return `
    <div class="header">
        <h2 class="feedback-title">Morecomprehensive reports</h2>
        <p class="feedBack-descripcrition">
        It would be great to see a more detailed breakdown of solution</p>
        <div class="pan">Feature</div>
    </div>
    <div class="content">
        <div class="pan uvoptes">123</div>
        <div class="comment--pan">
        <svg class="icon">
        <usexlink:href="/src/assets/shared/sprite.svg#icon-comments"></usexlink:href=></svg><span class="comment__pan__counter">2</span>
    </div>
    </div>`;
  }
  makePlanning(feedback) {}
  makeInprogress(feedback) {}
  makeLive(feedback) {}
  renderByStatus(collection, status) {
    let filterArr = [];
    if (Array.isArray(collection)) {
      filterArr = collection.filter((feedback) => {
        return feedback.status == status;
      });
    }
    console.log(filterArr);
    // cleanSuggestCont();
    return filterArr;
  }
}

export default new RoadmapView();
