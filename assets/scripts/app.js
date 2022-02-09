const QUOTES_ARRAY = [
  {
    text: "The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.",
    author: "Ada Lovelace"
  },
  {
    text: "Ask not what your country can do for you; ask what you can do for your country.",
    author: "John Kennedy"
  },
  {
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin"
  },
  {
    text: "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid.",
    author: "Albert Einstein"
  },
  {
    text: "If you don’t like something, change it. If you can’t change it, change the way you think about it.",
    author: "Mary Engelbreit"
  },
];

const THEME_TEXT = ['Good morning', 'Good afternoon', 'Good evening', 'Good night']

// toggle view
const BUTTON_TEXT = ["More", "Less"];

const clock = document.querySelector('.js-clock');
const toggleButton = document.querySelector('.js-clock-toggle');
const toggleContent = document.querySelector('.js-clock-panel');

function toggleView() {
  clock.classList.toggle('is-open');
  this.classList.toggle('is-open');
  if(this.classList.contains('is-open')) {
    this.querySelector('span').textContent = BUTTON_TEXT[1];

    toggleContent.style.height = 'auto';
    const height = toggleContent.clientHeight + 'px';
    toggleContent.style.height = '0px';
    setTimeout(function () {
      toggleContent.style.height = height;
    }, 0);
  } else {
    this.querySelector('span').textContent = BUTTON_TEXT[0];

    toggleContent.style.height = '0px';
  }
}

toggleButton.addEventListener('click', toggleView);

// quotes
let quoteIndex;

function getRandomItem(array) {
  return Math.floor(Math.random()*array.length);
}

function updateQuote(array) {
  let newQuoteIndex = getRandomItem(array);

  while(quoteIndex == newQuoteIndex) {
    newQuoteIndex = getRandomItem(array);
  }

  const newQuote = array[newQuoteIndex];
  const quoteElement = document.querySelector('.js-clock-quote');
  quoteElement.querySelector('p').textContent = newQuote.text;
  quoteElement.querySelector('cite').textContent = newQuote.author;
  quoteIndex = newQuoteIndex;
}

updateQuote(QUOTES_ARRAY);
document.querySelector('.js-quote-update').addEventListener('click', () => {
  updateQuote(QUOTES_ARRAY);
});

// date
let date = new Date();

function getTheme() {
  const time = date.getHours();
  let theme;

  if (time >= 6 & time < 10) theme = 0;
  if (time >= 10 && time < 16) theme = 1;
  if (time >= 16 && time < 22) theme = 2;
  if (time >= 22 || time < 6) theme = 3;
  
  return theme;
}

const themeIndex = getTheme();

function getCurrentTime() {
  let date = new Date();
  let hours = '0' + String(date.getHours());
  let minutes = '0' + String(date.getMinutes());

  return hours.slice(-2) + ':' + minutes.slice(-2);
}

function lastSunday(month, year) {
  let d = new Date();
  let lastDayOfMonth = new Date(Date.UTC(year || d.getFullYear(), month+1, 0));
  let day = lastDayOfMonth.getDay();
  return new Date(Date.UTC(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), lastDayOfMonth.getDate() - day));
}

function isBST(date) {
  let d = date || new Date();
  let starts = lastSunday(2, d.getFullYear());
  starts.setHours(1);
  let ends = lastSunday(9, d.getFullYear());
  ends.setHours(1);
  return d.getTime() >= starts.getTime() && d.getTime() < ends.getTime();
}

function getTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getWeekPassed() {
  const current = date.getTime();
  const previous = new Date(date.getFullYear(), 0, 1);

  return Math.ceil((current - previous) / 604800000);
}

function getDaysPassed() {
  const current = date.getTime();
  const previous = new Date(date.getFullYear(), 0, 1);

  return Math.ceil((current - previous) / 86400000);
}

function updateClock() {
  document.querySelector('.js-clock-time').textContent = getCurrentTime();
}

if(themeIndex < 2) {
  clock.classList.add('_day');
} else {
  clock.classList.add('_night');
}

document.querySelector('.js-clock-time').textContent = getCurrentTime();
if(isBST(date)) {
  document.querySelector('.js-clock-bst').textContent = 'BST';
}
document.querySelector('.js-clock-timezone').textContent = getTimezone();
document.querySelector('.js-clock-days-passed').textContent = getDaysPassed();
document.querySelector('.js-clock-week-passed').textContent = getWeekPassed();
document.querySelector('.js-clock-day-number').textContent = date.getDay();
document.querySelector('.js-clock-greeting').textContent = THEME_TEXT[themeIndex];

let startClock = setInterval(updateClock, 1000);

// audio
const audio = document.querySelector('audio');
document.addEventListener('click', () => audio.play());