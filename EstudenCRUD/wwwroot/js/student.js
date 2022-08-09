async function editStudent(idStudent) {

    alert(idStudent);
}

function addRow(student) {
    var tBodyRef = document.getElementById('student').getElementsByTagName('tbody')[0];

    var row = tBodyRef.insertRow(0);

    var idCell = row.insertCell(0);
    var nombreCell = row.insertCell(1);
    var apellidoCell = row.insertCell(2);
    var actionCell = row.insertCell(3);

    idCell.innerHTML = student.idStudent;
    nombreCell.innerHTML = student.nombre;
    apellidoCell.innerHTML = student.apellido;
    actionCell.innerHTML = `<button class="btn btn-primary mx-1" onclick="editStudent(${student.idStudent})">Editar</button><button class="btn btn-danger mx-1" onclick="delStudent(${student.idStudent})")>Eliminar</button>` 

}

async function loadStudent() {

    fetch('https://localhost:44338/Student/GetStudent')
        .then(response => response.json())
        .then(data => {            
              data.data.forEach(addRow)
        })
}


async function inserStudent() {

    var nombre = document.getElementById('NombreAdd').value;
    var apellido = document.getElementById('ApellidoAdd').value;

    if (nombre.trim() === '' || apellido.trim() === '') {
        alert('Nombre y Apellido son datos requeridos');
        return;
    }

    var student = {
        Nombre: nombre,
        Apellido: apellido
    }

    fetch('https://localhost:44338/Student/InserStudent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }).then(response => response.json())
        .then(
            data => {
                alert(data.message)
                var tBodyRef = document.getElementById('student').getElementsByTagName('tbody')[0].innerHTML='';

                document.getElementById('NombreAdd').value = ''; 
                document.getElementById('ApellidoAdd').value = '';

                loadStudent();

                $('#modalAdd').modal('hide');
            }
    )

    
    return;
    
}


loadStudent();