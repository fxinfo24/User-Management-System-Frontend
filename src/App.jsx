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
      if(data.insertedId){
        alert('User added successfully')
      }
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


/** Explanation of the upper codes
 * 
 * In the provided code, useEffect is a hook function provided by React that allows you to perform side effects in function components, such as fetching data, manipulating the DOM, or updating the component's state.

The first useEffect function is called with an empty array as its second argument. This means that it will only run once when the component is mounted. Inside this hook, it fetches data from the URL 'http://localhost:5009/users' using the fetch method, which returns a promise that resolves to the response object. The response object is then converted to JSON format using the res.json() method, which returns another promise that resolves to the actual data. Finally, the data is set to the state using the setUsers method. This hook is responsible for fetching data from the server and updating the component's state with the data.

The second useEffect function is called whenever the users state changes. This hook also fetches data from the same URL 'http://localhost:5009/users', but this time it sends a POST request to the server with the users state as the body of the request. The server returns a response in JSON format, which is then logged to the console. This hook is responsible for sending updated data to the server whenever the users state changes.

The useState function is another hook function provided by React that allows you to add state to function components. In this code, useState is used to define the users state and its initial value as an empty array. The setUsers function returned by useState is used to update the users state whenever it changes.

In the handleAddUser function, an event object is passed as an argument. This function is triggered when the form is submitted. It prevents the default behavior of the form submission using event.preventDefault(), and then extracts the name and email values from the form input fields. A new user object is created using these values and a unique id generated using the uuidv4 function. This new user object is then added to the existing users state using the setUsers method, which triggers the second useEffect hook to send the updated data to the server.

Finally, the App function returns a JSX expression that renders the user interface of the component. It includes a form to add new users, and a list of existing users. The map method is used to iterate over the users state and render each user's name, email, and id. The key prop is used to provide a unique identifier to each rendered element.
 */