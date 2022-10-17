'use strict';

class Savingsaccount extends Account{
  constructor (number, interest) {
    super(number);
    this._interest = interest;
  }

  set interest(interest){
    this._interest = interest;
  }
  get interest(){
    return this._interest;
  }

  addInterest(){
    this._balance += this._balance * this._interest / 100;
  }

  toString(){
    return `Account ${this._number}: balance ${this._balance}, interest ${this._interest}%`;
  }

  endOfMonth(){
    this.addInterest();
    return `Interest added ${this.toString()}`;
  }
}
