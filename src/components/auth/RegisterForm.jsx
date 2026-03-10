import { Button } from "../ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";



export default function RegisterForm() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    designation: "",
    department: "",
  });
  const [showSub, setShowSub] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // eslint-disable-next-line no-undef
    // const apiUrl = `${process.env.base_url}/Auth/register`;
    // const response = await fetch(apiUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });

    // response.json().then((data) => {
    //   if (response.ok) {
    //     alert("Registration successful! Please login.");
    //     navigate("/Login");
    //   } else {
    //     alert(`Registration failed: ${data.message || "Unknown error"}`);
    //   }
    // }).catch((error) => {
    //   alert(`An error occurred: ${error.message}`);
    // }
    // );


    console.log(formData);
    localStorage.setItem("userData", JSON.stringify(formData));
    navigate("/login");

    setFormData({
      username: "",
      email: "",
      password: "",
      role: "",
      designation: "",
      department: "",
      itRole: ""
    });
  };
  const handleDepartmentChange = (value) => {
    setFormData({ ...formData, department: value });
    if (value == "it") {
      setShowSub(true);
    } else {
      setShowSub(false);
    }


  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">

      {/* LEFT SIDE IMAGE */}
      <div className="w-1/2 hidden md:block"  >
        <img
          src="https://www.mishainfotech.com/images/Talent-Management.jpg"
          alt="HRMS"
          className="w-full h-screen object-cover"

        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-md ">
          <h2 className="text-3xl font-bold text-center mb-8">
            Create your account
          </h2>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label>Username</Label>
              <Input
                placeholder="Enter Username"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                style={{ border: "1px solid #BABABA" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter Your Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                style={{ border: "1px solid #BABABA" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="********"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                style={{ border: "1px solid #BABABA" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Designation</Label>
              <Input
                type="text"
                placeholder="Enter Designation"
                required
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                style={{ border: "1px solid #BABABA" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Role</Label>

              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }

              >
                <SelectTrigger className="w-full" style={{ border: "1px solid #BABABA" }}>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="teamlead">Team Lead</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className={`${showSub ? "col-span-2" : "col-span-4"}`}>
                <Label className="mb-2">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={handleDepartmentChange}
                >
                  <SelectTrigger className="w-full" style={{ border: "1px solid #BABABA" }}>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="hr-operations">HR Operations</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="talent-acquisition">
                      Talent Acquisition
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                {showSub && (
                  <div>
                    <Label className="mb-2">Select Role</Label>
                    <Select onValueChange={(value) =>
                      setFormData({ ...formData, itRole: value })} >
                      <SelectTrigger style={{ border: "1px solid #BABABA" }} className="w-full">
                        <SelectValue placeholder="Select IT Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend_Node">Backend(Node + Exp)</SelectItem>
                        <SelectItem value="backend_.Net">Backend(. Net Developer)</SelectItem>
                        <SelectItem value="devops">QA</SelectItem>
                      </SelectContent>
                    </Select></div>

                )}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white rounded-xl mt-4"
            >
              Register
            </Button>

          </form>
          <div className="flex justify-center items-center mt-4 gap-1">
            <p className="text-sm text-gray-600">
              Already have an account?
            </p>
            <span
              className="text-sm text-blue-600 cursor-pointer"
              onClick={() => navigate("/Login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}