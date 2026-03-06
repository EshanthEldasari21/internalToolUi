import React from 'react'

const profile = () => {
  return (
    <div style={{marginLeft: "250px", marginTop: "100px"}}>
        <h1>Profile Information</h1>
       <form action="">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" />
        </div>

        <div className="form-group">
            <label htmlFor="designation">Designation:</label>
            <input type="text" id="designation" name="designation" placeholder="Enter your designation" />
        </div>
         <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input type="text" id="department" name="department" placeholder="Enter your department" />
        </div>

        <button type="submit">Update Profile</button>

       </form>


    </div>
  )
}

export default profile