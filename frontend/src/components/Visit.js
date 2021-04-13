import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clientAxios from '../config/axios';
import Swal from 'sweetalert2';

const Visit = (props) => {
    if(!props.cita) {
        props.history.push('/');
        return null;
    }
    const { cita: { _id, name, owner, date, hour,telephone, symptom }} = props;

    //elimina un registro
    const deleteVisit = id => {

        
        Swal.fire({
            title: '¿Estas seguro?',
            text: "S eliminas la visita no la puedes recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
            }).then((result) => {
            if (result.isConfirmed) {

                //Alerta de eliminado
                Swal.fire(
                'Eliminado!',
                'Tu visita fue eliminada.',
                'Hecho!!'
                )
                //eliminado  de la base de datos
                clientAxios.delete(`/pacientes/${id}`)
                    .then( res => {
                        props.saveQuery(true);
                        props.history.push('/');
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            })

        props.history.push('/');
    }
    return ( 
        <Fragment>
            <h1 className="my-5">Cita de {name}</h1>

            <div className="container mt-5 py-5">
                    <div className="row">
                        <div className="col-12 mb-5 d-flex justify-content-center">
                            <Link to={'/'} className="btn btn-primary text-uppercase py-2 px-5 font-weight-bold">Volver</Link>
                        </div>
                        <div className="col-md-8 mx-auto">
                            <div className="list-group">
                                <div className="p-5 list-group-item list-group-item-action flex-column align-items-center">
                                <div className="d-flex w-100 justify-content-between mb-4">
                                        <h3 className="mb-3">{name}</h3>
                                        <small className="fecha-alta">
                                            {date} - {hour}
                                        </small>
                                        </div>
                                        <p className="mb-0">
                                            {symptom}
                                        </p>
                                        <div className="contacto py-3">
                                            <p>Dueño: {owner}</p>
                                            <p>Teléfono: {telephone} </p>
                                        </div>
                                        <div className="d-flex">
                                            <button 
                                                type="button" 
                                                className="text-uppercase px-5 font-weight-bold btn btn-danger col"
                                                onClick={ () => deleteVisit(_id) }
                                            >
                                                Eliminar  &times;
                                            </button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

        </Fragment>
    );
}
 
export default withRouter(Visit);