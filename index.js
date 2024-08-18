// переменные
// всплывающие окна входа и регистрации
let overlay_new;
let close_popup_new;
let pop_auto;
let close_auto;
let main_Page;
// кнопки на окнах входа и регистрации
let buttonExist = document.querySelector('.exist_but');
let buttonNew = document.querySelector('.new_but');
let buttonBtn = document.querySelector('.btn');
let isRegistrate = false;// флаг прохождения регистрации

// окно входа/регистрации
overlay_new = document.querySelector('.overlay_new');
pop_auto = document.querySelector('.auto');

// значок закрытия окна
close_Popup_New = document.querySelector('.close-popup_new');
close_auto = document.querySelector('.close-auto');
// при загрузке страницы отображаем окно входа/регистрации
setTimeout(() => {
    // let overlay_new = document.querySelector('.overlay_new');
    overlay_new.style.display = "block";
}, 1000);

// на значок закрытия ложим обработчик
close_Popup_New.addEventListener("click", function () {
    // при щелчке на крестике в углу окна входа/регистрации закрываем его
    overlay_new.style.display = "none";
    // console.log("Close popup");
});

close_auto.addEventListener("click", function () {
    // при щелчке на крестике в углу окна входа/регистрации закрываем его
    pop_auto.style.display = "none";
    // console.log("Close popup");
});

// на кнопку регистрации ложим обработчик
buttonBtn.addEventListener("click", function (e) {
    e.preventDefault;// отменяем действие кнопки по-умолчанию
    overlay_new.style.display = "none";
    pop_auto.style.display = "block";
    // на кнопку входа ложим обработчик
    buttonNew.addEventListener("click", function (ev) {
        ev.preventDefault;// отменяем действие кнопки по-умолчанию
        // console.log(isRegistrate);
        if (testRegistration()) {
            showMainPage();
        };

    });
});

// на кнопку входа ложим обработчик
buttonExist.addEventListener("click", function (e) {
    // получаем логин и пароль
    let login = document.querySelector('.overlay_new .log input');
    let pas = document.querySelector('.overlay_new .pas input');
    if(login.value != "" && pas.value != "") {
        // проверяем их
        testLogin(login.value, pas.value);
    } else {
        alert("Поля для ввода логина и пароля не могут быть пустыми!");
    }
    
    // console.log("access=" + access);
    // if (access) {
    //     overlay_new.style.display = "none";// скрываем окно входа
    //     showMainPage();// выводим главную страницу
    // } else {
    //     alert("Проверьте правильность ввода логина или пароля!");
    // }
})

/*
если регистрируется новый пользователь, проверяем, чтобы логин и пароль не были пустыми, далее проверяем наличие уже существующего пользователя в файле зарегистрированных пользователей. Если такого нет, записываем нового пользователя, если есть, извещаем об этом и сбрасываем значения в полях ввода
*/
function testRegistration() {
    let login = document.querySelector('.auto .log input');
    let pas = document.querySelector('.auto .pas input');
    let pasRepeat = document.querySelector('.auto .repeat input');
    console.log('pas=' + pas.value, 'pasrepeat=' + pasRepeat.value);
    if (pas.value != pasRepeat.value) {
        // проверяем правильность ввода пароля
        alert("Проверьте правильность ввода пароля!");
        // сброс значений
        pas.value = '';
        pasRepeat.value = '';
        return false;
    }
    if (login.value == '') {
        alert("Логин не может быть пустым");
        return false;
    } else {
        // запись нового пользователя в файл
        // return testLogin(login.value, pas.value);
    }
}

function testLogin(login, password) {
    let strData;
    let req = new XMLHttpRequest();// объект запроса
    let retval;
    req.open("GET", "login/loging.csv", true);// открываем запрос
    req.addEventListener("load", function () {
        // console.log("status=" + req.status);
        if (req.status < 400) {
            // статус запроса - ошибок нет
            strData = req.responseText;
            if (strData == null) {
                console.log("Failed to fetch login/loging.csv");
                retval = false;
            } else {
                // разбираем их
                let data = strData.split('\r\n');
                for(let i = 0; i < data.length; i++) {
                    let user = data[i].split(';');// элемент массива
                    if((login == user[0]) && (password == user[1])) {
                        console.log("me are here");
                        retval = true;
                        break;
                    }
                }
            }
            
        } else {
            // статус запроса - обработка ошибок
            retval = false;
        }
        console.log("retval=" + retval);
        if(retval) {
            overlay_new.style.display = "none";// скрываем окно входа
            showMainPage();// выводим главную страницу
        } else {
            alert("Проверьте правильность ввода логина или пароля!");
        }
    });
    req.addEventListener("error", function () {
        let err = new Error();
        console.log(err.message);
        
    });
    req.send(null);
}

function getURL(url, selector, callback) {
    let req = new XMLHttpRequest();// объект запроса
    req.open("GET", url, true);// открываем запрос
    req.addEventListener("load", function () {
        if (req.status < 400) {
            // статус запроса - ошибок нет
            callback(req.responseXML.querySelectorAll(selector));// возвращаем данные
        } else {
            // статус запроса - обработка ошибок
            callback(null, new Error("Request failed: " +
                req.statusText
            ));
        }
    });
    req.addEventListener("error", function () {
        callback(null, new Error("Network error"))
    });
    req.send(null);
}

