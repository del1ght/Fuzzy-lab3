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
    vectors(arr)
    console.log(vectors(arr))
    indexes(vectors(arr))

}


function vectors(arr){
    
    // вектор K - массив суммы всех столбцов

    let vectorK = []
    
    for (let i = 0; i < arr.length; i++) {
        let sum = 0
        for (let j = 0; j < arr.length; j++) {
            sum += arr[j][i];
        }
        vectorK.push(sum)
        document.getElementById(`k${i}`).innerHTML = sum;
    }


    // вектор W - 1 делим на каждый элемент К

    let vectorW = []

    for (let i = 0; i < vectorK.length; i++) {
        vectorW.push(1 / vectorK[i]);
        
    }

    // нормализация (делим все элементы вектора W на максимальный)
    
    let maxOfW = Math.max.apply(null, vectorW)

    vectorW = vectorW.map((n) => n / maxOfW);

    for (let i = 0; i < vectorW.length; i++) {
        document.getElementById(`w${i}`).innerHTML = vectorW[i];
        
    }


    // вектор R = A * w (умножаем матрицу на вектор)

    let vectorR = MatrixVectorMultiplication(arr, vectorW)

    for (let i = 0; i < vectorR.length; i++) {
        document.getElementById(`r${i}`).innerHTML = vectorR[i];
        
    }

    // расчет вектора lambda (поэлементное деление вектора R на вектор w)

    let lambda = []
    
    for (let i = 0; i < vectorR.length; i++) {
        elem = vectorR[i] / vectorW[i];
        lambda.push(elem);
        document.getElementById(`l${i}`).innerHTML = elem;
        
    }

    return lambda
}


function indexes(lambda){
    let sumOfLambda = 0;
    for (let i = 0; i < lambda.length; i++) {
        sumOfLambda += lambda[i];
    }

    let lambdaMax = sumOfLambda / lambda.length;
    
    let b = (lambdaMax - lambda.length) / lambda.length * 100;
    let IS = (lambdaMax - lambda.length) / (lambda.length - 1);
    let SS = 1.49; // по таблице
    let OS = (IS / SS) * 100;

    document.getElementById('b').innerHTML = b;
    document.getElementById('lmax').innerHTML = lambdaMax;
    document.getElementById('is').innerHTML = IS;
    document.getElementById('ss').innerHTML = SS;
    document.getElementById('os').innerHTML = OS;

}


// умножение матрицы на вектор
function MatrixVectorMultiplication(A, B) {
    let result = []
    for (let i = 0; i < A.length; i++) {
        let elem = 0
        for (let j = 0; j < A.length; j++) {
            elem += A[i][j] * B[j]
        }
        result.push(elem)
    }
    return result
}