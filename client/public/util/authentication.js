
function UserObject(user_name, password) {
    return {
        user_name: user_name,
        password: password,
        logged_in: true
    }
}

function validateCredential(user_name , passowrd){
    let user_list = JSON.parse(getUserList());
    user_list = user_list.map((curr)=>JSON.parse(curr));
    let user_exsists = false
    let user_correct_password = false;
    for(let i = 0; i <user_list.length ; i++){
        if(user_list[i].user_name === user_name) {
            console.log(user_list[i])
            if(user_list[i].password === passowrd) user_correct_password = true
            user_exsists = true;
            break;
        }
    }
    if(!user_exsists ){
        throw new Error('user not found')
    }else if(!user_correct_password){
        throw new Error('credential is incorrect')
    }
    localStorage.setItem('login_id'  , user_name);

}
function getUserList() {
    return localStorage.getItem('user-accounts');
}

function setUserList(user_list) {
    localStorage.setItem("user-accounts", user_list);
}
function createNewUser(user_name, passowrd) {
    let user_account = UserObject(user_name, passowrd);
    let user_list = JSON.parse(getUserList());
    let object_data = []
    if(user_list) object_data = user_list.map((curr)=>JSON.parse(curr));
    try {
        validateUserName(user_account.user_name, object_data)
        console.log("al ok")
    }catch(e){
        throw Error(e.message)
       
    }
    user_account = JSON.stringify(user_account)
    if (!user_list) {
        user_list = [user_account];
    } else {
        user_list = [...user_list, user_account];
    }
 
    user_list = JSON.stringify(user_list);
    setUserList(user_list);
    localStorage.setItem('login_id'  , user_name);
}

function validateUserName(user_name, user_list) {
    if (!user_list) return;
    for (let i = 0; i < user_list.length; i++) {
        if (user_list[i].user_name === user_name) {
            
            throw new Error('User Already Exsist')

        }
        console.log(user_list[i] , user_list[i].user_name , user_name)
    }
}

function loginAccount(userObject) {

}
export { setUserList, loginAccount, createNewUser, validateCredential }