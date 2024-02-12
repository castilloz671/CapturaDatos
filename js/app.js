let estudiantes = [];
let editando = false;

const agregar = document.getElementById('agregar');
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputMatricula = document.getElementById('matricula');
const inputCurso = document.getElementById('curso');
const inputNota = document.getElementById('nota');
const tbdata = document.getElementById('tbdata');
const inputFiltrar = document.getElementById('filtrar');
const limpiar = document.getElementById('limpiar');

agregar.addEventListener('click', (e) => {
    e.preventDefault();

    // Validando de campos vacios
    if (!inputNombre.value || !inputApellido.value || !inputMatricula.value || !inputCurso.value || !inputNota.value) {
        Swal.fire({
            title: "Error",
            text: "Por favor, completa todos los campos",
            icon: "error"
        });
        return;
    }

    // Validando matrícula duplicada
    if (editando === false && estudiantes.some(estudiante => estudiante.matricula === inputMatricula.value)) {
        Swal.fire({
            title: "Error",
            text: "La matrícula ya está en uso",
            icon: "error"
        });
        return; // evita que se siga ejecutando si la validacion se cumpe o como sabe finaliza la ajecucion
    }

    //Asignando los valores de los inputs
    const estudiante = {
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        matricula: inputMatricula.value,
        curso: inputCurso.value,
        nota: inputNota.value
    };

    if (editando !== false) {
        estudiantes[editando] = estudiante;
        editando = false;
        inputMatricula.disabled = false;
        Swal.fire({
            title: "Estudiantes",
            text: "Estudiante editado exitosamente",
            icon: "success"
        });
    } else {
        estudiantes.push(estudiante);
        Swal.fire({
            title: "Estudiantes",
            text: "Estudiante añadido exitosamente",
            icon: "success"
        });
    }

    Limpiar();
    MostrarEstudiantes();
});

tbdata.addEventListener('click', (e) => {
    if (e.target.value === 'Editar') {
        const indice = e.target.parentNode.parentNode.rowIndex - 1;
        const estudiante = estudiantes[indice];
        LlenarCampos(estudiante);
        inputMatricula.disabled = true;
        editando = indice;
    }
});

// Función creada para llenar los campos del formulario del estudiante seleccionado al presionar Editar
function LlenarCampos(estudiante) {
    inputNombre.value = estudiante.nombre;
    inputApellido.value = estudiante.apellido;
    inputMatricula.value = estudiante.matricula;
    inputCurso.value = estudiante.curso;
    inputNota.value = estudiante.nota;
}

function Limpiar() {
    inputNombre.value = '';
    inputApellido.value = '';
    inputMatricula.value = '';
    inputCurso.value = '';
    inputNota.value = '';
}

function MostrarEstudiantes() {
    tbdata.innerHTML = ''; // Limpiamos el contenido de la tabla
    estudiantes.forEach((estudiante, index) => {
        const numeroEstudiante = index + 1; // Corregimos el índice para que comience desde 1
        tbdata.innerHTML += `<tr>
                                <td>${numeroEstudiante}</td>
                                <td>${estudiante.nombre}</td>
                                <td>${estudiante.apellido}</td>
                                <td>${estudiante.matricula}</td>
                                <td>${estudiante.curso}</td>
                                <td>${estudiante.nota}</td>
                                <td><input type="button" value="Editar">
                                <input type="button" value="Eliminar"></td>
                            </tr>`;
    });
}

tbdata.addEventListener('click', (e) => {    
    if (e.target.value === 'Eliminar') {
        const indice = e.target.parentNode.parentNode.rowIndex - 1;
        const estudiante = estudiantes[indice];
        
        Swal.fire({
            title: `¿Estás seguro que deseas eliminar a ${estudiante.nombre} ${estudiante.apellido}?`,
            text: "Los cambios no podrán revertirse",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo"
        }).then((result) => {
            if (result.isConfirmed) {
                estudiantes.splice(indice, 1);
                MostrarEstudiantes();
                Swal.fire({
                    title: "¡Eliminado!",
                    text: `El estudiante ${estudiante.nombre} ${estudiante.apellido} ha sido eliminado.`,
                    icon: "success"
                });
            }
        });
    }
});

inputFiltrar.addEventListener('keyup', function() {
    const filtro = inputFiltrar.value.toLowerCase();
    const filas = tbdata.getElementsByTagName('tr');

    for (let i = 0; i < filas.length; i++) {
        const fila = filas[i];
        const celdas = fila.getElementsByTagName('td');
        let coincide = false;

        for (let j = 0; j < celdas.length; j++) {
            const celda = celdas[j];
            if (celda) {
                const textoCelda = celda.textContent.toLowerCase();
                if (textoCelda.includes(filtro)) {
                    coincide = true;
                    break;
                }
            }
        }

        if (coincide) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    }
});

limpiar.addEventListener('click', (e) => {
    inputNombre.value = '';
    inputApellido.value = '';
    inputMatricula.value = '';
    inputCurso.value = '';
    inputNota.value = '';
    inputMatricula.disabled = false;
    editando = false;
})
