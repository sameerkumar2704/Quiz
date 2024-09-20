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

function init(){
    const outer_div = document.getElementsByClassName('result-box')[0]
    const progress = document.getElementsByClassName('progress')[0]
    const time_box = document.getElementsByClassName('time-box')[0]
    const heading_of_box = outer_div.children[0];
    const score_box = outer_div.children[1];
  
    const test_name = getDataBaseName()
    heading_of_box.innerHTML = `Quize result of ${test_name.charAt(0).toUpperCase()+test_name.substring(1)}`
    let score = 0;
    let outof = 0;
    let emoji = '❓'
    let precentage = 0;
    fetchData().then((db)=>{
        const collection = db[test_name]
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
       console.log(min)
       time_box.children[1].innerHTML = `${min} : ${second}`

    })
}
init()