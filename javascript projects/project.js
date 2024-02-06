// 1. deposit some money
// 2. determine number of lines to bet on 
// 3. collect a bet amount
// 4. spin the slot machine.
// 5 check if the user won
// 6. give the user their wining
// 7 or take back the money
// play again

const prompt = require("prompt-sync");

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOLS_VALUE = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}

const deposit = () => {
    while(true){
    const depositAmount = prompt("Enter a deposit amount in $ : ");
    const numberDepositAmount = parseFloat(depositAmount);

    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid amount try again:)");
    }
    else{
        const currentBalance = numberDepositAmount;
        return currentBalance;
    }


}
};

const getNumberOfLines = ()=>{
    while(true){
    const Lines = prompt("Enter the number of lines to bet on (1-3)  : ");
    const numberOfLines = parseFloat(Lines);

    if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3 ){
        console.log("Invalid Number of lines Try Again :)");
    }
    else{
        const LinesBt = numberOfLines;
        return LinesBt;
    }
    }
};


//calling functions :


const getBet =(balance,Lines) =>{
    while(true){
    const bet = prompt("Enter the Total bet per line in the pool  : ");
    const numberBet = parseFloat(bet);

    if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / Lines){
       console.log("Invalid Bet amount Try Again :)");
    }
    else{
        const betAmount = numberBet;
        return betAmount;
    }
}
};




const spin = () =>{
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT) ){
        for(let i = 0; i <count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i = 0; i<COLS;i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); 
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex, 1);
    } 
    }
    return reels;
};

const transpose = (reels) => {
    const rows  = [];

    for(let i = 0; i<ROWS; i++){
        rows.push([]);
        for(let j = 0; j<COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i,symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length -1){
                rowString += " | " 
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows,bet,Lines) =>{
    let winnings = 0;
    for(let row =0; row<Lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings += bet *SYMBOLS_VALUE[symbols[0]];
        }
    }
    return winnings;
}

