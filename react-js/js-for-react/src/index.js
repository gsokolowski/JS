// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


/***
 *
 * JavaScript for React Developers
 * https://www.youtube.com/watch?v=NCwa_xi0Uuc
 *
 * To start 
 * npm start
 * and look into console - js is there
 * 
 * 
 ***/

import { Teacher } from "./teacher"; // ./teacher is module teacher.js
/***
 *
 * ES6 Variables var let const
 *
 ***/
console.log("ES6 Variables var");
// var is accesable from outside of the block code (loop) thats way you should use let and const instead
function sayVarHello() {
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }

  console.log(i); // var is 5 and still accessable from the block of code (loop) - not good!
}
sayVarHello();

console.log("ES6 Variables let");
// Let is not accesable so use it instead of var
function sayLetHello() {
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }

  // index.js:26 Uncaught ReferenceError: i is not defined
  // console.log(i); // let is not accessable  from the block of code (loop) -  good!
}
sayLetHello();

// Summary - take a way

// Variables declared with var keyword are  scoped to the function and accessable anywhere in the function
// var -> function

// Variables declared with let keyword are scoped to block in which are defined and only there accessible
// var -> block

// Variables declared with const keyword are scoped to block in which are defined and only there accessible
// const -> block
console.log("ES6 Variables const");
const x = 1;
// Syntax error: "x" is read-only
//x = 2; // const can't change, let can
console.log(x);

/***
 *
 * ES6 Object Literal
 *
 ***/
console.log("ES6 Object Literal");

const personOne = {
  name: "Greg",
  talk() { }, // in ES6, in ES5 talk: function() {},
  walk() { }
};

// 2 ways of How to access object properties or methodes
//
// dot notation
personOne.talk();
personOne.name = "John";

// bracket notation is used when we don't know what method or property ahead of time we are going to use
personOne["name"] = "John";
// bracket notation is used when you access some fields from form and you don't know what the field name is
const targetMember = "name"; // name is an imput field on the form
personOne[targetMember.value] = "John";

/***
 *
 * ES6 Objects - this keyword
 * 'this' always returns reference to the Current Object
 *
 ***/
console.log("ES6 this keyword");
const personTwo = {
  name: "Lenka",
  surname: "Sokolowska",
  walk() {
    console.log(this); // this keyword is returning reference to the personTwo Object
  }
};

personTwo.walk(); // will give you object

const walkReference = personTwo.walk;
walkReference(); // it will give undefined (in strict mode - react has it by default) becouse it is called outside of the object. if not striced mode set then you would get reference to Window object on browser

// How to fix that? By using bind to bind a function to an object
// What does this meam?
// Functions in js are objects. They have properties and methodes we can use like e.g. bind()
// With the bind() method we can set the value of this keyword from object personTwo{} permanently so we do no get undefined like above
const walk = personTwo.walk.bind(personTwo); // you pass object personTwo as and agrument to personTwo.walk function (every function personTwo.walk in js is an object)
walk(); // now when you call it you will get person object - bind is fixing object to new function walk

/***
 *
 * ES6 Arrow functions
 * 'this' always returns reference to the Current Object
 *
 ***/

console.log("ES6 Arrow functions");
// old way of defining function
const squareA = function (number, number2) {
  return number * number2;
};
// new arrow function
const squareB = (number, number2) => {
  return number * number2;
};
// new arrow function short version
const squareC = (number, number2) => number * number2;

console.log(squareA(2, 4));
console.log(squareB(2, 4));
console.log(squareC(2, 4));

console.log("Where to use arrow functions");
// Where to use arrow functions
const jobs = [
  { id: 1, isActive: true },
  { id: 2, isActive: true },
  { id: 3, isActive: false },
  { id: 4, isActive: true }
];
// get only active jobs
console.log("Get only active jobs");
const activeJobs = jobs.filter(function (job) {
  // if true job.isActive it will be returned
  return job.isActive;
});
console.log(activeJobs);

// The same in arrow function
const activeJobsArrow = jobs.filter(job => job.isActive);
console.log(activeJobsArrow);

console.log("Get only not active jobs");
const notActiveJobs = jobs.filter(function (job) {
  // if false job.isActive it will be returned
  return !job.isActive;
});
console.log(notActiveJobs);

// The same in arrow function
const notActiveJobsArrow = jobs.filter(job => !job.isActive);
console.log(notActiveJobsArrow);

// filter() is and js array function
// https://www.w3schools.com/jsref/default.asp

/***
 *
 * ES6 Arrow functions and this keyword
 * 'this' always returns reference to the Current Object
 *
 ***/

console.log("ES6 Arrow functions and this keyword");
const personThree = {
  name: "Greg",
  talk() {
    setTimeout(function () {
      console.log("personThree this", this); // displays global Window object, becouse setTimeout function is a stand alone method and not a part of object personTree.
      // setTimeout is of Windows object
    }, 1000);

    console.log("personThree this2", this); // displays this object personThree
  }
};

