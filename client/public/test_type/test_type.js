
function init(){
    const template_list = document.getElementsByClassName('test-template');
    const user_name = document.getElementsByClassName('user-name')[0];
    user_name.innerText = localStorage.getItem('login_id')
  
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
