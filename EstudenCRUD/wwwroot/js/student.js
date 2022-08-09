function showModalAdd() {
    $('#modalAddTitle').html("Registrando Estudiantes");
    $('#idGroup').addClass('d-none');
    $('#modalAdd').modal('show');
    $('#btnGuardar').html('Guardar'); 
    $('#btnGuardar').attr('onclick', 'inserStudent()');
    $('#ApellidoAdd').val('');
    $('#NombreAdd').val('');
}

async function editStudent(idStudent) {
    $('#modalAddTitle').html("Editando Estudiantes");
    $('#idGroup').removeClass('d-none');
    $('#btnGuardar').html('Actualizar');
    $('#btnGuardar').attr('onclick', 'updateStudent()');


    fetch('https://localhost:44338/Student/GetStudentById/'+idStudent)
        .then(response => response.json())
        .then(data => {
            $('#idStudent').val(data.data.idStudent);
            $('#NombreAdd').val(data.data.nombre);
            $('#ApellidoAdd').val(data.data.apellido);            

            $('#modalAdd').modal('show');
        })


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
            $('#student').DataTable({
                data: data.data,
                columns: [
                    { data: 'idStudent' },
                    { data: 'nombre' },
                    { data: 'apellido' },
                    {
                        data: 'idStudent',
                        render: function (data, type) {
                            return `<button class="btn btn-primary mx-1" onclick="editStudent(${data})">Editar</button><button class="btn btn-danger mx-1" onclick="delStudent(${data})")>Eliminar</button>`
                        }
                    }

                ],
                "bDestroy": true
            });

              //data.data.forEach(addRow)
        })
}


async function updateStudent() {
    var idStudent = document.getElementById('idStudent').value;
    var nombre = document.getElementById('NombreAdd').value;
    var apellido = document.getElementById('ApellidoAdd').value;

    if (nombre.trim() === '' || apellido.trim() === '' ) {
        alert('Nombre y Apellido son datos requeridos');
        return;
    }

    var student = {
        Nombre: nombre,
        Apellido: apellido
    }


    fetch('https://localhost:44338/Student/EditStudent/'+idStudent, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }).then(response => response.json())
        .then(
            data => {
                Swal.fire({
                    title: data.message,
                    icon: 'success'
                })
                var tBodyRef = document.getElementById('student').getElementsByTagName('tbody')[0].innerHTML = '';

                document.getElementById('NombreAdd').value = '';
                document.getElementById('ApellidoAdd').value = '';

                loadStudent();

                $('#modalAdd').modal('hide');
            }
        )
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
                Swal.fire({
                    title: data.message,
                    icon:'success'
                })
                
                var tBodyRef = document.getElementById('student').getElementsByTagName('tbody')[0].innerHTML='';

                document.getElementById('NombreAdd').value = ''; 
                document.getElementById('ApellidoAdd').value = '';

                loadStudent();

                $('#modalAdd').modal('hide');
            }
    )

    
    return;
    
}

async function removeStudent(idStudent) {
    fetch('https://localhost:44338/Student/DeleteStudent/' + idStudent, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }       
    }).then(response => response.json())
        .then(
            data => {
                Swal.fire({
                    title: data.message,
                    icon: 'success'
                })
                var tBodyRef = document.getElementById('student').getElementsByTagName('tbody')[0].innerHTML = '';

                document.getElementById('NombreAdd').value = '';
                document.getElementById('ApellidoAdd').value = '';

                loadStudent();

                $('#modalAdd').modal('hide');
            }
        )
}

async function delStudent(idStudent) {
    Swal.fire({
        title: 'Desea eliminar al estudiante?',
        showDenyButton: true,
        denyButtonText: 'No',
        confirmButtonText: 'Si'
    })
        .then((result) => {
            if (result.isConfirmed) {
                removeStudent(idStudent);
            }

        })
}


loadStudent();