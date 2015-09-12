var app = angular.module("bingoCardApp", [])

app.controller("CardController", function($scope){

  $scope.board = [
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 1, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ]
  ]

  $scope.cardRule = "line"

  $scope.clickSquare = function(squareRow, squareColumn) {
    $scope.board[squareRow][squareColumn] = 1

    switch($scope.cardRule) {
      case "line":
        straightLine();
      case "fullCard":
        fullCard();
      case "corners":
        corners();
      case "outline":
        outline();
      case "hashtag":
        hashtag();
    }
  }

  var straightLine = function() {
    var cols = _.reduce($scope.board, function(memory, row){
      return _.map(row, function(cell, index){
        if (memory[index] === 0) {
          return 0
        }
        return cell
      })
    }, [ 1, 1, 1, 1, 1 ])

    var matchInColumns = _.some(cols)

    var matchInRows = _.some($scope.board, function(row){
      return _.every(row)
    })

    var leftDiagonalMatch = 1
    _.times(5, function(i){
      if (leftDiagonalMatch === 0) {
        return 0
      }
      leftDiagonalMatch = $scope.board[i][i]
    })

    var rightDiagonalMatch = 1
    _.times(5, function(i){
      if (rightDiagonalMatch === 0) {
        return 0
      }
      rightDiagonalMatch = $scope.board[i][4 - i]
    })

    var matchInDiagonal = (leftDiagonalMatch || rightDiagonalMatch)

    if (matchInColumns || matchInRows || matchInDiagonal) {
      $scope.winner = true
    }
  }

  var fullCard = function( ) {

    _.every($scope.board, function(column){

      var cardComplete =  _.every(column, _.identity)
      
      if (cardComplete) {
        $scope.winner = true;
      }

    })
  }

  var corners = function() {

    var numCols = $scope.board.length;
    var firstCol = $scope.board[0];
    var lastCol = $scope.board[(numCols -1)];
    
    if (firstCol[0] === 1 && firstCol[(firstCol.length - 1)] === 1 && 
        lastCol[0] === 1 && lastCol[(firstCol.length - 1)]) {
      $scope.winner = true;
    }

  }

  var hashtag = function() {
    
    for (var i = 0; i < $scope.board.length; i++) {

      var col = $scope.board[i];

      if (i % 2 === 1){
        if (!(col[0]) && !(col[2]) && !(col[4])) {
          return;
        }
      }

      if (!(col[1] && col[3])) {

        return;
      }
    }

    $scope.winner = true;
  }

  var outline = function() {

    for (var i = 0; i < $scope.board.length; i++) {

      var col = $scope.board[i];

      if (!(col[0] && col[4])) {
        return;
      }
      if (i === 0 || i === 4) {
        if (!(col[1] || col[2] || col[3])) {
          return;
        }
      }
    }
    $scope.winner = true;
    
  }

  

})