// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

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
                <button class="board-toggle" data-title="${board.title}" data-id="${board.id}"><i class="fas fa-chevron-down"></i></button>
            </div>
        </section>
        <div class="board-columns"></div>`;
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
                button.addEventListener('mousedown', function(e){
                let boardId = button.dataset.id;
                dom.loadCards(boardId);
            })
        }
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId,function(cards){
            dom.showCards(cards);
            console.log(cards);
        });

    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        console.log("GIT");
    },
    // here comes more features
};
