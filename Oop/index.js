class Bank {
    constructor(name){
        this.name = name
        this.members = []
    }

    register(person, type, balance) {
        if (type === 'platinum') {
            let minimumBalance = 50000
            if (balance < minimumBalance) {
                console.log('Saldo awal kurang dari minimum saldo yang ditentukan')
            } else {
                if(type === "platinum"){
                    let member = new PlatinumMember(person.name, minimumBalance, type, balance)
                    this.members.push(member)
                    person.bankAccount = member

                    console.log(`Selamat datang ke Yudhistira Bank, ${person.name}. Nomor Akun anda adalah ${member.accountNumber}. Total saldo adalah ${balance}`)


                }
            }
            
        } else {
            let minimumBalance = 30000
            if (balance < minimumBalance) {
                console.log('Saldo awal kurang dari minimum saldo yang ditentukan')
            } else {
                if(type === "silver"){
                    let member = new SilverMember(person.name, minimumBalance, type, balance)
                    this.members.push(member)
                    person.bankAccount = member

                    console.log(`Selamat datang ke Yudhistira Bank, ${person.name}. Nomor Akun anda adalah ${member.accountNumber}. Total saldo adalah ${balance}`)
                }
            }
        }
    }
}

class Person {
    constructor(name, bankAccount) {
        this.name = name
        this.bankAccount = bankAccount
    }
}

class Member {
    constructor(memberName, minimumBalance, type, balance) {
        this.memberName = memberName
        this.accountNumber = Math.floor(Math.random() * 10000000); 
        this.minimumBalance = minimumBalance
        this.transactions = []
        this.type = type
        this.balance = balance
    }

    credit (nominal) {
        let date = new Date()
        let transactions = new Transaction(nominal, 'credit', date, 'setor')
        if (nominal < 10000) {
            console.log('Belum memenuhi minimal uang yang dapat di setor')
        } else {
            this.balance += nominal
            this.transactions.push(transactions)
            console.log('anda sukses menyimpan uang kedalam bank')
        }
    }

    debet (nominal, note) {
        let date = new Date()
        let transactions = new Transaction(nominal,'debet', date, note)
        if (this.balance - nominal <= this.minimumBalance && this.balance - nominal >= 0) {
            console.log('Saldo minimum anda tidak terpenuhi untuk melakukan transaksi.')
        } else if (this.balance - nominal < 0) {
            console.log('saldo anda tidak cukup')
        } else {
            this.balance -= nominal
            this.transactions.push(transactions)
            console.log('anda sukses menarik uang dari bank')
        }
    }

    transfer (who, nominal) {
        let date = new Date()
        let debetTransactions = new Transaction(nominal, 'debet', date, `transfer to ${who.memberName}`)
        let creditTransactions = new Transaction(nominal, 'credit', date, `Transfer from ${this.memberName}`)
        if (this.balance - nominal <= this.minimumBalance ) {
            console.log('anda gagal')
        } else {
            who.balance += nominal
            this.balance -= nominal
            this.transactions.push(debetTransactions)
            who.transactions.push(creditTransactions)
            console.log('anda berhasil')
        }
    }
}

class Transaction {
    constructor(nominal, status, date, note) {
        this.nominal = nominal
        this.date = date
        this.note = note
        this.status = status
    }
}

class PlatinumMember extends Member{
    constructor(memberName, minimumBalance, type, balance){
        super(memberName, minimumBalance, type, balance)
        this.minimumBalance = minimumBalance
        this.type = "platinum"
    }
}

class SilverMember extends Member{
    constructor(memberName, minimumBalance, type, balance){
        super(memberName, minimumBalance, type, balance)
        this.minimumBalance = minimumBalance
        this.type = "silver"
    }
}


let yudhistiraBank = new Bank('Yudhistira Bank')
let nadia = new Person('Nadia')
yudhistiraBank.register(nadia, 'platinum', 30000)
// Saldo awal kurang dari minimum saldo yang ditentukan
yudhistiraBank.register(nadia, 'platinum', 50000)
//Selamat datang ke Yudhistira Bank, Nadia. Nomor Akun anda adalah 6332937. Total saldo adalah 50000

let nadiaAccount = nadia.bankAccount
console.log(nadiaAccount)


/* PASTIKAN BAHWA SALDO SELALU BERKURANG ATAU BERTAMBAH UNTUK SETIAP TRANSAKSI */
nadiaAccount.credit(300000)
// Anda sukses menyimpan uang ke dalam bank.
nadiaAccount.credit(1000)
// Belum memenuhi minimal uang yang dapat di setor
nadiaAccount.debet(200000, 'Beli Keyboard')
// Anda sukses menarik uang dari bank
nadiaAccount.debet(120000, 'Beli Keyboard Lagi')
// Saldo minimum anda tidak terpenuhi untuk melakukan transaksi.
nadiaAccount.debet(600000, 'Bisa gak ya lebih besar dari balance ? ')
// Saldo anda tidak cukup


let semmi = new Person('Semmi Verian')
yudhistiraBank.register(semmi, 'silver', 10000000)
let semmiAccount = semmi.bankAccount

nadiaAccount.transfer(semmiAccount, 50000)
// Anda sukses transfer ke Semmi Verian
nadiaAccount.transfer(semmiAccount, 1000000)
// Anda gagal transfer ke Semmi Verian

console.log(nadiaAccount)
console.log(semmiAccount)