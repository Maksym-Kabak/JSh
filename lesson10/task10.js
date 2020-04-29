function userCard(number) {

    const cardOptions = {
        balance : 100,
        transactionLimit : 100,
        historyLogs : [],
        key : number
    }
    if (number <= 3) {
        cardOptions.key = number;
    } else {
        cardOptions.key = 'Key Not Valid';
    }

    function getCardOptions() {
        return cardOptions

    }

    function addHistory(operationType, credits, operationTime) {
        cardOptions.historyLogs.push({operationType, credits, operationTime})
    }

    function putCredits(credit) {
        let now = new Date();
        let date = now.toLocaleDateString();
        let time = now.toLocaleTimeString();
        cardOptions.balance += credit;
        addHistory('putCredits', credit, date + ',' + time)

    }

    function takeCredits(credit) {
        let now = new Date();
        let date = now.toLocaleDateString();
        let time = now.toLocaleTimeString();
        if (credit <= cardOptions.transactionLimit && credit <= cardOptions.balance) {
            cardOptions.balance -= credit;
            addHistory('takeCredits', credit, date + ',' + time)
        } else {
            console.log('Error: Cant take credit');
        }


    }

    function setTransactionLimit(number) {
        let now = new Date();
        let date = now.toLocaleDateString();
        let time = now.toLocaleTimeString();
        cardOptions.transactionLimit = number
        addHistory('setTransactionLimit', number, date + ',' + time);
    }

    function transferCredits(sum, card) {
        let now = new Date();
        let date = now.toLocaleDateString();
        let time = now.toLocaleTimeString();
        let credit = Math.fround(sum * 1.005);
        if (credit <= cardOptions.transactionLimit && credit <= cardOptions.balance) {
            cardOptions.balance -= credit;
            card.putCredits(sum);
            addHistory('transferCredits', credit, date + ',' + time);
        } else {
            console.log('Error: Cant take credit');
        }
    }

    function getKey() {
    return number;
    }
    return {
        getCardOptions,
        putCredits,
        takeCredits,
        setTransactionLimit,
        transferCredits,
        getKey
    }

}

let userCard1 = userCard(1);
let userCard2 = userCard(2);
let userCard3 = userCard(3);
// let userCard4 = userCard();
// userCard1.takeCredits(22);
// userCard1.putCredits(250);
// userCard1.transferCredits(33, userCard2);
// console.log(userCard1.getCardOptions());
// console.log(userCard2.getCardOptions());
// console.log(userCard3.getCardOptions());
// console.log(userCard4.getCardOptions());


class UserAccount {
    constructor(name) {
        this.name = name;
        this.cards = [];
    }
}

UserAccount.prototype.addCard = function () {
    if (this.cards.length <= 3) {
        this.cards.push(new userCard(this.cards.length +1));
    } else {
        console.log('cards limit over');
    }
}
UserAccount.prototype.getInfo = function () {
    console.log(this);
}
UserAccount.prototype.getCardByKey = function (number) {
    return this.cards.find(value => value.getKey() === number)
}


let user1 = new UserAccount('Jora');
user1.addCard()
user1.addCard()
user1.getInfo()

let card1 = user1.getCardByKey(1);
let card2 = user1.getCardByKey(2);

card1.putCredits(500);
card1.setTransactionLimit(800);
card1.transferCredits(300, card2);
card2.takeCredits(50);

console.log(card1.getCardOptions());
console.log(card2.getCardOptions());


