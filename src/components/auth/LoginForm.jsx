


import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const companyCode = form.companyCode.value.trim();
    const employeeId = form.employeeId.value.trim();
    const password = form.password.value.trim();

    const storedData =
      JSON.parse(localStorage.getItem("userData")) || null;

    if (
      storedData &&
      storedData.companyCode === companyCode &&
      storedData.employeeCode === employeeId &&
      storedData.password === password
    ) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid user details");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Welcome Back 👋</h2>
          <p className="text-sm text-gray-500 mt-2">
            Login to continue to your dashboard
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          
          {/* Company Code */}
          <div className="flex flex-col gap-2">
            <Label>Company</Label>
            <Input
              name="companyCode"
              type="text"
              placeholder="Enter Company Code"
              required
            />
          </div>

          {/* Employee ID */}
          <div className="flex flex-col gap-2">
            <Label>Employee Id</Label>
            <Input
              name="employeeId"
              type="text"
              placeholder="Enter Employee Code"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Label>Password</Label>
              <span className="text-sm text-gray-500 hover:text-black cursor-pointer">
                Forgot?
              </span>
            </div>

            <Input
              name="password"
              type="password"
              placeholder="********"
              required
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-black text-white rounded-xl h-11 hover:opacity-90"
          >
            Login
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 flex justify-center gap-1">
          <p className="text-sm text-gray-500">
            Don’t have an account?
          </p>

          <span
            className="text-sm text-blue-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
}