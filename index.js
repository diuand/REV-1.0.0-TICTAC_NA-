// DOM elements
const cells = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const win_message_text = document.querySelector('[win_message_text]')
const win_message = document.getElementById('win_message')
const restart_btn = document.getElementById('restart_button')

// win conditions
const WIN_COMBINATION = [
    [0,1,2],[3,4,5],[6,7,8], //orizontal
    [0,3,6],[1,4,7],[2,5,8], //vertical
    [0,4,8],[2,4,6]          //diagonal
]

// turns
let x_turn 
let X_CLASS = 'x'
let O_CLASS ='o'

// starting the game
start_game()



// starting the game
function start_game(){
    // remove end message
    win_message.classList.remove('show')
    x_turn = true

    // hover style before click
    hover()

    // wait for clicking the cells
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.addEventListener('click', clicked)
    });

}

function hover(){
    // reset implicit board class
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)

    // set board class on turns
    if (x_turn){
        board.classList.add(X_CLASS)
    }else{
        board.classList.add(O_CLASS)
    }
}


function clicked(e){
    // get the cell
    const cell = e.target

    // set the class based on turn
    const turn = x_turn ? X_CLASS : O_CLASS
    add_class(cell,turn)

    // verify if somewone win
    if (check_win(turn)){
        end_game(false)
    }else if (isDraw()){
        end_game(true)
    }
    
    // change turn
    swap_turn()

    // hover next element
    hover()
}

// add the actual turn in cell class
function add_class(cell,turn){
    cell.classList.add(turn)
}

// swap turns
function swap_turn(){
    x_turn = !x_turn
}


// verify every cell with every situation in WIN_COMBINATION
function check_win(turn) {
    return WIN_COMBINATION.some(combiation => {
        return combiation.every(index =>{
            return cells[index].classList.contains(turn)
        })
    })
}



// change the text and show the end popup
function end_game(draw){
    if (draw){
        win_message_text.textContent = `Draw!`
    }else{
        win_message_text.textContent = `${x_turn? 'X':'O' } wins!`
    }
    win_message.classList.add('show')
}

// verify every cell with every situation
function isDraw(){
    cell_elements  = [...cells]
    return cell_elements.every(cell =>{
        return cell.classList.contains(X_CLASS) ||cell.classList.contains(O_CLASS)
    })
}

// resetting the game
restart_btn.addEventListener('click',start_game)
