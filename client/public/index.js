import { CustomButton } from "./components/resuable_components.js"
function createResuable( topics , custom_class , component , parent){
    topics.forEach(element => {
        const button = component( custom_class  , element  , './instruction/instruction.html')
        const li = document.createElement("li")
        li.appendChild(button)
        parent.append(li)
    });
}
function init(){
    const quiz_top_container = document.getElementById('select-quciz-topic')
    const topics = ["Computer Networks 🛜" , "Operating System 💻" , "Javascipt "]
    createResuable(topics , "topics" , CustomButton , quiz_top_container)

    
}
init()
