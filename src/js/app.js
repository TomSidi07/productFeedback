let url = "data.json";

function request() {
  fetch(url)
    .then((req) => {
      return req.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
request();
