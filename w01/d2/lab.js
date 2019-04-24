// Exercise 1
function maxOfTwoNumbers(n1, n2){
    var max = (n1 >= n2) ? n1 : n2;
    return max;
  }
  console.log("Exercise 1: "+maxOfTwoNumbers(99, 0));
  
  // Exercise 2
  const maxOfThree = function(n1, n2, n3){
    var max = maxOfTwoNumbers(n1,n2);
    return maxOfTwoNumbers(max, n3);
  };
  console.log("Exercise 2: "+maxOfThree(33, 999, 66));
  
  // Exercise 3
  function isCharAVowel(c){
    switch(c) {
    case 'a':
      return true;
      break;
    case 'e':
      return true;
      break;
    case 'i':
      return true;
      break;
    case 'o':
      return true;
      break;
    case 'u':
      return true;
      break;
    default:
      return false;
    }
  }
  console.log("Exercise 3: "+isCharAVowel('c'));
  
  // Exercise 4
  const sumArray = function(arr){
    // let sum = 0;
    // for(i=0; i<arrOfNum.length; i++){
    //     sum = sum+arrOfNum[i];
    // }
    // return sum;
    var sum = 0;
    arr.forEach(valueAtIndex => {
      sum += valueAtIndex;
    });
    return sum;
    //both blocks work; just wanted to try using .forEach
  };
  console.log("Exercise 4: "+sumArray([1,2,3,4,5,6]));
  
  // Exercise 5
  function multiplyArray (arr){
    var total = 1;
    arr.forEach(valueAtIndex => {
      total *= valueAtIndex;
    });
    return total;
  }
  console.log("Exercise 5: "+multiplyArray([2,3,4]));
  
  // Exercise 6
  const numArgs = function(arr){
    return arr.length;
  };
  console.log("Exercise 6: "+numArgs([1,2,4,6,"howdy"]));
  // sidenote, this code is NOT robust; depends on the user passing in an object that has a native(?) .length method
  
  // Exercise 7
  function reverseString(str){
    let revStr ="";
    for(i=str.length; i>=0;i--){
      revStr+=str.charAt(i);
      /*
       for future reference, it will be useful to remember this structure;
       that is, setting i's initial value to be the entire length of (in
       this case) a string, and then decrementing from there. it is important
       to set the condition to be i>=0 because indices start at 0
      */
    }
    return revStr;
  }
  console.log("Exercise 7: "+reverseString("computer"));
  
  // Exercise 8
  const longestStringInArray = function(strArr){
    let maxGlobal =0;
    for(let i =0; i<strArr.length; i++){
      if((i+1)<strArr.length){
        let maxLocal=maxOfTwoNumbers(strArr[i].length, strArr[i+i].length);
        maxGlobal=maxOfTwoNumbers(maxGlobal, maxLocal);
      } else{
        return maxGlobal;
      }
    }
  };
  /*
    The thought process behind this exercise was: because we KNOW that maxOfTwoNumbers() works (and can therefore always find the local max, i.e. the max between any two given numbers), all we need to do is keep track of and update a "global" max that exists outside of the for loop; compare the global and local maxima with each iteration; if the local is ever greater than the global, then, by virtue of maxOfTwoNumbers(), maxGlobal is updated to reflect the new max. This is a clear example of scope and why we want to limit the accessibility of certain variables. I think this might also be a segue into a form of SORT (algorithm)?
  */
  console.log("Exercise 8: "+longestStringInArray(["ho", "hippopotamus", "hunts"]));
  
  // Exercise 9
  function stringsLongerThan(strArr, num){
    let allowed =[];
    strArr.forEach(valueAtIndex => {
      if(valueAtIndex.length > num){
        allowed.push(valueAtIndex);
      }
    });
    return allowed;
  }
  console.log("Exercise 9: "+stringsLongerThan(["howdy","hi","hoo","hoot"],3));