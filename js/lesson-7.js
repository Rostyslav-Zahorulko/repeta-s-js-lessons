// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// І. ФУНКЦИЯ ОБРАТНОГО ВЫЗОВА (CALLBACK ФУНКЦИЯ)

// Функция высшего порядка - функция, которая или принимает другую функцию как параметр, или возвращает ее во внешний код
// Функция обратного вызова - функция, которая передается в другую функцию в качестве аргумента

// ____________________________________________________________________________________________________________________

// Пример 1:

const fnA = function () {
  console.log('Привет!');
};

const fnB = function (param) {
  param();
};

fnB(fnA);

// ____________________________________________________________________________________________________________________

// Пример 2:

const greet = function (name) {
  console.log(`Hello! My name is ${name}.`);
};

const greetWithName = function (callback) {
  console.log(callback);

  callback('Mango');
};

greetWithName(greet);

// Механизм работы:

// 1. Создается callback функция (КФ) greet()
// 2. Создается функция высшего порядка (ФВП) greetWithName()
// 3. Вызывается ФВП. В качестве аргумента ей передается КФ
// 4. КФ записывается в параметр callback ФВП
// 5. ФВП начинает исполнение
// 6. КФ вызывается внутри ФВП. В качестве аргумента ей передается строка 'Mango'
// 7. 'Mango' записывается в параметр name КФ
// 8. КФ исполняется
// 9. ФВП завершает исполнение

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// ІІ. СТЕК ВЫЗОВОВ

// https://youtu.be/414JiAS0pPE?t=1570 - рассмотрение стека вызовов на 4-м занятии
// https://youtu.be/ibTnZY3hs_8?t=1363

// Стек вызовов - механизм, который регулирует порядок (очередность) исполнения функций.
// Стек вызовов - структура, в которую помещаются вызовы функций.
// Принцип работы - "последним пришел, первым ушел" (LIFO).

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// ІІІ. ЛЕКСИЧЕСКОЕ ОКРУЖЕНИЕ

// https://youtu.be/ibTnZY3hs_8?t=1999

// Область видимости - доступность переменных в каком-то месте кода.
// Область видимости - это концепция языка
// Лексическое окружение (ЛО) - механизм, который отвечает за реализацию концепции областей видимости
// ЛО создается в момент вызова функции, а не в момент ее обьявления
// У каждого ЛО есть Record - таблица доступных внутри него переменных и Parent - ссылка на родительское ЛО

// _________________________________________________________________________________________________________________

// Пример:

// 1. Когда начинается исполнение скрипта, создается глобальное ЛО

/*
   Global env
   Record: {}
   Parent: null
*/

// 2. Когда интерпретатор встречает переменную, он обновляет Record глобального ЛО

const x = 10;

/*
   Global env
   Record: {x: 10}
   Parent: null
*/

// 3. Когда интерпретатор встречает переменную, он обновляет Record глобального ЛО

const y = 20;

/*
   Global env
   Record: {x: 10, y: 20}
   Parent: null 
*/

// 4. Когда интерпретатор встречает объявлении функции, он записывает в ее внутреннее скрытое свойство Environment
//    ссылку на ее родительское ЛО. ЛО самой функции при этом не создается!!!

/*
   [[Environment]] = Global env
*/

const foo = function (z) {
  /*
   Foo env
   Record: {z: 30}
   Parent: Global env 
*/

  // 7. Встретив переменную, интерпретатор обновляет Record ЛО функции

  const x = 100;

  /*
   Foo env
   Record: {z: 30, x: 100}
   Parent: Global env 
*/

  // Встретив return, интерпретатор начинает искать значения указанных идентификаторов в Record локального ЛО - ЛО функции
  // Если не находит, продолжает поиск в Reсord глобального ЛО - ЛО скрипта

  return x + y + z; // 100 + 20 + 30
};

// 5. Также обновляется Record глобального ЛО

/*
   Global env
   Record: {x: 10, y: 20, foo: <function>}
   Parent: null 
*/

// 6. Увидев вызов функции, интерпретатор заходит в ее тело и создает ее ЛО
//    В его Parent копируется ссылка на родительское ЛО функции, записанная в ее Environment в момент ее объявления (создания)

foo(30); // 150

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// IV. ЗАМЫКАНИЕ (CLOSURE)

// https://youtu.be/ibTnZY3hs_8?t=3000

// Замыкание - это связь между функцией и ее цепочкой областей видимости

// _________________________________________________________________________________________________________________

// Пример:

/*
    const buz = function () {
      const x = 5;

      return function () {
        console.log(x); // 5
      };
    };

    const outerFn = buz();

    outerFn(); // 5
*/

// _________________________________________________________________________________________________________________

// Разбор примера:

/* 1.
   Global env
   Record: {}
   Parent: null
*/

/* 2.
   [[Environment]]: Global env
*/

const buz = function () {
  /* 4.
   Buz env
   Record: {}
   Parent: Global env
*/

  const x = 5;

  /* 5.
   Buz env
   Record: {x: 5}
   Parent: Global env
*/

  /* 6.
   [[Environment]]: Buz env
*/

  return function () {
    /* 8.
   Anon env
   Record: {}
   Parent: Buzz env
*/

    console.log(x); // 5
  };
};

/* 3.
   Global env
   Record: {buz: <function>}
   Parent: null
*/

const outerFn = buz();

/* 7.
   Global env
   Record: {buz: <function>, outerFn: <function>}
   Parent: null
*/

// console.log(outerFn);

outerFn(); // 5

// _________________________________________________________________________________________________________________

// Т. о., замыкание - это способность функции запоминать лексическое окружение, в котором она была создана,
// и продолжать получать доступ к переменным из него независимо от места ее вызова.

// Замыкания существуют благодаря лексическим окружениям

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
