import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [users, setUsers] = useState([])
  useEffect( () => {
    fetch('http://localhost:5009/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  useEffect(() => {
    fetch('http://localhost:5009/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({users: users}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Inside post response',data);
    })
  }, [users])

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const newUser = { id: uuidv4(), name, email };
    console.log(newUser);
    setUsers([...users, newUser]);
    form.reset();
  };

  return (
    <>
      
      <h1>User Management System has</h1>
      <h3>Numbers Of Users {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
      {
        users.map(user => <p
        key={user.id}
        >{user.name} : {user.email} {user.id}</p>)
      }
      </div>
      
    </>
  )
}

export default App
