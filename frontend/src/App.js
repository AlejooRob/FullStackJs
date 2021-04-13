import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import clientAxios from './config/axios';
//Componentes
import Patients from './components/Patients';
import NewVisit from './components/NewVisit';
import Visit from './components/Visit';

function App() {
  
  // State de la app
  const [citas, guardarCitas] = useState([]);
  const [query, saveQuery] = useState(true);

  useEffect(() => {
    
    if(query) {
      const checkAPI = () => {
        clientAxios.get('/pacientes')
          .then(res => {
            // colocar en el state resultado
            guardarCitas(res.data);
            //deshabilitar la consulta
            saveQuery(false);
          })
          .catch(err => {
            console.log(err)
          })
      }
      checkAPI();
    }
  }, [query]);

  return (
    <Router>
        <Switch>
          <Route 
            exact 
            path="/"
            component={() => <Patients citas={citas} />}
          />

          <Route 
            exact 
            path="/nueva"
            component={() => <NewVisit saveQuery={saveQuery} />}
          />

          <Route 
            exact 
            path="/cita/:id"
            render={(props) => {
              const cita = citas.filter(cita => cita._id === props.match.params.id);
              console.log(cita);

              return (
                <Visit 
                  cita={cita[0]}
                  saveQuery={saveQuery}
                />
              )
            }}
          />
        </Switch>
    </Router>
  );
    
}

export default App;
