/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
]

$(document).ready( function() {
  const createTweetElement = function(tweet) {
    const $newTweet = 
      $(`<article class="tweet">
          <header>
            <div> <img src="${tweet.user.avatars}" alt="My Profile Picture"> </div>
            <div> ${tweet.user.name} </div>
            <div> ${tweet.user.handle} </div>
          </header>
          <div class="tweet-text">
            ${tweet.content.text}
          </div>
          <footer>
            <div> ${tweet.created_at} </div>
            <div class="symbols">
              <div><i class="fa-solid fa-flag"></i></div>
              <div><i class="fa-solid fa-retweet"></i></div>
              <div></i><i class="fa-solid fa-heart"></i></div>
            </div>
          </footer>
      </article>`);

    return $newTweet;
  }

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $('#tweets-container').append(newTweet);
    }
  }
  
  renderTweets(data);

  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();

    // serialize the form data (tweeter server is configured to receive data in query string format)
    const formData = $('.new-tweet form').serialize();

    // ajax request: send serialized data to server by submitting post request
    $.ajax({
    type: "POST",
    url: '/tweets/',
    data: formData
    });

  })

});

