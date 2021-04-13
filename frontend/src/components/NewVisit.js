import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clientAxios from '../config/axios';

const NewVisit = (props) => {

    //generar state como objeto
    const [cita, guardarCita] = useState({
        name: '',
        owner: '',
        date: '',
        hour: '',
        telephone: '',
        symptom: ''
    })

    //Leer los datos del formulario
    const updateState = e => {
        guardarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //Enviar una petición a la API
    const createNewVist = e => {
        e.preventDefault();

        //enviar la petición por axios
        clientAxios.post('/pacientes', cita)
            .then(res => {
                console.log(res);
                props.saveQuery(true);
                //redireccionar
                props.history.push('/')
            })
    }
    return ( 
        <Fragment>
            <h1 className="my-5">Crear nueva Cita</h1>
                <div className="container mt-5 py-5">
                    <div className="row">
                        <div className="col-12 mb-5 d-flex justify-content-center">
                            <Link to={'/'} className="btn btn-primary text-uppercase py-2 px-5 font-weight-bold">Volver</Link>
                        </div>

                        <div className="col-md-8 mx-auto">
                            <form
                                onSubmit={createNewVist}
                                className="bg-white p-5 bordered">
                                <div className="form-group">
                                    <label htmlFor="name">Nombre Mascota</label>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        id="name" 
                                        name="name" 
                                        placeholder="Nombre Mascota"
                                        onChange={updateState} 
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="owner">Nombre Propietario</label>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        id="owner" 
                                        name="owner" 
                                        placeholder="Nombre Propietario"
                                        onChange={updateState}  
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="telephone">Teléfono</label>
                                    <input 
                                        type="tel" 
                                        className="form-control form-control-lg" 
                                        id="telephone" 
                                        name="telephone" 
                                        placeholder="Teléfono"
                                        onChange={updateState} 
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="date">Fecha Alta</label>
                                    <input 
                                        type="date" 
                                        className="form-control form-control-lg" 
                                        id="date" 
                                        name="date" 
                                        onChange={updateState}  
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="hour">Hora Alta</label>
                                    <input 
                                        type="time" 
                                        className="form-control form-control-lg" 
                                        id="hour" 
                                        name="hour"
                                        onChange={updateState}   
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="symptom">Síntomas</label>
                                    <textarea 
                                        className="form-control" 
                                        name="symptom" 
                                        rows="6"
                                        onChange={updateState} 
                                    ></textarea>
                                </div>


                                <input type="submit" className="btn btn-danger mt-3 w-100 p-3 text-uppercase font-weight-bold" value="Crear Cita"  />
                            </form>
                        </div>
                    </div>
                </div>

        </Fragment>
        
        
    );
}
 
export default withRouter(NewVisit) ;