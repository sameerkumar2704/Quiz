function getKey() {
    const user_name = localStorage.getItem('login_id')
    const test_name = getName(Number.parseInt(sessionStorage.getItem('test-type')));
    const key = `${user_name}-${test_name}`
    return key;
}
function getName(index) {
    switch (index) {
        case 0: return "javascript";
        case 1: return "python";
        case 2: return "java";
        default: return "not-found"
    }
}
function init() {
    const template_list = document.getElementsByClassName('test-template');
    const user_name = document.getElementsByClassName('user-name')[0];
    user_name.innerText = localStorage.getItem('login_id')

    Array.from(template_list).forEach((element, index) => {
        element.addEventListener('click', (e) => {

            sessionStorage.setItem('test-type', index)
            if (localStorage.getItem(getKey()))  {
                window.location.href = 'http://localhost:8080/result/result.html'
            }else{
                  window.location.href = "http://localhost:8080/question/question.html"
            }
          
        })
    })
    const logined_user = localStorage.getItem('login_id')

    if (!logined_user) window.location.replace('http://localhost:8080/')


}
init()
