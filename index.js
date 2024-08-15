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
    // проверяем их
    if (testLogin(login.value, pas.value)) {
        overlay_new.style.display = "none";// скрываем окно входа
        showMainPage();// выводим главную страницу
    } else {
        alert("Проверьте правильность ввода логина или пароля!");
    }
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
        return testLogin(login.value, pas.value);
    }
}

function testLogin(login, password) {
    // читаем файл с логинами и паролями
    // let reader = new FileReader();// объект для чтения файлов

    // reader.addEventListener("load", function (e) {
    //     console.log("load...");
    //     console.log("result " + reader.result.split('\n\r').forEach(element => {
    //         console.log(element);
    //     }));
    // });
    // reader.addEventListener("error", function () {
    //     console.log("error:" + reader.error);
    // });

    // let file = new File([], "loging.csv");
    // console.log("name=" + file.name, "size=" + file.size, "type=" + file.type, "path=" + file.webkitRelativePath);
    // reader.readAsText(file);
    // // console.log(reader.result);
    return true;
}

function showMainPage() {
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