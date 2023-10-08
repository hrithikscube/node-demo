import axios from 'axios'
import React, { useEffect, useState } from 'react'

const TextInput = ({ name, type, value, handleChange, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      className="h-[47px] border w-full border-gray-400 outline-blue-400 text-base rounded-lg pl-3 placeholder:text-gray-400"
      placeholder={placeholder}
    />
  )
}

const App = () => {
  const [params, setParams] = useState({
    username: '',
    password: '',
  })

  const [users, setUsers] = useState([])

  console.log(params, 'params')

  const getAllUsers = () => {
    axios
      .get('http://localhost:4001/users')
      .then((response) => {
        console.log(response)
        let { data } = response
        console.log(data, 'userslist')
        setUsers(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const handleChange = (e) => {
    let { name, value } = e.target
    setParams({ ...params, [name]: value })
  }

  return (
    <div className="lg:p-10 md:p-7 p-5">
      <div className="w-1/2 m-auto bg-[#f2f2f2] rounded-[20px] h-[590px] lg:p-10 p-5">
        <h1 className="text-center font-medium text-lg">
          Welcome to my application
        </h1>

        <div className="flex flex-col gap-4 mt-4">
          <TextInput
            name="username"
            value={params.username}
            handleChange={handleChange}
            placeholder="Username"
          />

          <TextInput
            name="password"
            value={params.password}
            handleChange={handleChange}
            placeholder="Password"
            type="password"
          />

          <button className="bg-blue-400 h-[47px] flex items-center justify-center text-white text-base rounded-lg">
            Submit
          </button>

          <div className='flex flex-col p-4'>
            {users.map((item) => (
              <div>
                <p>{item.username}</p>
                <p>{item.password}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