function showMainPage() {
    getOrganizationData();
    // всё в порядке, показываем страницу с данными
    main_Page = document.querySelector('.main_');
    main_Page.style.display = "flex";

    let table = document.querySelector('table');// получаем таблицу в документе
    // в цикле будем формировать и добавлять новые строки в эту таблицу
    for (let i = 1; i <= 5; i++) {
        let tr = document.createElement('tr');// создаём строку
        // создаём столбцы таблицы и добавляем их в строку
        let td1 = document.createElement('td');
        td1.innerText = "address1";
        let td2 = document.createElement('td');
        td2.innerText = "count1";
        let td3 = document.createElement('td');
        let input = document.createElement('input');// в третьем столбце таблицы - поле ввода
        td3.appendChild(input);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        table.append(tr);
    }
}

function getURLCSV(url) {
    let req = new XMLHttpRequest();// объект запроса
    req.addEventListener("load", function () {
        console.log("status=" + req.status);
        if (req.status < 400) {
            // статус запроса - ошибок нет
            let text = req.responseText;
            // console.log("text=" + text);
            return text;// возвращаем данные
        } else {
            // статус запроса - обработка ошибок
            return null;
        }
    });
    req.addEventListener("error", function () {
        let err = new Error();
        console.log(err.message);
        return null;
    });
    req.open("GET", url, false);// открываем запрос
    req.send(null);
}

/**
 * Получает данные по организации и выводит их в форме
 */
function getOrganizationData(login) {
    let strData = getURLCSV("login/organization.csv");// получаем данные
    let dataArray = strData.split('\r\n');// получаем из данных массив
    // ищем вхождение
    let index = dataArray.indexOf(login);
    if(index != -1) {
        // если найден, получаем элемент, преобразуем его в массив
        let org = dataArray[index].split(";");
        // первый элемент - договор, второй - наименование, третий - код. Выводим
        let spanOrg = document.querySelector(".organization");
        spanOrg.innerHTML = org[1];
        let spanAgreement = document.querySelector(".agreement");
        spanOrg.innerHTML = org[0];
    }
}

// window.addEventListener("load", function (e) {
//     // окно входа/регистрации
//     overlay_new = document.querySelector('.overlay_new');
//     close_Popup_New = document.querySelector('.close-popup_new');
//     // при загрузке страницы отображаем окно входа/регистрации
//     setTimeout(() => {
//         // let overlay_new = document.querySelector('.overlay_new');
//         overlay_new.style.display = "block";
//     }, 1000);
//     close_Popup_New.addEventListener("click", function () {
//         // при щелчке на крестике в углу окна входа/регистрации закрываем его
//         overlay_new.style.display = "none";
//         console.log("Close popup");
//     });

// }
// );



// let table = document.querySelector('table');// получаем таблицу в документе
// // в цикле будем формировать и добавлять новые строки в эту таблицу
// for (let i = 1; i <= 5; i++) {
//     let tr = document.createElement('tr');// создаём строку
//     // создаём столбцы таблицы и добавляем их в строку
//     let td1 = document.createElement('td');
//     td1.innerText = "address1";
//     let td2 = document.createElement('td');
//     td2.innerText = "count1";
//     let td3 = document.createElement('td');
//     let input = document.createElement('input');// в третьем столбце таблицы - поле ввода
//     td3.appendChild(input);
//     tr.append(td1);
//     tr.append(td2);
//     tr.append(td3);
//     table.append(tr);
// }

// $(document).ready(function () {
//     // $('.button').click(function () {
//     //     $('.overlay').fadeIn();
//     // });

//     // $(document).mouseup(function () {
//     //     $('.overlay').fadeOut();
//     // });

//     $(window).on('load', function () {
//         setTimeout(function () {
//             // if($('.overlay').hasClass('disabled')){
//             //     return false;
//             // } else {
//             $('.overlay_new').fadeIn();
//             // }
//         }, 1000);
//     });

//     // $('.img_auto').click(function() {
//     //     $('.overlay_new').show();
//     // });
//     $('.close-popup_new').click(function () {
//         $('.overlay_new').hide();
//     });

//     $('.but').click(function (e) {
//         e.preventDefault();
//         if ($('.log input').val() == 'test' && $('.pas input').val() == 'test') {
//             alert("Авторизация пройдена успешно!");
//             if ($('.log input').val() != '') {
//                 $('.log input').val() == '';
//             }
//             if ($('.pas input').val() != '') {
//                 $('.pas input').val() == '';
//             }
//             $('.overlay_new').fadeOut();
//         } else {
//             alert("Регистрация пройдена успешно!");
//             if ($('.log input').val() != '') {
//                 $('.log input').val() == '';
//             }
//             if ($('.pas input').val() != '') {
//                 $('.pas input').val() == '';
//             }
//             $('.auto').fadeOut();
//         }
//     });
//     $('.btn').click(function (e) {
//         e.preventDefault();
//         $('.auto').show();
//         $('.overlay_new').hide();
//     });

//     $('.close-auto').click(function () {
//         $('.auto').hide();
//         $('.overlay_new').hide();
//     })
// })