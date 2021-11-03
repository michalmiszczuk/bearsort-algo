let arrayLength = document.getElementById("arrayLength");
let rangeNumbers = document.getElementById("rangeNumbers");
let title = document.getElementsByClassName("title");
let inputArray = document.querySelector(".input");
let outputArray = document.querySelector(".output");
let generateButton = document.getElementById("generateButton");
let sortButton = document.getElementById("sortButton");
let mainWrapper = document.querySelector(".main-wrapper");

let arrayToSort = [];

generateButton.addEventListener("click", generateArray);
sortButton.addEventListener("click", sortArray);

function generateArray(e) {
  e.preventDefault();
  if (!arrayLength.value || !rangeNumbers.value) return;
  let generatedArray = Array.from({length: arrayLength.value}, () =>
    Math.floor(Math.random() * rangeNumbers.value)
  );
  inputArray.textContent = generatedArray;
  arrayToSort = generatedArray;
}

async function sortArray() {
  try {
    mainWrapper.classList.add("main-wrapper-loading");
    arrayCopy = [...arrayToSort];
    const sortedArray = await bearSort(arrayCopy);
    console.log(sortedArray);
    outputArray.textContent = sortedArray;
    if (sortArray.length === 0) mainWrapper.classList.remove("main-wrapper-loading");
  } catch (error) {
    console.log(error);
  }
}

function bearSort(array) {
  return new Promise((resolve, reject) => {
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
    resolve(result);
  });
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
