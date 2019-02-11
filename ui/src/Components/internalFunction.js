import store from '../../Store/index.js';

/**
 * 
 * Авторизация пользователя
 * 
 * @param {String} username имя пользователя
 * @param {String} password пароль пользователя
 * @param {Boolean} invalidInput корректность введённых данных 
 */
async function authorization (username, password, invalidInput) {
    let response = await store.dispatch('login', {name:username, pass:password});
    let token = response;
    if((token !=='AuthError')&&(token != '')){
        console.log(token)
        store.commit ('startmessage', 'Добро пожаловать');
    }else{
        invalidInput = true;
        store.commit ('startmessage', 'Вы не авторизованы');
    }
    return (invalidInput)
}

// console.log( getIndexExist (tableData1, 'marked', true) );
export {someCompareObj, getIndexExist, authorization};