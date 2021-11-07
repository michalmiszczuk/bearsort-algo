const arrayLength = document.getElementById("arrayLength");
const rangeNumbers = document.getElementById("rangeNumbers");
const title = document.getElementsByClassName("title");
const inputArray = document.querySelector(".input");
const outputArray = document.querySelector(".output");
const generateButton = document.getElementById("generateButton");
const sortButton = document.getElementById("sortButton");
const mainWrapper = document.querySelector(".spinner-wrapper");
const time = document.querySelector(".time-elapsed");

let arrayToSort = [];

generateButton.addEventListener("click", generateArray);
sortButton.addEventListener("click", sortArray);

function generateArray(e) {
  e.preventDefault();
  if (!arrayLength.value || !rangeNumbers.value) return;
  if (arrayLength.value > 50000) arrayLength.value = 50000;
  let generatedArray = Array.from({length: arrayLength.value}, () =>
    Math.floor(Math.random() * rangeNumbers.value)
  );
  inputArray.textContent = generatedArray;
  arrayToSort = generatedArray;
}

function sortArray() {
  let timeStart = Date.now();
  mainWrapper.classList.toggle("spinner-hidden");
  arrayCopy = [...arrayToSort];
  setTimeout(() => {
    const sortedArray = bearSort(arrayCopy);
    outputArray.textContent = sortedArray;
    let timeFinish = Date.now();
    let timeElapsed = (timeFinish - timeStart) / 1000;
    mainWrapper.classList.toggle("spinner-hidden");
    time.textContent = `Time elapsed: ${timeElapsed}s `;
  }, 0);
}

function bearSort(array) {
  let result = [];
  result.push(array[0]);
  array.shift();
  if (array[0] >= result[0]) result.push(array[0]);
  if (array[0] < result[0]) result.unshift(array[0]);
  array.shift();

  let i = 0;
  let indexArray = [0];
  for (let number of array) {
    i++;
    indexArray.push(i);
    if (number >= result[i]) result.push(number);
    if (number <= result[0]) result.unshift(number);
    if (result[0] < number && number < result[i]) {
      let testArray = result.slice(0);
      let testIndexArr = indexArray.slice(0);
      let [index] = binaryArrayDiv(testArray, testIndexArr, number);
      let integerIndex = index.pop();

      result.splice(integerIndex, 0, number);
    }
  }
  return result;
}

function binaryArrayDiv(array, testArray, number) {
  if (array.length === 1) {
    return [testArray];
  }
  let [dividedArray, testArrayDiv] = divide(array, testArray, number);
  return binaryArrayDiv(dividedArray, testArrayDiv, number);
}

function divide(array, testArray, number) {
  let half = Math.ceil(array.length / 2);
  let testHalf = Math.ceil(testArray.length / 2);
  let firstHalf = array.splice(0, half);
  let testFirstHalf = testArray.splice(0, testHalf);
  let secondHalf = array.splice(-half);
  let testSecondHalf = testArray.splice(-testHalf);
  let last = firstHalf.slice(-1);

  if (number >= last) return [secondHalf, testSecondHalf];
  if (number <= secondHalf[0]) return [firstHalf, testFirstHalf];
}
