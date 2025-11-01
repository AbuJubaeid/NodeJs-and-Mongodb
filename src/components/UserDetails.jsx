import { useLoaderData } from "react-router";

const UserDetails = () => {

    const user = useLoaderData()
    console.log(user)
    
    return (
        <div>
            <h3>User Details</h3>
            <p>id: "{user._id}"</p>
            <p>Name: {user.name} & Email: {user.email}</p>
        </div>
    );
};

export default UserDetails;