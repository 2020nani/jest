import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import { MdDelete, MdPersonAdd } from 'react-icons/md'
import { Container, Grafico, Tabela, Session } from '../Home/styles'
import api from '../../services/api'

export default function Home() {
  const [options, setOptions] = useState({
    title: 'Grafico de participacao',
    is3D: true
  });
  const [id,setId] = useState([])
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [participation, setParticipation] = useState({});
  const [data, setData] = useState([
    ['nome', 'participacao'],

  ]);
  const [dados, setDados] = useState([])
  

  useEffect(() => {
    async function loadDados() {

      const response = await api.get('dados')
      response.data.map(elem => (

        data.push([elem.firstname, elem.participation])
      ))
      setDados(response.data)


    }
    loadDados()
  }, [])


  async function listar(id){
    const response = await api.get(`dados/${id}`)
    setDados([response.data])
    
  }


  function remover(id) {
    const response = api.delete(`dados/${id}`)
  }
  function handleSubmite(id) {

    const response = api.put(`dados/${id}`, {
      firstname,
      lastname,
      participation
    })

  }

  return (console.log(dados),
    

    <Container>

      <h1>DATA</h1>
      <p>lorem ipsum dolor sit amet consectetuer adipiscing elit</p>
      <Session>
      <form  onSubmit={listar} >
          <input name="pesquisa" type="text" placeholder="digite id" onChange={e => setId(e.target.value
            )} />
          <button type="button" onClick={()=>listar(id)}>Listar</button> 
            
      </form> 
         
        <Tabela>
          <table>
            <tr>
              <th></th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Participation</th>
              <th>Atualizar </th>
              <th>Deletar</th>
            </tr>
            
            {dados.map((data,index) => (
              <tr>
                <td>{data.id}</td>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.participation+'%'}</td>
                <td >
                  <form onSubmit={handleSubmite}>
                    <input name="firstname" type="text" placeholder="firstname" onChange={e => setFirstname(e.target.value
                    )} />
                    <input name="lasttname" type="text" placeholder="lastname" onChange={e => setLastname(e.target.value
                    )} />
                    <input name="participation" type="text" placeholder="participation" onChange={e => setParticipation(e.target.value
                    )} />
                    <Link id="link" to='/modalupdate'>
                      <button id="update" type="button" onClick={() => handleSubmite(data.id)}></button>
                      <MdPersonAdd size={30} color="#7159c1" />
                      </Link>
                  </form>


                </td>
                <td id="delete">
                  <Link  to='/modaldelete'>
                    <button id="remover" type="button" onClick={() => remover(data.id)}>
                      <MdDelete  color="#7159c1" />
                    </button>
                  </Link>
                </td>

              </tr>


            ))}

          </table>
        </Tabela>

        <Grafico>
          <Chart
            width={'100%'}
            chartType="PieChart"
            data={data}
            options={options}
          />
        </Grafico>

      </Session>
    </Container>

  );
}

