const question = [{
  title: "Which statement is not correct about “init” process in Unix?",
  options: [
    "It is generally the parent of the login shell.",
    "It has PID 1.",
    "It is the first process in the system.",
    "Init forks and execs a ‘getty’ process at every port connected to a terminal."


  ],
  correct_options: 3
},
{
  title: "Which statement is not correct about “init” process in Unix? -2",
  options: [
    "It is generally the parent of the login shell.",
    "It has PID 1.",
    "It is the first process in the system.",
    "Init forks and execs a ‘getty’ process at every port connected to a terminal."


  ],
  correct_options: 3
}

]
let test_completed_user = {
  os:["12456"]
}

// maintaning recored of question 
function questionSet(data) {
  
  return {
    question_list: data,
    curr_index: 0,
    increment_index: function () {
      this.curr_index++
    },
    is_last_question: function () { return this.question_list.length - 1 === this.curr_index },
    is_end: function () { return this.question_list.length === this.curr_index }
  }
}

history.replaceState(null, null, 'http://localhost:8080/question/question.html')

if (sessionStorage.getItem("refresh-count")) alert('warning your test will be submiited')
window.addEventListener('beforeunload', (event) => {
  // Custom message
  console.log("done")
  // Standard for most browsers
  localStorage.setItem("test", "completed")
  if (!sessionStorage.getItem("refresh-count")) sessionStorage.setItem("refresh-count", 1);


  // Some browsers may use this as the message

  // Return the message for older browsers
});
function preventBack() {
  console.log("hogaya")

}

window.onload = preventBack;



function init() {
  const option_arr = document.querySelectorAll(".option");
  const next_question = document.getElementById('next-question')
  const question_title = document.getElementById('question-title')
  let questions_set = undefined;

  window.addEventListener('beforeunload' , ()=>{
    localStorage.
  })
  refreshQuestion()
  function next_btn_handler() {
    questions_set.increment_index()
    sessionStorage.setItem("question-status", JSON.stringify(questions_set))
    if (questions_set.is_end()) {
      window.location.href = "https://www.amazon.in/"
    }


    refreshQuestion()
  }


  function option_click_handler() {

    // it uses object of current elment
    option_arr.forEach((option) => {
      option.classList.remove("question-option-active")
      option.classList.add("question-option-non-active")
    })
    this.classList.add("question-option-active")
    this.classList.remove("question-option-non-active")

    next_question.disabled = false
  }


  function refreshQuestion() {
    if (sessionStorage.getItem('question-status')) {
      questions_set = JSON.parse(sessionStorage.getItem("question-status"))
    } else {
      questions_set = new questionSet(question);

    }
    console.log(questions_set)
    const current_question = questions_set.curr_index;
    question_title.innerHTML = questions_set.question_list[current_question].title
    option_arr.forEach((option, index) => {
      option.classList.remove("question-option-active")
      option.classList.add("question-option-non-active")
      option.innerHTML = questions_set.question_list[current_question].options[index]
    })
    next_question.disabled = true;
    console.log(questions_set.is_last_question())
    if (questions_set.is_last_question()) {
      next_question.innerHTML = "submit"
    }
    option_arr.forEach((option) => {
      option.addEventListener('click', option_click_handler)

    })
    next_question.addEventListener('click', next_btn_handler)


  }



}
init()
