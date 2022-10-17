'use strict'

class Bank {
  #accounts;
  static nextNumber;
  constructor () {
    this.#accounts = [];
    Bank.nextNumber = 0;
  }

  get accounts(){
    return this.#accounts;
  }

  addAccount(){
    this.#accounts.push(new Account(++Bank.nextNumber));
    return Bank.nextNumber;
  }

  addSavingsAccount(interest){
    this.#accounts.push(new Savingsaccount(++Bank.nextNumber, interest));
    return Bank.nextNumber;
  }

  addCheckingAccount(overdraft){
    this.#accounts.push(new CheckingAccount(++Bank.nextNumber, overdraft));
    return Bank.nextNumber;
  }

  closeAccount(number){
    this.#accounts = [...this.#accounts].filter(account => account.getNumber() !== number);
  }

  accountReport(){
    return this.#accounts.map(acc => acc.toString()).join('\n');
  }

  endOfMonth(){
    return this.#accounts.map(acc => acc.endOfMonth()).filter(Boolean).join('\n');
  }
}
