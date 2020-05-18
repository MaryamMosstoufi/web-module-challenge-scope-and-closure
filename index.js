// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/

function processFirstItem(stringList, callback) {
  return callback(stringList[0])
}

function callback(stringList) {
  stringList += stringList;
  return stringList;
}

let stringList = ['foo', 'bar'];
console.log(processFirstItem(stringList, callback));

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2? 
 *  counter1 has a callback, counter2 does not
 * 
 * 2. Which of the two uses a closure? How can you tell? 
 *  counter 1 because it reaches out to another function without being inside it 
 * 
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better? 
 *  counter1 is reusable and counter2 is good for a one time use
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
    return count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}


/* Task 2: inning() 

Write a function called `inning` that generates a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

function inning() {
  return (Math.floor(Math.random() * 3));
}

// console.log(inning());
// console.log(inning());
// console.log(inning());
// console.log(inning());

/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/

function finalScore(cb, num) {
  let homeScore = 0;
  let awayScore = 0;

  for (let i = 0; i < num; i++) {
    homeScore = homeScore + cb(); // homeScore = 1 + 2 = 3 
    awayScore = homeScore + cb(); // homeScore = 2 + 1 = 3
  }

  let score = { Home: homeScore, Away: awayScore }
  return score;
}
console.log(finalScore(inning, 9));

/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `inning` that you wrote above
(2) A number of innings

and returns the score at each pont in the game, like so:

1st inning: 0 - 2
2nd inning: 1 - 3
3rd inning: 1 - 3
4th inning: 2 - 4
5th inning: 4 - 6
6th inning: 4 - 6
7th inning: 4 - 6
8th inning: 5 - 8
9th inning: 6 - 10

Final Score: 6 - 10 */

function scoreboard(cb, num) {
  let homeScore = 0;
  let awayScore = 0;
  let getOrdinal = function (num) {
    let ordinal;
    if ((num % 10) === 1 && num != 11) {
      ordinal = num + "st";
    } else if ((num % 10) === 2 && num != 12) {
      ordinal = num + "nd";
    } else if ((num % 10) === 3 && num != 13) {
      ordinal = num + "rd";
    } else {
      ordinal = num + "th";
    }
    return ordinal;
  }

  let eachScore = []
  for (let i = 1; i <= num; i++) {
    homeScore = homeScore + cb();
    awayScore = homeScore + cb();
    let ordinal = getOrdinal(i);
    eachScore.push(homeScore + " - " + awayScore);
    console.log(ordinal + " inning: " + eachScore[i - 1]);
  }

  console.log("Final Score: " + eachScore[num - 1]);
}

scoreboard(inning, 24);

