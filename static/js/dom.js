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
                button.addEventListener('mousedown', function(e){
                let boardId = button.dataset.id;
                dom.loadCards(boardId);
            })
        }
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId,function(cards){
            dom.showCards(cards, boardId);

        });



        // dataHandler.getCardsByBoardId(boardId,function(cards){
        //     dom.showCards(cards);
        //     console.log(cards);
        // }
        // );

    },
    showCards: function (cards, boardId) {
        // let boardId = (cards[0].board_id);

        let cardsParentElement = document.querySelector("[data-id='"+boardId+"']").parentNode;
        // let output = "<div class=\"board-columns\">";
        let test1 = Array(dom.loadStatuses());
        let test2 = dom.loadStatuses();
        // test1.forEach(e=>console.log(e))
        // // console.log(cardsParentElement);
        // //
        //
        console.log(test1);
        console.log(test2);

    },
    loadStatuses: function () {
        return dataHandler.getStatuses();
        }


    // loadStatuses: function () {
    //     return dataHandler.getStatuses(function (statuses) {
    //         // console.log(statuses);
    //         return statuses
    //         // statuses.forEach(status=> arrTest.push(status))
    //     });
    //
    //     }




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
