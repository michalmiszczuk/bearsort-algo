console.log(bearSort([1, 5, 3, 430, 430, 0, 10, 22, 3, 5, 444, 432, 432, 430, 431, 6, 1, 0, 22, 33, 1, 3]));

function bearSort(array) {
  let result = [];
  result.push(array[0]);
  array.shift();

  if (array[0] >= result[0]) result.push(array[0]);
  if (array[0] < result[0]) result.unshift(array[0]);
  array.shift();


  for (let number of array) {
   
    if (number >= result[i]) result.push(number);
    if (number <= result[0]) result.unshift(number);
    if (result[0] < number && number < result[i]) {
      let [index] = binaryArrayDiv(reuslt, number);
      let integerIndex = index.pop();

      result.splice(integerIndex, 0, number);
    }
  }
  return result;
}

function binaryArrayDiv(result, number) {
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
