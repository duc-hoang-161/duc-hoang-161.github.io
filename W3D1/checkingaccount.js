"user strict"

class CheckingAccount extends Account {
  constructor (number, overdraftLimit) {
    super(number)
    if(overdraftLimit < 0) throw Error("Overdraft limit should be a positive amount");
    this._overdraftLimit = overdraftLimit
  }

  get overdraftLimit(){
    return this._overdraftLimit;
  }

  set overdraftLimit(overdraftLimit) {
    this._overdraftLimit = overdraftLimit;
  }

  withdraw (amount) {
    if (amount <= 0) {
      throw new RangeError("Withdraw amount has to be greater than zero");
    }

    if(-this._overdraftLimit > this._balance - amount){
      throw Error("Over overdraft limit");
    }

    this._balance -= amount;
  }

  toString () {
    return `Account ${this.getNumber()}: balance ${this.getBalance()}, overdraft limit ${this._overdraftLimit}`;
  }

  endOfMonth () {
    if(this._balance >= 0){
      return "";
    }
    return `Warning, low balance ${this.toString()}`;
  }
}
