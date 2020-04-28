// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";
import { sampleData } from "./sample_data.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.

    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards){
            boardList += `
        <section class="board">
            <div class="board-header"><span class="board-title">${board.title}</span>
                <button class="board-add">Add Card</button>
                <button class="board-toggle" data-title="${board.title}" data-id="${board.id}" data-show="0"><i class="fas fa-chevron-down"></i></button>
            </div>
        </section>`
        ;
        }

        const outerHtml = `
            <div class="board-container">
                ${boardList}
            </div>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);

        let boardButtons = document.querySelectorAll(".board-toggle");

        for(let button of boardButtons){
                button.addEventListener('click', function(e){
                    e.stopPropagation();
                let boardId = button.dataset.id;
                let toggleAtribute = e.target.dataset.show;
                if (toggleAtribute === "0") {
                    dom.loadCards(boardId);
                    e.target.dataset.show = "1";
                } else {

                        let board= e.target.parentNode.parentNode;
                        console.log(board);
                        board.removeChild(e.target.parentNode.nextSibling);
                        e.target.dataset.show = "0";

                }
            });
                button.firstChild.addEventListener('click', function(e){
                    e.stopPropagation();
                let boardId = button.dataset.id;
                let toggleAtribute = button.dataset.show;
                if (toggleAtribute === "0") {
                    dom.loadCards(boardId);
                    button.dataset.show = "1";
                } else {

                        let board= button.parentNode.parentNode;
                        console.log(board);
                        board.removeChild(button.parentNode.nextSibling);
                        button.dataset.show = "0";

                }
            });
        }
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId,async function(cards){
            await dom.showCards(cards, boardId);

        });



        // dataHandler.getCardsByBoardId(boardId,function(cards){
        //     dom.showCards(cards);
        //     console.log(cards);
        // }
        // );

    },
    showCards: async function (cards, boardId) {
        let allCards = cards;
        console.log(cards);
        let usedStatuses = [];
        allCards.forEach(card=>{
            if (!usedStatuses.includes(card.status_id)) {
                usedStatuses.push(card.status_id);
                console.log(usedStatuses);
            }
        });
        let cardsParentElement = document.querySelector("[data-id='"+boardId+"']").parentNode;
        let output = `<div class="board-columns">`;
        usedStatuses.forEach(singleStatus=>{
            output += `<div class="board-column">
                <div class="board-column-title">${singleStatus}</div>
                    <div class="board-column-content dropzone">`;
                    cards.forEach(card => {
                        if (card.status_id == singleStatus) {
                            output += `
                              <div class="card" draggable="true">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title" >${card.title}</div>
                        </div>
                            `
                        }
                    });
                    output += `</div>`;
            output += `</div>`
        });
        output += `</div>`;

        cardsParentElement.insertAdjacentHTML("afterEnd", output);

    },


    loadStatuses: function () {
        return dataHandler.getStatuses(function (statuses) {
            // console.log(statuses);
            return statuses
            // statuses.forEach(status=> arrTest.push(status))
        });

        }




    // <div class="board-columns">
    //             <div class="board-column">
    //                 <div class="board-column-title">New</div>
    //                 <div class="board-column-content dropzone">
    //                     <div class="card" id="draggable" draggable="true">
    //                         <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
    //                         <div class="card-title" >TEN MOŻEMY DRAG AND DROP</div>
    //                     </div>
    //                     <div class="card">
    //                         <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
    //                         <div class="card-title">Card 2</div>
    //                     </div>
    //                 </div>
    //             </div>
    // here comes more features
};
