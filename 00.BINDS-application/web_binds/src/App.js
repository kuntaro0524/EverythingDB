import './App.css';
import axios from 'axios';
import { DisplayApps } from './DisplayApps';
import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

function App() {

  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4649/allapp", {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then(res => {
        console.log("Here done");
        setApps(res.data);
      })
      .catch(function (error) {
        console.log("ERROR?");
        console.log(error.config);
        for(let key of Object.keys(error)) {
   		console.log(key);
		console.log(error[key]);
	}
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  },[]);

  return (
    <ChakraProvider>
    <div className="App">
      <h1> BINDS application GUI ver 1.0 </h1>
      <DisplayApps apps={apps}/>
    </div>
    </ChakraProvider>
  );
}

export default App;
