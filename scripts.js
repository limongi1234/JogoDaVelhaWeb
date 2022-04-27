const X_CLASS = 'X';
const O_CLASS = 'O';
var currentClass

var x_turn = true; //Will toggle between X's and O's turn

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

const tiles = document.querySelectorAll ('div.tile');


startGame ();


function startGame () 
{
    
    tiles.forEach ( tile => 
        {
        tile.classList.remove (X_CLASS);
        tile.classList.remove (O_CLASS);
        tile.innerHTML = '';
        winningMessage.classList.remove ('show')
        tile.addEventListener ('click', handleClick, { once: true});
    });
    
}


// Reset tiles
document.querySelector ('#restartButton').addEventListener ('click', startGame);
document.querySelector ('#resetButton').addEventListener ('click', startGame);


function handleClick (e) 
{

    // Place the mark
    const tile = e.target;
    if (x_turn) 
    {
        currentClass = X_CLASS
        tile.style.color = 'rgb(239, 71, 111)';
        tile.innerHTML = 'X';
        
    } else 
    {
        currentClass = O_CLASS
        tile.style.color = 'rgb (255, 183, 3 )';
        tile.innerHTML = 'O';
    }
    
    tile.classList.add (currentClass)

    // Check for Win
    if (checkWin (currentClass)) 
    {
        winningText.innerText = `${x_turn ? "X" : "O"} wins!`
        winningMessage.classList.add ('show')
    }
    
    if (checkDraw()) 
    {
        // Check for Draw
        winningText.innerText = "It's a draw!"
        winningMessage.classList.add ('show')
    }

    // Switch turns
    x_turn = !x_turn;

}

function checkWin (currentClass) 
{
    // Will return true if any of the values inside of it are true
    return WINNING_COMBINATIONS.some (combination => 
        { // This will loop over all the combinations
        // For each of the combinations, we want to check if all of the indexes have the same class
        return combination.every (index => 
            {
            return tiles[index].classList.contains(currentClass);
        });
    });
}

function checkDraw () 
{
    // Check if every single tile has been marked
    // [... ] de-structures 'tiles' to an array so it can have the 'every' method
    return [...tiles].every (tile => 
    {
        return tile.classList.contains (X_CLASS) || tile.classList.contains (O_CLASS)
    })
}