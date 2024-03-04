import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
const Home = () => {
  const [token, setToken] = useState(false)
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get('http://localhost:3000/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/login')
        }
      }).catch(err => {
        console.log(err)
      })
  }

  axios.get('http://localhost:3000/verify').then(res => {
    if (res.data.status) {
      setToken(res.data.status)
    }
  }).catch(err => {
    console.log(err)
  })

  return (
    <div>
      <h1>Welcome to DAKSH</h1>

      {token ? (
        <>
          <button><Link to="/dashboard" >Dashboard</Link></button>
          <br /> <br />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button><Link to="/login" >Login</Link></button>
          <button><Link to='/signup'>Sign Up</Link></button>
        </>
      )}
    </div>
  )
}

export default Home