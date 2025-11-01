import { use, useState } from "react";
import { Link } from "react-router";

const Users = ({userPromise}) => {
    const userData = use(userPromise)
    const [user, setUser] =useState(userData)


    const hanldeForm = (e)=>{
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        console.log(name, email)
        const newUser = {name, email}

        fetch('http://localhost:3000/users',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('data after post', data)
            if(data.insertedId){
                newUser.id = data.insertedId
                const newUsers = [...user, newUser]
                setUser(newUsers)
                alert('data added successfully')
                e.target.reset()
            }
        })
    }

    const handleDeleteButton = (id)=>{
        console.log('delete a user', id)
        fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE"
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('after delete', data)
            if(data.deletedCount){
                alert("deleted successfully")
                const remainingUsers = user.filter(user=>user._id !== id)
                setUser(remainingUsers)
            }
        })
    }

    return (
        <div>
            <div>
                <h1>Total Users: {user.length}</h1>
            </div>
            <form onSubmit={hanldeForm}>
                <label htmlFor="">Name</label>
                <br />
                <input type="text" name="name" id="" />
                <br />
                <label htmlFor="">Email</label>
                <br />
                <input type="email" name="email" id="" />
                <br />
                <input type="submit" value="Add User" name="" id=""/>
            </form>

            <p>-----------------------------------</p>
            <div>
                {
                    user.map(user=><p key={user._id}>{user.name}: {user.email} 
                    <Link to={`user/${user._id}`}>| Details </Link> 
                    <Link to={`update/${user._id}`}>| Edit |</Link> 
                    <button onClick={()=>handleDeleteButton(user._id)}>X</button></p>)
                }
            </div>
        </div>
    );
};

export default Users;