personThree.talk();

// So haw to get access to this of object personThree inside callback setTimeout()
// In old times you would use
// var that = this;

const personFour = {
  name: "Greg",
  talk() {
    var that = this;
    setTimeout(function () {
      console.log("personFour that", that); // displays this object personFour.
      // setTimeout is of Windows object
    }, 1000);

    console.log("personFour this2", this); // displays this object personThree
  }
};
personFour.talk();

// In arrow finctions you dont need to do that = this
// arrow function will inherit this automaticaly

const personFive = {
  name: "Greg",
  talk() {
    setTimeout(() => {
      console.log("personFive this", this); // displays this object  personFive
      // setTimeout is of Windows object
    }, 1000);

    console.log("personFive this2", this); // displays this object  personFive
  }
};
personFive.talk();

/***
 *
 * ES6 Array.map() used in react to render list of items

 *
 ***/

console.log("ES6 Array.map() used in react to render list of items");

const colours = ["red", "green", "blue"];
// you pass a callback function into colors.map()

// map() does not modify original array colours
// map() transforms array of colours
const items1 = colours.map(function (colour) {
  return "<li>" + colour + "</li>";
});
console.log("items1", items1);

console.log("ES6 Colours Arrow function");
// Arrow function
const items2 = colours.map(colour => "<li>" + colour + "</li>");
console.log("items2", items2);

// Template literal is in ES6
console.log("ES6 Colours Template literal");
const items3 = colours.map(colour => `<li>${colour}</li>`);
console.log("items3", items3);

/***
 *
 * ES6 Object Destructuring is used a lot in React Js

 *
 ***/
console.log("ES6 Object Destructuring is used a lot in React Js");

const address = {
  street: "Thurbarn Road",
  city: "London",
  country: "Uk",
  continent: "Europe"
};

// old way of doing it
// const street = address.street;
// const city = address.city;
// const country = address.country;
//const continent = address.continent;

// you can rewrite this code like that
// new way of doing it
// const { street, city } = address; // no continent no country

// you can even rename variables like that
const { street: st, city: c } = address; // no continent no country
console.log("street", st);
console.log("city", c);

/***
 *
 * ES6 Spread operator used a lot in React JS

 *
 ***/
console.log("ES6 Spread operator used a lot in React JS");

// lets combine these 2 arrays
console.log("ES6 Spread operator - lets combine these 2 arrays");
const first = [1, 2, 3];
const second = [4, 5, 6];

// old way of doing it
const combined1 = first.concat(second);
console.log(combined1);

// spread operator ...first gets every iteam seperatelly and places it into and array []
const combined2 = [...first, ...second];
console.log(combined2);

// spread operator allowes you to add element in the middle if you need it
const combined3 = [...first, "a", "b", "c", ...second, "d", "e", "f"];
console.log(combined3);

//ES6 Spread operator - lets clone first array
console.log("ES6 Spread operator - lets clone first array");
const clone = [...first];
console.log(first);
console.log(clone);

//ES6 Spread operator - applyed on objects
console.log("ES6 Spread operator - applyed on objects");
const obFirst = { name: "Greg" };
const obSecond = { name: "Instructor" };

const combinedObject = { ...obFirst, ...obSecond, location: "Australia" };
console.log(combinedObject);

// If you want to clone and object do
console.log("If you want to clone and object do");
const obCloned = { ...obFirst };
console.log(obCloned);

/***
 *
 * ES6 Classes
 *
 ***/
console.log("ES6 - Classes");

class Person2 {
  constructor(name) {
    this.name = name;
  }
  walk() {
    console.log("walk method caled");
  }
}

const personSix = new Person2("Gregory");
personSix.walk();

/***
 *
 * ES6 Classes Inheritance
 *
 ***/
console.log("ES6 - Classes inheritance");

class Teacher2 extends Person2 {
  constructor(name, degree) {
    super(name); //this is to call constructuro for class Person above becouse you extand Teacher
    this.degree = degree; // this is part of Teacher class
  }
  teach() {
    console.log("teach method called");
  }
}

const personSeven = new Teacher2("Gregory", "Msc");
personSeven.walk();
personSeven.teach();

// Whenever we create component in react we should have this component to
// extand the BASE COMPONENT that is defined in reactjs
console.log(
  "Whenever we create component in react we should have this component to extand the BASE COMPONENT that is defined in reactjs"
);

/***
 *
 * ES6 Modules
 *
 ***/
console.log("ES6 - Modules");
// This import needs to be at the top of the file
// import { Teacher } from "./teacher";

const personEight = new Teacher("Gregory", "Msc");
personEight.walk();
personEight.teach();

/***
 *
 * ES6 Named and Default modules
 *
 ***/
console.log("ES6 - ES6 Named and Default modules");

// import { Person } from "./person"; // Named import
// import Person from "./person"; // Default import
// import Person, { promote } from "./person"; // Default import amd named import of single function
// import React, { Component } from "react"; // typical react imports
