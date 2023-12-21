import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  function SignIn(){
    axios.get('auth/login')
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }
  return (
    <>
      <div>
        <button onClick={() => SignIn()}>Sign In</button>
      </div>
    </>
  )
}

export default App
