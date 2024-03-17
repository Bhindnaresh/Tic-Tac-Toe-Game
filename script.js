let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgame = document.querySelector("#newgame");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; //playerO, playerX
let count = 0; // to track the draw game

const winPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const resetgame = () => {
    turn0 = true;
    count = 0;
    enableboxes();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turn0){
            box.innerText = "O";
            turn0 = false;
        }else{
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true; //disabling the box. so, value can't be changed once written.
        count++;
        let isWinner = checkWinner();
        if(count===9 && !isWinner){
            gamedraw();
        }
    });
});

const gamedraw = ()=>{
    msg.innerText = "Game is Draw";
    msgcontainer.classList.remove("hide");
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableboxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    for(let box of boxes){
        box.disabled = true;
    }
};

const checkWinner = ()=>{
    for(let pattern of winPattern){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val !="" && pos2val !="" && pos3val !=""){
            if(pos1val===pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
};

newgame.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);