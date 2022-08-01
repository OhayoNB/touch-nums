'use strict'

const EASY = 16
const HARD = 25
const EXTREME = 36

var gNums = []
var gNumOrder = 1
var elNextNum = document.querySelector('.nextnum')

var elStopWatch = document.querySelector('.stopwatch')
var gMilliseconds = 0
var gSeconds = 0
var gMinutes = 0
var stopWatchInterval

function reset() {
  gNumOrder = 1

  clearInterval(stopWatchInterval)
  gMilliseconds = 0
  gSeconds = 0
  gMinutes = 0

  elStopWatch.style.display = 'none'
  elStopWatch.innerHTML = `00 : 00 : 000`

  elNextNum.style.display = 'none'
}

function selectDifficulties() {
  reset()
  var elDifficulties = document.querySelector('.difficulties')

  var selectedDiff = elDifficulties.value

  switch (selectedDiff) {
    case 'EASY':
      renderTable(EASY)
      break
    case 'HARD':
      renderTable(HARD)
      break
    case 'EXTREME':
      renderTable(EXTREME)
      break
  }
}

function buildAndShuffleArray(numOfCels) {
  console.log(`numOfCels:`, numOfCels)
  for (var i = 0; i < numOfCels; i++) {
    gNums.push(i + 1)
  }

  for (var i = gNums.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = gNums[i]
    gNums[i] = gNums[j]
    gNums[j] = temp
  }

  return gNums
}

function renderTable(numOfCels) {
  buildAndShuffleArray(numOfCels)
  var strHTML = ''
  for (var i = 0; i < Math.sqrt(numOfCels); i++) {
    strHTML += '<tr>\n'

    for (var j = 0; j < Math.sqrt(numOfCels); j++) {
      strHTML += `
                  \t<td onclick="cellClicked(this, ${numOfCels})">
                          ${gNums.pop()}
                  </td>\n
              `
    }
    strHTML += '</tr>\n'
  }
  var elTable = document.querySelector('.board')
  elTable.innerHTML = strHTML
}

function cellClicked(cell, numOfCels) {
  if (+cell.innerText === gNumOrder) {
    // First num clicked
    if (gNumOrder === 1) {
      // Show the stopwatch
      elStopWatch.style.display = 'block'

      // Start the stopwatch
      if (stopWatchInterval !== null) {
        clearInterval(stopWatchInterval)
      }
      stopWatchInterval = setInterval(displayStopwatch, 10)
    }
    // End of game
    if (gNumOrder === numOfCels) {
      elNextNum.innerText = `Well Done!`
      cell.style.backgroundColor = 'red'
      clearInterval(stopWatchInterval)

      return
    }

    // Show next num
    elNextNum.style.display = 'block'
    elNextNum.innerText = 'Next Number: ' + (gNumOrder + 1)

    gNumOrder++
    cell.style.backgroundColor = 'red'
  }
}

function displayStopwatch() {
  gMilliseconds += 10
  if (gMilliseconds == 1000) {
    gMilliseconds = 0
    gSeconds++
    if (gSeconds == 60) {
      gSeconds = 0
      gMinutes++
      if (gMinutes == 60) {
        gMinutes = 0
      }
    }
  }

  var m = gMinutes < 10 ? '0' + gMinutes : gMinutes
  var s = gSeconds < 10 ? '0' + gSeconds : gSeconds
  var ms =
    gMilliseconds < 10
      ? '00' + gMilliseconds
      : gMilliseconds < 100
      ? '0' + gMilliseconds
      : gMilliseconds

  elStopWatch.innerHTML = `${m} : ${s} : ${ms}`
}
