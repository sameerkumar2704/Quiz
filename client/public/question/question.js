
import {
  fetchData,
  getKey,
  getCurrentState,
  setCurrenSate,
  setOutcomeOnDataBase,
  getName,
} from "../util/localStorage.js";
import { isUserLoggedIn } from "../util/authentication.js";
import { ReplaceUrl } from "../util/url_manupulation.js";




let prev_button = undefined;
let next_button = undefined;
let question_count = undefined;
if (!isUserLoggedIn()) ReplaceUrl('')

const time_set = { min: 0, second: 0 };

function setOptionAndQuestion(data, question_index, options, question) {
  question_count.innerHTML = "Question " + (question_index + 1);
  const curr_state = getCurrentState(getKey());
  Array.from(options).forEach((option, index) => {
    option.classList.remove("selected_ans");
    console.log(curr_state.ans[index]);
    if (curr_state.ans[curr_state.curr_index] === index)
      option.classList.add("selected_ans");
    question[0].innerText = data[question_index].question;
    option.children[1].innerText = data[question_index].options[index];
  });
}

function setQuestionCountLayout(data, question_indiactor, options, question) {
  for (let i = 0; i < data.length; i++) {
    const child = createQuestioBoxIndicator(
      i + 1,
      data,
      question_indiactor,
      i,
      options,
      question
    );
    question_indiactor.appendChild(child);
  }
  question_indiactor.children[0].classList.add("quesiton-indicator-box");
}

function select_current_click_index(
  data,
  question_indiactor,
  click_index,
  options,
  quesiton
) {
  let curr_state = getCurrentState(getKey());
  let index = click_index;

  curr_state.curr_index = index;
  Array.from(question_indiactor.children).forEach((curr) =>
    curr.classList.remove("quesiton-indicator-box")
  );
  console.log(curr_state.ans);
  question_indiactor.children[index].classList.add("quesiton-indicator-box");
  setCurrenSate(curr_state, getKey());
  setOptionAndQuestion(data, index, options, quesiton);
}

function select_next_question(
  data,
  question_indiactor,
  direction,
  options,
  quesiton
) {
  let curr_state = getCurrentState(getKey());
  let index = curr_state.curr_index + direction;
  index = Math.max(0, Math.min(index, curr_state.ans.length - 1));

  curr_state.curr_index = index;
  Array.from(question_indiactor.children).forEach((curr) =>
    curr.classList.remove("quesiton-indicator-box")
  );

  question_indiactor.children[index].classList.add("quesiton-indicator-box");
  setCurrenSate(curr_state, getKey());
  setOptionAndQuestion(data, index, options, quesiton);

  if (index === 0) {
    prev_button.setAttribute("disabled", true);
  } else {
    prev_button.removeAttribute("disabled");
  }
  if (index === data.length - 1) {
    next_button.setAttribute("disabled", true);
  } else {
    next_button.removeAttribute("disabled");
  }
}

function createQuestioBoxIndicator(
  value,
  data,
  question_indiactor,
  click_index,
  options,
  quesiton
) {
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  div.appendChild(h2);
  h2.innerText = value;
  div.classList.add("question-selector");
  div.addEventListener("click", () => {
    select_current_click_index(
      data,
      question_indiactor,
      click_index,
      options,
      quesiton
    );
  });
  return div;
}

function setQuestionState(data) {
  const key = getKey();

  if (sessionStorage.getItem(key)) return key;
  const ans_list = data.map(() => -1);
  const state = {
    id: key,
    curr_index: 0,
    ans: JSON.stringify(ans_list),
    complete: false,
  };
  sessionStorage.setItem(key, JSON.stringify(state));
  return key;
}

function setQuestion(question, question_indiactor, data, options) {
  setOptionAndQuestion(data, 0, options, question);
  setQuestionCountLayout(data, question_indiactor, options, question);
}

function submitTest() {
  const state = getCurrentState(getKey());
  state.complete = true;
  state.completionTime = JSON.stringify(time_set);
  setCurrenSate(state, getKey());
  setOutcomeOnDataBase(getKey());

  ReplaceUrl("result/result.html");
}

(() => {
  if (localStorage.getItem(getKey())) {
    ReplaceUrl("result/result.html");
  }
  window.addEventListener("beforeunload", () => {
    submitTest();
  });
})();

function init() {
  const timer = document.getElementsByClassName("timer");
  const options = document.getElementsByClassName("option");
  const question = document.getElementsByClassName("question");
  const question_indiactor = document.querySelector(".question-indicator");
  const submit = document.querySelector(".submit");
  const loader = document.querySelector(".loader-box");
  question_count = document.querySelector(".question-count");
  submit.addEventListener("click", () => {
    submitTest();
  });
  prev_button = document.getElementsByClassName("question-selector")[0];
  next_button = document.getElementsByClassName("question-selector")[1];
  prev_button.setAttribute("disabled", true);
  let data = null;

  const test_name = getName(Number(sessionStorage.getItem("test-type")));
  if(!test_name ) ReplaceUrl('test/test.html')

  next_button.addEventListener("click", () => {
    select_next_question(data, question_indiactor, 1, options, question);
  });
  prev_button.addEventListener("click", () => {
    select_next_question(data, question_indiactor, -1, options, question);
  });
  fetchData().then((res) => {
    setQuestionState(res[test_name]);
    setQuestion(question, question_indiactor, res[test_name], options);

    data = res[test_name];
    setTimeout(() => {
      StartTimer(res);
      loader.classList.add("hide");
    }, 300);
  });

  Array.from(options).forEach((option, i) => {
    option.addEventListener("click", function () {
      Array.from(options).forEach(function (other) {
        if (other !== option) other.classList.remove("selected_ans");
      });
      this.classList.add("selected_ans");
      const curr_state = getCurrentState(getKey());
      curr_state.ans[curr_state.curr_index] = i;
      console.log(curr_state);
      setCurrenSate(curr_state, getKey());
    });
  });
  function StartTimer(data) {
    const duration = data[`${test_name}-test-duration`];

    const total_time =
      new Date().getTime() + (duration.min * 60 + duration.second) * 1000;
    CountDown();
    const timer_interval = setInterval(CountDown, 1000);
    function CountDown() {
      const now_mili_sec = new Date().getTime();
      const diff_in_mili_sec = total_time - now_mili_sec;
      const minutes = Math.floor(diff_in_mili_sec / (1000 * 60));
      const seconds = Math.floor((diff_in_mili_sec % (1000 * 60)) / 1000);
      timer[0].children[0].innerText = Math.max(0, minutes);
      timer[0].children[2].innerText =
        Math.max(0, seconds) < 10
          ? `0${Math.max(0, seconds)}`
          : Math.max(0, seconds);
      time_set.min = Math.max(0, minutes);
      time_set.second = Math.max(0, seconds);
      if (0 === minutes) {
        timer[0].classList.add("small-time-anime");
      }
      if (diff_in_mili_sec <= 0) {
        console.log("time is up");
        clearTimeout(timer_interval);
        submitTest();
      }
    }
  }
}
init();
