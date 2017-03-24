class User {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string){
        this.fullName =`${firstName}-${middleInitial}-${lastName}`;
    }
}

interface greetInterface {
    firstName: string;
    lastName: string;
    fullName: string;
}

function greeting(person: greetInterface) {
    return person;
}

let user = new User('Vova', 'asd', 'Yaryhin');

console.log(greeting(user));
