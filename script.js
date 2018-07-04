'use strict';

function Board() {

    this.numberOfRows = 8;

    this.numberOfColumns = 8;

}

Board.prototype = {

    handleClick: function (event) {
        let cellClicked = event.currentTarget;
        if (cellClicked.classList == "cells" + " " + "hiddenCell" + " " + "mine") {
            window.alert("THAT'S A MINE FOOL!");
            cellClicked.classList.add("mineExplode");
        };
        if (cellClicked.classList == "cells" + " " + "hiddenCell") {
            cellClicked.classList.remove("hiddenCell");
        };
        //if the cell that was clicked on has a mine, reveal all other mines. End Game//
        //if the cell that was clicked does not have a mine, use flood fill to search in multiple directions
        //////-stop at the cells with numbers.
        //add a right click feature to allow placement of flags
    },



    boardCreate: function () {
        let boardBox = document.getElementById("boardBox");
        this.grid = new Array(this.numberOfRows).fill().map(() => new Array(this.numberOfColumns).fill("E"));
        this.grid.forEach((row, i) => { //for each row in the grid array
            row.forEach((col, j) => { //for each column in the row array
                let cells = document.createElement("div");
                cells.classList.add("cells");
                cells.classList.add("hiddenCell");
                cells.dataset.row = i;
                cells.dataset.col = j;
                boardBox.appendChild(cells);
                cells.addEventListener("click", this.handleClick);
            });
        });

        this.minePlace();
    },

    minePlace: function () {
        //While there are less than 7 mines, continue to add mines. If there is a mine on the Board, continue in the loop while not adding to the number of mines.
        for (let numberOfMines = 0; numberOfMines < 7; numberOfMines++) {
            let randomRow = Math.floor(Math.random() * 8);
            let randomColumn = Math.floor(Math.random() * 8);
            let randomCell = [randomRow, randomColumn];
            this.grid[randomRow][randomColumn] = "M";
            let cellToChange = document.querySelector('[data-row="' + randomRow.toString() + '"][data-col="' + randomColumn.toString() + '"]');
            cellToChange.classList.add("mine");
        }
    },

    mineSearch: function () {
        this.grid.forEach((row, i) => {
            row.forEach((col, j) => {
                console.log(col);
                if (col === "E") {
                    this.mineProximity = 0;
                    if (this.grid[i][j + 1] === "M") { //search to the right
                        this.mineProximity += 1;
                        this.grid[i][j] = this.mineProximity;
                    };
                    if (this.grid[i][j - 1] === "M" && this.grid[i][j - 1] != "undefined") { //search to the left
                        this.mineProximity += 1;
                        this.grid[i][j] = this.mineProximity;
                    };
                    // if (this.grid[i + 1][j] === "M") { //search below
                    //     this.mineProximity += 1;
                    //     this.grid[i][j] = this.mineProximity;
                    // };
                    // console.log(this.grid[i - 1][j]);
                    if (this.grid[i - 1] != "undefined" && this.grid[i - 1][j] === "M") { //search above
                        this.mineProximity += 1;
                        this.grid[i][j] = this.mineProximity;
                    };
                    
                    
                };
            });
        });
        console.log(this.grid);

        
    },

}
let board1 = new Board();
board1.boardCreate();
board1.mineSearch();