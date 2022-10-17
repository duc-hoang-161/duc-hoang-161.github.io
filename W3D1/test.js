describe('Account Class', function () {
  const ACCOUNT_NUMBER = 4321
  let account
  beforeEach(function () {
    account = new Account(ACCOUNT_NUMBER)
  })
  describe('constructor', function () {
    it('Should create account object success with initial data', function () {
      assert(account)
      assert.equal(ACCOUNT_NUMBER, account.getNumber())
      assert.equal(0, account.getBalance())
    })
  })
  describe('deposit', function () {
    it('Should change the account balance after deposit positive amount', function () {
      const currentBalance = account.getBalance()
      const DEPOSIT_AMOUNT = 2000
      account.deposit(DEPOSIT_AMOUNT)
      assert.equal(currentBalance + DEPOSIT_AMOUNT, account.getBalance())
    })
    it('Should receive error if deposit negative amount', function () {
      const currentBalance = account.getBalance()
      const DEPOSIT_AMOUNT = -2000
      chai.expect(() => account.deposit(DEPOSIT_AMOUNT)).to.throw('Deposit amount has to be greater than zero')
      assert.equal(currentBalance, account.getBalance())
    })
  })
  describe('withdraw', function () {

    it('Should receive error if withdraw negative amount', function () {
      const currentBalance = account.getBalance()
      const WITHDRAW_AMOUNT = -2000
      chai.expect(() => account.withdraw(WITHDRAW_AMOUNT)).to.throw('Withdraw amount has to be greater than zero')
      assert.equal(currentBalance, account.getBalance())
    })
    it('Should receive error if withdraw more than current balance', function () {
      const currentBalance = account.getBalance()
      const WITHDRAW_AMOUNT = 2000
      chai.expect(() => account.withdraw(WITHDRAW_AMOUNT)).to.throw('Insufficient funds')
      assert.equal(currentBalance, account.getBalance())
    })
    it('Should change the balance after withdrawing correct amount', function () {
      const currentBalance = account.getBalance()
      const DEPOSIT_AMOUNT = 3000
      account.deposit(DEPOSIT_AMOUNT)
      const WITHDRAW_AMOUNT = 2000
      account.withdraw(WITHDRAW_AMOUNT)
      assert.equal(DEPOSIT_AMOUNT - WITHDRAW_AMOUNT, account.getBalance())
    })
  })
  describe('toString', function () {
    it('Should return correct format', function () {
      assert.equal(`Account ${account.getNumber()}: balance ${account.getBalance()}`, account.toString())
    })
  })
  describe('endOfMonth', function () {
    it('Should return empty', function () {
      assert.equal('', account.endOfMonth())
    })
  })
})
describe('SavingAccount Class', function () {
  const ACCOUNT_NUMBER = 4321
  const INTEREST = 5
  let account
  beforeEach(function () {
    account = new Savingsaccount(ACCOUNT_NUMBER, INTEREST)
  })
  describe('constructor', function () {
    it('Should create account object success with initial data', function () {
      assert(account)
      assert.equal(ACCOUNT_NUMBER, account.getNumber())
      assert.equal(0, account.getBalance())
      assert.equal(INTEREST, account.interest)
    })
  })
  describe('addInterest', function () {
    it('Should increase the balance after adding interest', function () {
      const DEPOSIT_AMOUNT = 1000
      account.deposit(DEPOSIT_AMOUNT)
      const expectedBalance = account.getBalance() + account.getBalance() * account.interest / 100
      account.addInterest()
      assert.equal(expectedBalance, account.getBalance())
    })

  })
  describe('toString', function () {
    it('Should return correct format', function () {
      assert.equal(`Account ${account.getNumber()}: balance ${account.getBalance()}, interest ${account.interest}%`, account.toString())
    })
  })
  describe('endOfMonth', function () {
    it('Should return correct output', function () {
      const DEPOSIT_AMOUNT = 1000
      account.deposit(DEPOSIT_AMOUNT)
      const output = account.endOfMonth()
      assert.equal(`Interest added Account ${account.getNumber()}: balance ${account.getBalance()}, interest ${account.interest}%`, output)
    })
  })
})
describe('CheckingAccount Class', function () {
  const ACCOUNT_NUMBER = 4321
  const OVERDRAFT_LIMIT = 300
  const INITIAL_BALANCE = 3000
  let account
  beforeEach(function () {
    account = new CheckingAccount(ACCOUNT_NUMBER, OVERDRAFT_LIMIT)
    account.deposit(INITIAL_BALANCE)
  })
  describe('constructor', function () {
    it('Should create account object success with negative overdraft limit', function () {
      chai.expect(() => new CheckingAccount(ACCOUNT_NUMBER, -OVERDRAFT_LIMIT)).to.throw('Overdraft limit should be a positive amount')
    })
    it('Should create account object success with initial data', function () {
      assert(account)
      assert.equal(ACCOUNT_NUMBER, account.getNumber())
      assert.equal(INITIAL_BALANCE, account.getBalance())
      assert.equal(OVERDRAFT_LIMIT, account.overdraftLimit)
    })
  })
  describe('withdraw', function () {
    it('Should receive error if withdraw negative amount', function () {
      const currentBalance = account.getBalance()
      const WITHDRAW_AMOUNT = -2000
      chai.expect(() => account.withdraw(WITHDRAW_AMOUNT)).to.throw('Withdraw amount has to be greater than zero')
      assert.equal(currentBalance, account.getBalance())
    })
    it('Should receive error if withdraw more than overdraft limit', function () {
      const currentBalance = account.getBalance()
      const overdraftAmount = currentBalance + account.overdraftLimit
      chai.expect(() => account.withdraw(overdraftAmount + 1)).to.throw('Over overdraft limit')
      assert.equal(currentBalance, account.getBalance())
    })
    it('Should success to change the balance if withdraw under the overdraft limit', function () {
      const currentBalance = account.getBalance()
      const overdraftAmount = currentBalance + account.overdraftLimit
      chai.expect(() => account.withdraw(overdraftAmount)).to.not.throw('Over overdraft limit')
      assert.equal(-account.overdraftLimit, account.getBalance())
    })
    it('Should change the balance after withdrawing correct amount', function () {
      const currentBalance = account.getBalance()
      const WITHDRAW_AMOUNT = 2000
      account.withdraw(WITHDRAW_AMOUNT)
      assert.equal(currentBalance - WITHDRAW_AMOUNT, account.getBalance())
    })
  })
  describe('toString', function () {
    it('Should return correct format', function () {
      assert.equal(`Account ${account.getNumber()}: balance ${account.getBalance()}, overdraft limit ${account.overdraftLimit}`, account.toString())
    })
  })
  describe('endOfMonth', function () {
    it('Should return empty if the balance is positive', function () {
      account.withdraw(account.getBalance() / 2)
      const output = account.endOfMonth()
      assert.equal('', output)
    })
    it('Should return warning message if the balance is negative', function () {
      account.withdraw(account.getBalance() + 1)
      const output = account.endOfMonth()
      assert.equal(`Warning, low balance Account ${account.getNumber()}: balance ${account.getBalance()}, overdraft limit ${account.overdraftLimit}`, output)
    })
  })
})
describe('Bank', function () {
  let bank
  beforeEach(function () {
    bank = new Bank()
  })
  describe('constructor', function () {
    it('Should create new bank object with zero account', function () {
      assert.equal('', bank.accountReport())
      assert.equal(0, Bank.nextNumber)
    })
  })
  describe('addAccount', function () {
    it('Should create new accounts', function () {
      const NUMBER_OF_ACCOUNTS = 10
      const createdAccountNumbers = Array(NUMBER_OF_ACCOUNTS).fill('').map(() => bank.addAccount())
      assert.equal(NUMBER_OF_ACCOUNTS, createdAccountNumbers.length)
      assert.equal(NUMBER_OF_ACCOUNTS, bank.accounts.length)
      assert.equal(true, bank.accounts.every(createdAccount => createdAccountNumbers.includes(createdAccount.getNumber())))
    })
  })
  describe('addSavingsAccount', function () {
    it('Should create new savings accounts', function () {
      const NUMBER_OF_ACCOUNTS = 10
      const createdAccountNumbers = Array(NUMBER_OF_ACCOUNTS).fill('').map((v, i) => bank.addSavingsAccount(i + 1))
      assert.equal(NUMBER_OF_ACCOUNTS, createdAccountNumbers.length)
      assert.equal(NUMBER_OF_ACCOUNTS, bank.accounts.length)
      assert.equal(true, bank.accounts.every(createdAccount => createdAccountNumbers.includes(createdAccount.getNumber())))
    })
  })
  describe('addCheckingAccount', function () {
    it('Should create new checking accounts', function () {
      const NUMBER_OF_ACCOUNTS = 10
      const createdAccountNumbers = Array(NUMBER_OF_ACCOUNTS).fill(1).map((v, i) => (v + i) * 100).map(overdraft => bank.addCheckingAccount(overdraft))
      assert.equal(NUMBER_OF_ACCOUNTS, createdAccountNumbers.length)
      assert.equal(NUMBER_OF_ACCOUNTS, bank.accounts.length)
      assert.equal(true, bank.accounts.every(createdAccount => createdAccountNumbers.includes(createdAccount.getNumber())))
    })
  })
  describe('closeAccount', function () {
    it('Shouldn\'t remove account if number doesn\'t match', function () {
      const account = bank.addAccount()
      const savingsAccount = bank.addSavingsAccount(4)
      const checkingAccount = bank.addCheckingAccount(300)
      assert.equal(3, bank.accounts.length)
      bank.closeAccount(Bank.nextNumber + 1)
      assert.equal(3, bank.accounts.length)
    })
    it('Should remove accounts', function () {
      const accountNumber = bank.addAccount()
      const savingsAccountNumber = bank.addSavingsAccount(4)
      const checkingAccountNumber = bank.addCheckingAccount(300)
      assert.equal(3, bank.accounts.length)
      bank.closeAccount(accountNumber)
      assert.equal(2, bank.accounts.length)
      bank.closeAccount(savingsAccountNumber)
      assert.equal(1, bank.accounts.length)
      bank.closeAccount(checkingAccountNumber)
      assert.equal(0, bank.accounts.length)
    })
  })
  describe('accountReport', function () {
    it('Shouldn return correct account report', function () {
      const account = bank.addAccount()
      const savingsAccount = bank.addSavingsAccount(4)
      const checkingAccount = bank.addCheckingAccount(300)
      assert.equal(3, bank.accountReport().split('\n').length)
      assert.equal(`Account ${account}: balance 0\nAccount ${savingsAccount}: balance 0, interest 4%\nAccount ${checkingAccount}: balance 0, overdraft limit 300`, bank.accountReport())
    })
  })
  describe('endOfMonth', function () {
    it('Shouldn return correct output', function () {
      bank.addAccount()
      const savingsAccountNumber = bank.addSavingsAccount(4)
      const checkingAccountNumber = bank.addCheckingAccount(300)
      bank.addCheckingAccount(300)
      const savingAccount = bank.accounts.find(acc => acc.getNumber() === savingsAccountNumber)
      savingAccount.deposit(3000)
      const checkingAccount = bank.accounts.find(acc => acc.getNumber() === checkingAccountNumber)
      checkingAccount.deposit(2000)
      checkingAccount.withdraw(checkingAccount.getBalance() + checkingAccount.overdraftLimit / 2)
      const output = bank.endOfMonth()
      assert.equal(`Interest added Account ${savingsAccountNumber}: balance ${savingAccount.getBalance()}, interest ${savingAccount.interest}%\nWarning, low balance Account ${checkingAccount.getNumber()}: balance ${checkingAccount.getBalance()}, overdraft limit ${checkingAccount.overdraftLimit}`, output)
    })
  })
})
