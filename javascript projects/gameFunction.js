// gameFunctions.js
// gameFunctions.js

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const SYMBOLS_VALUE = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};


export const deposit = () => {
    while (true) {
        const depositAmount = window.prompt("Enter a deposit amount in $: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            if(numberDepositAmount == 'c'){
                break;
            }
            console.log("Invalid amount, try again:)");
        } else {
            return numberDepositAmount;
        }
    }
};

export const getNumberOfLines = () => {
    while (true) {
        const lines = window.prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            if(numberOfLines== 'c'){
                break;
            }
            console.log("Invalid number of lines, try again:)");
        } else {
            return numberOfLines;
        }
    }
};


export const getBet = (balance, Lines) => {
    while (true) {
        const bet = window.prompt("Enter the Total bet per line in the pool  : ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / Lines) {
            if(numberBet == 'c'){
                break;
            }
            console.log("Invalid Bet amount Try Again :)");
        } else {
            return numberBet;
        }
    }
};

export const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    const ROWS = 3;
    const COLS = 3;

    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

export const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < reels[0].length; i++) {
        rows.push([]);
        for (let j = 0; j < reels.length; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

export const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i !== row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

export const getWinnings = (rows, bet, Lines) => {
    let winnings = 0;
    for (let row = 0; row < Lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol !== symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOLS_VALUE[symbols[0]];
        }
    }
    return winnings;
};
