document.addEventListener("DOMContentLoaded", function() {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-btn");
    let newBtn = document.querySelector("#newgame");
    let msgContainer= document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");

    let turnO = true;
    let count=0;
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const resetGame=()=>{
        turnO=true;
        enabledboxes();
        msgContainer.classList.add("hide");
        count=0;
    }

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if(turnO==true){
                box.innerText="O";
                turnO=false;
            }
            else
            {
                box.innerText="X";
                turnO=true;
            }
            box.disabled=true;
            count++;
            let iswinner=checkwinner();
            if(count==9 && !iswinner){
                draw();
            }
        });
    });

    const draw=()=>{
        msg.innerText="Game was a Draw";
        msgContainer.classList.remove("hide");
        disabledboxes();
    };

    const disabledboxes=()=>{
        for(let box of boxes){
            box.disabled=true;
        }
    };

    const enabledboxes=()=>{
        for(let box of boxes){
            box.disabled=false;
            box.innerText="";
        }
    };

    const showwinner=(winner)=>{
        msg.innerText=`Congratulations!!! winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disabledboxes();
    };

    const checkwinner=()=>{
        for(let pattern of winPatterns){
            let patval1=boxes[pattern[0]].innerText;
            let patval2=boxes[pattern[1]].innerText;
            let patval3=boxes[pattern[2]].innerText;
            if(patval1!="" && patval2!="" && patval3!=""){
                if(patval1==patval2 && patval2==patval3){
                    showwinner(patval1);
                }
            }
        }
    };

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

});
