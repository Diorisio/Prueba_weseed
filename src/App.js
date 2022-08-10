import {useEffect,useState} from 'react'
import axios from 'axios'


const pelicula='https://swapi.dev/api/films/'

function App() {

   const[actactor,setactor]=useState('')
   const[actpeliculas,setpeliculas]=useState('')

  useEffect(()=>{

    const actores=async()=>{
      try {
        const allactores=await axios.get('https://swapi.dev/api/people')
        
       setactor(allactores.data.results)

       setpeliculas(allactores.data.results.films)
        
      } catch (error) {
        console.log(error)
        
      }

    }
    actores()
  },[])

  const pelicula=async(datosfilms)=>{
    console.log(datosfilms)
    const allnombrefilms=[]
    for (let i = 0; i < datosfilms.length; i++) {

      const allpleiculas=await axios.get(datosfilms[i])
      
      allnombrefilms.push(allpleiculas.data.title)
      
      
    }
    setpeliculas(allnombrefilms)

  }
  


  return (
  <div>

    {actactor?
    
    actactor.map(actor=>

    <ul>
      <li key={actor.name} onClick={()=>pelicula(actor.films)}>{actor.name}</li>
    </ul>
    
    )
    
    :
    <p>Cargando</p>
  }
    <h2>peliculas en la cual ha actuado</h2>
    {actpeliculas?
      
    actpeliculas.map(pelicul=>

          
       <ul>
        <li>{pelicul}</li>
       </ul>
      )
    
      
     :
     <h2>sin pelicula</h2>
    }
     </div>
     )
}

export default App;
