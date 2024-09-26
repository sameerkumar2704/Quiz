function getName(index) {
    switch (index) {
      case 0: return "javascript";
      case 1: return "python";
      case 2: return "java";
      default: return "not-found"
    }
  }
function getDataBaseName(){
    return getName(Number(sessionStorage.getItem('test-type')))
}
function getUserName(){
    return localStorage.getItem('login_id')
}
function getKey(){
    return `${getUserName()}-${getDataBaseName()}`
}
async function fetchData() {
    const res = await fetch('../data/data.json');
    const data = await res.json()
    return data
}
function getUserOutput(){
    let output = JSON.parse(localStorage.getItem(getKey()));
    
    return {...output , ans : JSON.parse(output.ans)}

}
function getScore( collection , output ){
    let correct = 0;
    for(let i =0 ; i <output.ans.length ; i++){
        if(collection[i].answer === collection[i].options[output.ans[i]]) correct++;
    }
    return correct;
}
function getMinuteAndSecond(object){

    return JSON.parse(object.completionTime)
}

function crateCorrectAndUserAnserBox(correct_ans , user_ans , index){
    const div = document.createElement("div")
    const h2 = document.createElement('h2')
    const content =document.createElement('div')
    h2.innerHTML = index+1;
    div.appendChild(h2)
    if(correct_ans === user_ans){
        const inner_h3 = document.createElement('h3')
        inner_h3.innerHTML = correct_ans+" ✔️"
        content.appendChild(inner_h3)
    }else{
        const incorrect = document.createElement('h3')
        incorrect.innerHTML = user_ans+ " ❌"
        const correct = document.createElement('h3')
        correct.innerHTML = correct_ans+ " ✔️"
        content.appendChild(incorrect)
        content.appendChild(correct)

    }
    div.classList.add('ans-container')
    div.appendChild(content)
    return div
}
function showAnswerList( list_view  , collection , user_output){
    for(let i =0 ; i <user_output.ans.length ; i++){
        list_view.appendChild(crateCorrectAndUserAnserBox(collection[i].answer , collection[i].options[user_output.ans[i]] , i))
    }
    
}
function init(){
    const outer_div = document.getElementsByClassName('result-box')[0]
    const progress = document.getElementsByClassName('progress')[0]
    const time_box = document.getElementsByClassName('time-box')[0]
    const ans_list_box = document.getElementsByClassName('review-box')[0]
    const ans_list_view = ans_list_box.children[0]
    const loader = document.querySelector('.loader-box')
    const review_btn = document.getElementById('review-btn')
    const close_riview = document.getElementsByClassName('close-ans-box')[0]
    const heading_of_box = outer_div.children[0];
    const score_box = outer_div.children[1];
    const restart_quiz = document.getElementById('restart-quiz')
    restart_quiz.addEventListener('click', (e)=>{
       window.location.replace('http://localhost:8080/question/question.html')
        localStorage.removeItem(getKey())
    })
    setTimeout(()=>{
        loader.classList.add('hide')
        outer_div.classList.remove('hide')
        console.log('done')
    },800)
    const test_name = getDataBaseName()
    heading_of_box.innerHTML = `Quize result of ${test_name.charAt(0).toUpperCase()+test_name.substring(1)}`
    let score = 0;
    let outof = 0;
    let emoji = '❓'
    let precentage = 0;
    let collection = undefined
    review_btn.addEventListener('click' , (e)=>{
        showAnswerList(ans_list_view , collection , getUserOutput())
        ans_list_box.classList.remove('review-box-hide')
        console.log(ans_list_box)
    })
    close_riview.addEventListener('click' , ()=>{
        ans_list_view.innerHTML = ""
        ans_list_box.classList.add('review-box-hide')
    })
    fetchData().then((db)=>{
         collection = db[test_name]
        score = getScore(collection , getUserOutput())
        outof = getUserOutput().ans.length
        precentage = (score/outof)*100;
        if(precentage>80){
            emoji= '🎉'
        }else if(precentage>60){
            emoji = '😀'
        }else if(precentage >50){
            emoji = '😊'
        }else{
            emoji = '😟'
        }
        progress.style.width = `${Math.round(precentage)}%`
        score_box.innerHTML = `${score} / ${outof}`
       document.documentElement.style.cssText = `--emoji:'${emoji}'`
       const{min ,second} = getMinuteAndSecond(getUserOutput())
       const total_time = db[`${test_name}-test-duration`]
       const diff_time = ((total_time.min*60+total_time.second) - (min*60+second))
      
       diff_min = Math.floor(diff_time/60);
       console.log(diff_min)
       diff_second = diff_time - (diff_min*60)
       time_box.children[1].innerHTML = `${diff_min} : ${(diff_second<10?`0${diff_second}`:diff_second)}`


    })
}
init()