// main.js

import { deposit, getNumberOfLines, getBet, spin, transpose, printRows, getWinnings } from './gameFunction.js';

const ROWS = 3;
const COLS = 3;

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

const game = () => {
    let balance = deposit();

    while (true) {
        console.log("you have a balance of $: " + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("you Won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("zero balance :)");
            const response = window.prompt("wanna play again (Y/N)? : ");
            if (response !== "Y") {
                break;
            } else {
                game();
            }
        }

        const playAgain = window.prompt("Do you wanna play (Y/N)?");
        if (playAgain !== "Y") console.log("Thanks for playing. Have a Good Day!");break;
    }

};

document.getElementById('startGameButton').addEventListener('click', () => {
    game();
});
document.getElementById('console-button').addEventListener('click', () => {
    alert("Right click on the page and then click on inspect button and then click on the console tab from the developer mode buttons visible:");    
});

