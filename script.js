let arr = [[]];

for (let i = 0; i < 10; i++) {
    arr[i] = [];
    for (let j = 0; j < 10; j++) {
        if (i == j){
            arr[i][j] = 1
        }
        else arr[i][j] = 0;
    }   
}
makeTableHTML(arr)
function makeTableHTML(myArray) {
    let result = "<table border=1>";
    result += '<tr><td></td>';

   for (let i = 0; i < myArray.length; i++) {
        result += `<td>X${i + 1}</td>`;
    }
    result += '</tr>';

    for (let i = 0; i < myArray.length; i++) {
        result += `<tr><td>X${i + 1}</td>`;
        for (let j = 0; j < myArray.length; j++) {
          if (i == j)
            result += `<td><input type="number" value="${myArray[i][j]}" readonly/></td>`;
          else
            result += `<td><input type="number" onchange="symmetricTableFill(${i}, ${j}, value)" value="${myArray[i][j]}"/></td>`;
        }
        result += '</tr>';
      }
    
      result += '</table>';
    
    document.getElementById('table').innerHTML = result
    console.log(myArray)
}

function symmetricTableFill(i, j, n){
    let result;
    arr[i][j] = n;
    if (n != 0){
        result = 1 / n;
    }
    else res = 0;
    arr[j][i] = result
    arr = arr.map((subArr) => subArr.map((x) => Number(x)));
    makeTableHTML(arr)
}