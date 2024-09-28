import { isUserLoggedIn } from "../util/authentication.js";
import { getKey  } from "../util/localStorage.js";
import { PushNewUrl, ReplaceUrl } from "../util/url_manupulation.js";

function init() {
    const template_list = document.getElementsByClassName('test-template');
    const user_name = document.getElementsByClassName('user-name')[0];
    user_name.innerText = localStorage.getItem('login_id')

    Array.from(template_list).forEach((element, index) => {
        element.addEventListener('click', (e) => {

            sessionStorage.setItem('test-type', index)
            if (localStorage.getItem(getKey()))  {
                PushNewUrl('result/result.html')
            }else{
                PushNewUrl("question/question.html")
            }
          
        })
    })
    

    if (!isUserLoggedIn()) ReplaceUrl('')


}
init()
