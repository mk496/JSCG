console.log('hello from main js');

class Account {
    constructor(balance, currency, number) {
        this.balance = balance;
        this.currency = currency;
        this.number = number;
    };
};

class Person {
    constructor(firstName, lastName, accounts) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.accounts = accounts;
    };

    addAccount(account) {
        this.accounts.push(account);
    };

    sayHello() {
        return `Hi, my name is ${this.firstName} ${this.lastName} and I have ${this.accounts.length} bank account(s) with total balance ${this._calculateBalance()}`;
    };

    filterPositiveAccounts() {
        return this.accounts.filter(account => account.balance > 0);
    };

    findAccount(accountNumber) {
        return this.accounts.find(account => account.number === accountNumber);
    };

    withdraw(accountNumber, amount) {
        const promise = new Promise((resolve, reject) => {
            const foundAccount = this.findAccount(accountNumber);

            if (foundAccount && foundAccount.balance >= amount) {
                setTimeout(() => {
                    foundAccount.balance = foundAccount.balance - amount;
                    resolve(`Operation successful, withdrawn ${amount} from account ${accountNumber}, remaining balance ${foundAccount.balance}`);
                }, 3000);
            } else if (!foundAccount) {
                reject('Incorrect account number')
            } else {
                reject(`Not enough funds on account number ${accountNumber}`);
            }
        });

        return promise;
    };

    _calculateBalance() {
        let totalBalance = 0;

        for (let account of this.accounts) {
            totalBalance = totalBalance + account.balance;
        }

        return totalBalance;
    };
};

const person = new Person('John', 'Example', [new Account(1500, 'EUR', 1)]);
console.log(person.sayHello());
person.addAccount(new Account(-2500, 'EUR', 2));
console.log(person.sayHello());
console.log(person.filterPositiveAccounts());


person.withdraw(1, 200)
    .then(success => {
        console.log(success);
        console.log('------------------after successful withdrawal--------------------------')
        console.log(person.sayHello());
    })
    .catch(error => console.warn(error));

person.withdraw(2, 200).catch(error => console.warn(error));
person.withdraw(3, 500).catch(error => console.warn(error));
