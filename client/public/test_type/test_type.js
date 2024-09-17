
function init(){
    const template_list = document.getElementsByClassName('test-template');
   console.log(template_list.length)
    Array.from(template_list).forEach((element , index)=>{
        element.addEventListener('click' , (e)=>{
            sessionStorage.setItem('test-type' , index)
            window.location.href = "http://localhost:8080/question/question.html"
        })
    })
    const logined_user = localStorage.getItem('login_id')
    
    if(!logined_user) window.location.replace( 'http://localhost:8080/')

    
}
init()
