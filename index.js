let ratingsCounter = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

function handleFormSubmit(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const rating = parseInt(event.target.rating.value);

  const feedBackData = {
    name: name,
    rating: rating,
  };
  console.log(feedBackData);

  axios
    .post(
      "https://crudcrud.com/api/2daecd07871c439ba3b31e7f5c27cb8b/feedbackData",
      feedBackData
    )
    .then((response) => {
      console.log(response);
      ratingsCounter[rating] += 1;
      updateRatingsList();
      displayFeedback(response.data);

      document.getElementById("name").value = "";
      document.getElementById("rating").value = "1";
    })
    .catch((error) => console.log(error));
}

function updateRatingsList() {
  document.getElementById("oneStar").textContent = ratingsCounter[1];
  document.getElementById("twoStar").textContent = ratingsCounter[2];
  document.getElementById("threeStar").textContent = ratingsCounter[3];
  document.getElementById("fourStar").textContent = ratingsCounter[4];
  document.getElementById("fiveStar").textContent = ratingsCounter[5];
}

function displayFeedback(feedbackData) {
  const feedbacksList = document.getElementById("feedbacksList");
  const li = document.createElement("li");
  li.textContent = `${feedbackData.name} - ${feedbackData.rating}`;
  li.id = feedbackData._id;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "DELETE";
  li.appendChild(deleteButton);

  const editButton = document.createElement("button");
  editButton.textContent = "EDIT";
  li.appendChild(editButton);

  feedbacksList.appendChild(li);

  deleteButton.addEventListener("click", () =>
    deleteFeedback(feedbackData, feedbackData._id, li)
  );

  editButton.addEventListener("click", () => {
    editFeedback(feedbackData, feedbackData._id, li);
  });
}

function deleteFeedback(feedBackData, id, li) {
  axios
    .delete(
      `https://crudcrud.com/api/2daecd07871c439ba3b31e7f5c27cb8b/feedbackData/${id}`
    )
    .then((response) => {
      console.log(response);
      feedbacksList.removeChild(li);
      ratingsCounter[feedBackData.rating] -= 1;
      updateRatingsList();
    })
    .catch((error) => {
      console.log(error);
    });
}

function editFeedback(feedBackData, id, li) {
  document.getElementById("submit-btn").textContent = "Edit Feedback";
  document.getElementById("name").value = feedBackData.name;
  document.getElementById("rating").value = feedBackData.rating;
  axios
    .delete(
      `https://crudcrud.com/api/2daecd07871c439ba3b31e7f5c27cb8b/feedbackData/${id}`
    )
    .then((response) => {
      console.log(response);
      feedbacksList.removeChild(li);
      ratingsCounter[feedBackData.rating] -= 1;
      updateRatingsList();
    })
    .catch((error) => {
      console.log(error);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/2daecd07871c439ba3b31e7f5c27cb8b/feedbackData"
    )
    .then((response) => {
      console.log(response);

      response.data.forEach((feedback) => {
        ratingsCounter[feedback.rating] += 1;
        displayFeedback(feedback);
        updateRatingsList();
      });
    });
});
