// * 时间复杂度为O(n^2)的排序算法
// 冒泡排序
// 选择排序
// 插入排序
// 希尔排序

// * 时间复杂度为O(nlogn)的排序算法
// 快速排序
// 堆排序
// 归并排序

// * 时间复杂度为线性的排序算法
// 计数排序
// 桶排序
// 基数排序

// 冒泡排序
function BubbleSort(array) {
  let tmp = 0;
  let lastExchangeIndex = 0;
  let sortBorder = array.length - 1;
  for(let i = 0; i < array.length; i++) {
    let isSorted = true;
    for(let j = 0; j < sortBorder; j++) {
      if(array[j] > array[j+1]) {
        tmp = array[j];
        array[j] = array[j+1];
        array[j+1] = tmp;
        isSorted = false;
        lastExchangeIndex = j;
      }
    }
    sortBorder = lastExchangeIndex;
    if(isSorted){
      break;
    }
  }
  return array;
}

const array = [3,4,2,1,5,6,7,8]
const newArray = BubbleSort(array);
console.log(newArray)

// 鸡尾酒排序
function cocktail(array) {
  let tmp = 0;
  for(let i = 0; i < array.length/2; i++){
    let isSorted = true;
    for(let j = i; j < array.length-i-1; j++) {
      if(array[j] > array[j+1]) {
        tmp = array[j]; 
        array[j] = array[j+1]; 
        array[j+1] = tmp; 
        isSorted = false;
      }
    }
    if(isSorted) { 
      break;
    }
    isSorted = true;
    for(let j = array.length-i-1; j>i; j--){
      if(array[j] < array[j-1]){
        tmp = array[j];
        array[j] = array[j-1];
        array[j-1] = tmp;
        isSorted = false;
      }
    }
    if(isSorted){
      break;
    }
  }
  return array;
}

console.log(cocktail([2,3,4,5,6,7,8,1]));
// 快速排序
function quickSort(arr, startIndex, endIndex) {
  if (startIndex >= endIndex) {
    return;
  }
  let pivotIndex = partition(arr, startIndex, endIndex);
  quickSort(arr, startIndex, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, endIndex);
}

function partition(arr, startIndex, endIndex) {
  let pivot = arr[startIndex];
  let mark = startIndex;

  for(let i = startIndex+1; i <= endIndex; i++){
    if(arr[i] < pivot){
      mark ++;
      let p = arr[mark];
      arr[mark] = arr[i];
      arr[i] = p;
    }
  }

  arr[startIndex] = arr[mark];
  arr[mark] = pivot;
  return mark;
}

let arr = [4,4,6,5,3,2,8,1];
quickSort(arr,0 , arr.length-1)
console.log(arr);
// 选择排序