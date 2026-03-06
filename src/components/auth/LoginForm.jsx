
import { Button } from "../ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useNavigate } from "react-router-dom";

export default function LoginForm(){
    const navigate = useNavigate();


    
    return(
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
    <form className="flex flex-col gap-6" onSubmit={(e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (storedData && storedData.email === email && storedData.password === password) {
            localStorage.setItem("isAuthenticated", "true");
          navigate("/dashboard");
        } else {
          alert("Invalid email or password");
        }   
    }}>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <a href="#" className="text-sm text-gray-500 hover:text-black hover:underline">
            Forgot?
          </a>
        </div>

        <Input
          id="password"
          type="password"
          placeholder="********"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-black text-white rounded-xl h-11 hover:opacity-90"
      >
        Login
      </Button>

    </form>

    {/* Footer */}
    <div className="text-center mt-6 flex align-items-center justify-center gap-1">
      <p className="text-sm text-gray-500">
        Don’t have an account?
      </p>

    <span className="text-sm text-blue-600 cursor-pointer" onClick={() => navigate("/Register")}>
      Register
    </span>
    </div>

  </div>

</div>
    )
}

