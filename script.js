
//use python -m http.server 8000 to host it on your local host, you can change the port no. as per ypur convinience



function createMatrixInput(containerId, rows, cols) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('matrix-row');
        for (let j = 0; j < cols; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.placeholder = `${i + 1},${j + 1}`;
            row.appendChild(input);
        }
        container.appendChild(row);
    }
}

function multiplyMatrices() {
    const rows1 = parseInt(document.getElementById('rows1').value);
    const cols1 = parseInt(document.getElementById('cols1').value);
    const rows2 = parseInt(document.getElementById('rows2').value);
    const cols2 = parseInt(document.getElementById('cols2').value);

    const matrix1 = getMatrixValues('matrix1', rows1, cols1);
    const matrix2 = getMatrixValues('matrix2', rows2, cols2);

    if (!matrix1 || !matrix2) {
        return;
    }

    if (cols1 !== rows2) {
        alert("Cannot multiply matrices. Number of columns in Matrix 1 must be equal to the number of rows in Matrix 2.");
        return;
    }


    const resultMatrix = [];
    for (let i = 0; i < rows1; i++) {
        resultMatrix.push([]);
        for (let j = 0; j < cols2; j++) {
            let sum = 0;
            for (let k = 0; k < cols1; k++) {
                sum += matrix1[i][k] * matrix2[k][j];
            }
            resultMatrix[i].push(sum);
        }
    }


    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h3>Result:</h3>';
    resultDiv.innerHTML += '<div class="matrix">';
    for (let i = 0; i < rows1; i++) {
        resultDiv.innerHTML += '<div class="matrix-row" id="result-row-' + i + '"></div>';
    }
    resultDiv.innerHTML += '</div>';


    for (let i = 0; i < rows1; i++) {
        const resultRowDiv = document.getElementById('result-row-' + i);
        for (let j = 0; j < cols2; j++) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('matrix-item');
            itemDiv.textContent = resultMatrix[i][j];
            resultRowDiv.appendChild(itemDiv);
        }
    }

}

function getMatrixValues(containerId, rows, cols) {
    const matrix = [];
    const container = document.getElementById(containerId);
    const inputs = container.querySelectorAll('input');
    let index = 0;

    for (let i = 0; i < rows; i++) {
        matrix.push([]);
        for (let j = 0; j < cols; j++) {
            const value = parseFloat(inputs[index].value);
            if (isNaN(value)) {
                alert(`Please fill all the values in ${containerId} matrix.`);
                return null;
            }
            matrix[i].push(value);
            index++;
        }
    }
    return matrix;
}


function clearInputs() {
    document.getElementById('rows1').value = '';
    document.getElementById('cols1').value = '';
    document.getElementById('rows2').value = '';
    document.getElementById('cols2').value = '';
    document.getElementById('matrix1').innerHTML = '';
    document.getElementById('matrix2').innerHTML = '';
    document.getElementById('result').innerHTML = '';
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('rows1').addEventListener('input', function () {
        const rows = parseInt(this.value);
        const cols = parseInt(document.getElementById('cols1').value);
        createMatrixInput('matrix1', rows, cols);
    });

    document.getElementById('cols1').addEventListener('input', function () {
        const rows = parseInt(document.getElementById('rows1').value);
        const cols = parseInt(this.value);
        createMatrixInput('matrix1', rows, cols);
    });

    document.getElementById('rows2').addEventListener('input', function () {
        const rows = parseInt(this.value);
        const cols = parseInt(document.getElementById('cols2').value);
        createMatrixInput('matrix2', rows, cols);
    });

    document.getElementById('cols2').addEventListener('input', function () {
        const rows = parseInt(document.getElementById('rows2').value);
        const cols = parseInt(this.value);
        createMatrixInput('matrix2', rows, cols);
    });
});
