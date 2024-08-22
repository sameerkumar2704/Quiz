const instruction_template = document.getElementById("instrution-template")
const start_quiz = document.getElementById('start-quiz')
const question_container = document.getElementById('question-container')
question_container.style.visibility =""
start_quiz.onclick = ()=>{

}
const topic = "Operating System"
const time = "30 sec"
const content = ` This quiz will consist of questions on the topic of ${topic}. You will have ${time} seconds for each question. Answering each question is mandatory. Each question is worth 1 mark. If time runs out, you will automatically skip to the next question.`
instruction_template.innerText = content

function createQuestionBox(){
    const div = document.createElement('div')


}
