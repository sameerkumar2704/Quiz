


const time_set = { min: 0, second: 0 }

async function fetchData() {
  const res = await fetch('../data/data.json');
  const data = await res.json()
  return data
}
function setOptionAndQuestion(data, question_index, options, question) {
  const curr_state = getCurrentState(getKey())
  Array.from(options).forEach((option, index) => {

    option.classList.remove('selected_ans')
    console.log(curr_state.ans[index])
    if (curr_state.ans[curr_state.curr_index] === index) option.classList.add('selected_ans')
    question[0].innerText = data[question_index].question
    option.children[1].innerText = data[question_index].options[index]
  })


}

function setQuestionCountLayout(data, question_indiactor ,options ,  question) {
  for (let i = 0; i < data.length; i++) {
    const child = createQuestioBoxIndicator(i + 1 , data , question_indiactor ,i ,options , question );
    question_indiactor.appendChild(child)
  }
  question_indiactor.children[0].classList.add('quesiton-indicator-box')
}
function select_current_click_inde(data, question_indiactor, click_index, options, quesiton){
  let curr_state = getCurrentState(getKey())
  let index = click_index
  

  curr_state.curr_index = index
  Array.from(question_indiactor.children).forEach((curr) => curr.classList.remove('quesiton-indicator-box'))
  console.log(curr_state.ans)
  question_indiactor.children[index].classList.add('quesiton-indicator-box')
  setCurrenSate(curr_state, getKey())
  setOptionAndQuestion(data, index, options, quesiton)
}
function select_next_question(data, question_indiactor, direction, options, quesiton) {

  let curr_state = getCurrentState(getKey())
  let index = curr_state.curr_index + direction
  index = Math.max(0, Math.min(index, curr_state.ans.length - 1))

  curr_state.curr_index = index
  Array.from(question_indiactor.children).forEach((curr) => curr.classList.remove('quesiton-indicator-box'))
  console.log(curr_state.ans)
  question_indiactor.children[index].classList.add('quesiton-indicator-box')
  setCurrenSate(curr_state, getKey())
  setOptionAndQuestion(data, index, options, quesiton)

}
function createQuestioBoxIndicator(value , data, question_indiactor, click_index, options, quesiton) {
  const div = document.createElement('div')
  const h2 = document.createElement('h2')
  div.appendChild(h2)
  h2.innerText = value;
  div.classList.add('question-selector')
  div.addEventListener('click' , ()=>{
   select_current_click_inde(data, question_indiactor, click_index, options, quesiton)
  })
  return div;
}
function getName(index) {
  switch (index) {
    case 0: return "javascript";
    case 1: return "python";
    case 2: return "java";
    default: return "not-found"
  }
}
function getCurrentState(key) {
  let curr_state = JSON.parse(sessionStorage.getItem(key));
  if (!curr_state) return curr_state
  curr_state = { ...curr_state, ans: JSON.parse(curr_state.ans) }
  return curr_state
}
function setCurrenSate(object, key) {
  object = { ...object, ans: JSON.stringify(object.ans) }
  sessionStorage.setItem(key, JSON.stringify(object))
}
function getKey() {
  const user_name = localStorage.getItem('login_id')
  const test_name = getName(Number.parseInt(sessionStorage.getItem('test-type')));
  const key = `${user_name}-${test_name}`
  return key;
}
function setOutcomeOnDataBase(key) {
  if (localStorage.getItem(key)) return
  const outcome = sessionStorage.getItem(key)
  localStorage.setItem(key, outcome);
  sessionStorage.removeItem(key)
}
function setQuestionState(data) {

  const key = getKey()

  if (sessionStorage.getItem(key)) return key
  const ans_list = data.map(() => -1);
  const state = {
    id: key,
    curr_index: 0,
    ans: JSON.stringify(ans_list),
    complete: false
  }
  sessionStorage.setItem(key, JSON.stringify(state));
  return key
}
function setQuestion(question, question_indiactor, data, options) {

  setOptionAndQuestion(data, 0, options, question)
  setQuestionCountLayout(data, question_indiactor , options , question)
}



function submitTest() {
  const state = getCurrentState(getKey());
  state.complete = true;
  state.completionTime = JSON.stringify(time_set)
  setCurrenSate(state, getKey())
  setOutcomeOnDataBase(getKey())
}
(() => {
  window.addEventListener('beforeunload', () => {
    submitTest()
  })
})()

function init() {

  const timer = document.getElementsByClassName('timer')
  const options = document.getElementsByClassName('option')
  const question = document.getElementsByClassName('question')
  const question_indiactor = document.getElementsByClassName('question-indicator')[0]
  const submit = document.querySelector('.submit')
  const loader = document.querySelector('.loader-box')
  submit.addEventListener("click", () => {
    submitTest();
    window.location.replace('http://localhost:8080/result/result.html')
  })
  const [prev_button, next_button] = document.getElementsByClassName('question-selector');
  let data = null;

 
  const test_name = getName(Number(sessionStorage.getItem('test-type')))

  next_button.addEventListener('click', () => {
    select_next_question(data, question_indiactor, 1, options, question)

  })
  prev_button.addEventListener('click', () => {
    select_next_question(data, question_indiactor, -1, options, question)
  })
  fetchData().then((res) => {
    setQuestionState(res[test_name])
    setQuestion(question, question_indiactor, res[test_name], options)

    data = res[test_name]
    setTimeout(()=>{
      StartTimer(res)
      loader.classList.add('hide')
    },300)
   
   
  })

  Array.from(options).forEach((option, i) => {
    option.addEventListener('click', function () {
      Array.from(options).forEach(function (other) {
        if (other !== option) other.classList.remove('selected_ans')
      })
      this.classList.add('selected_ans')
      const curr_state = getCurrentState(getKey())
      curr_state.ans[curr_state.curr_index] = i
      console.log(curr_state)
      setCurrenSate(curr_state, getKey())

    })
  })
  function StartTimer(data) {


    const duration = data[`${test_name}-test-duration`]
    console.log(duration)

    const total_time = new Date().getTime() + ((duration.min * 60 + duration.second) * 1000)
    CountDown()
    const timer_interval = setInterval(CountDown, 1000);
    function CountDown() {
      const now_mili_sec = new Date().getTime();
      const diff_in_mili_sec = total_time - now_mili_sec;
      const minutes = Math.floor(diff_in_mili_sec / (1000 * 60));
      const seconds = Math.floor((diff_in_mili_sec % (1000 * 60)) / 1000);
      timer[0].children[0].innerText = Math.max(0, minutes);
      timer[0].children[2].innerText = (Math.max(0, seconds) < 10 ? `0${Math.max(0, seconds)}` : Math.max(0, seconds))
      time_set.min = Math.max(0, minutes);
      time_set.second = Math.max(0, seconds)
      if (0 === minutes) {
        timer[0].classList.add('small-time-anime')
      }
      if (diff_in_mili_sec <= 0) {

        console.log('time is up')
        clearTimeout(timer_interval)
        submitTest();
        window.location.replace('http://localhost:8080/result/result.html')
      }
    }
  }

}
init();