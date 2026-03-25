import React from 'react'

const profile = () => {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <div style={{marginLeft: "200px", marginTop: "65px", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1 style={{marginBottom : "20px", fontWeight: "bold"}}>Profile Information</h1>
       <form action="" style={{border: "1px solid #BABABA", width: "40%", padding: "20px", display: "flex", flexDirection: "column", gap: "35px", height: "75vh", borderRadius: "8px", backgroundColor: "white", paddingTop: "30px"}}>
        <div className="form-group" >
         
       <label htmlFor="username" style={{marginBottom: "80px"}}>Username</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" value={user.username} style={{border: "1px solid #BABABA", padding: "8px", borderRadius: "4px", width: "100%"}}/>
        </div>

        <div className="form-group">
        
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" value={user.email} style={{border: "1px solid #BABABA", padding: "8px", borderRadius: "4px", width: "100%"}}/>
        </div>

        <div className="form-group">
          <label htmlFor="designation">Designation</label>
            <input type="text" id="designation" name="designation" placeholder="Enter your designation" value={user.designation} style={{border: "1px solid #BABABA", padding: "8px", borderRadius: "4px", width: "100%"}}/>
        </div>
         <div className="form-group">
           <label htmlFor="department">Department</label>
            <input type="text" id="department" name="department" placeholder="Enter your department"value={user?.department ? user?.department?.toUpperCase() : ''}style={{border: "1px solid #BABABA", padding: "8px", borderRadius: "4px", width: "100%"}}/>
        </div>

        <button type="submit" style={{border: "1px solid #BABABA", padding: "10px", borderRadius: "4px", backgroundColor: "black", color: "white"}}>
          Update Profile
        </button>

       </form>


    </div>
  )
}

export default profile