import { useLoaderData } from "react-router";

const UpdateUser = () => {
    const user = useLoaderData()
    console.log(user)

    const handleUpdateForm = (e) =>{
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        console.log(name, email)

        const updatedUser = {name, email}
        fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log("data after update", data)
            if(data.modifiedCount){
                alert("Data upted successfully")
            }
        })

    }
    return (
        <div>
            <h3>Update User</h3>
            <p>id: "{user._id}"</p>
            <p>Name: {user.name} & Email: {user.email}</p>
            <form onSubmit={handleUpdateForm}>
                <input type="text" name="name" defaultValue={user.name}/>
                <br />
                <input type="text" name="email" defaultValue={user.email} />
                <br />
                <button>Update</button>
            </form>
        </div>
    );
};

export default UpdateUser;