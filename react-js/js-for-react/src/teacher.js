// Named import
import { Person } from "./person"; // ./person is module person.js

export class Teacher extends Person {
  constructor(name, degree) {
    super(name); //this is to call constructuro for class Person above becouse you extand Teacher
    this.degree = degree; // this is part of Teacher class
  }
  teach() {
    console.log("teach method called");
  }
}
