
import React, { useState, useEffect } from 'react';

const Users = () => {
    const [users,setUsers] = useState([] || JSON.parse(localStorage.getItem('users')) );

  useEffect(() => {
      const fetchUsers = async () => {
        try {
            const response = await fetch('/user/getUsers');

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const json = await response.json();
            
            localStorage.setItem('users', JSON.stringify(json));
            setUsers(json);
            
        } catch (error) {
            console.log(error);
            
        }

    }
    fetchUsers();   
  },[])

    return (
        <div className="container">
            {users.map((user, index) => (
                <div key={index} className="user-card">
                    <h2 dangerouslySetInnerHTML={{ __html:user?.username }}></h2>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    )
}
export default Users;