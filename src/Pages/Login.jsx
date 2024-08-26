import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxiosSequre from "../Hooks/axiosSecqure/useAxiosSequre";
import useToken from "../Hooks/tokenInfo/useToken";

export default function Login() {
  const [error, setError] = useState('');
  const axiosSequre = useAxiosSequre();
  const navigate = useNavigate();
  const userInfo = useToken()
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const phone = form.phone.value;
    const email = phone.includes("@") ? phone : null; //////////////////
    console.log(userInfo)
    axiosSequre.post("/login", { email, phone, password })
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          setError("");
          navigate("/dashboard"); 
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred while logging in. Please try again.");
          console.error("Error logging in:", error);
        }
      });

    form.reset();
  };

  return (
    <div className="w-full overflow-hidden font-roboto">
      <div className="flex h-[100vh] w-full flex-col justify-center items-center md:flex-row gap-4 mx-2 md:mx-6 z-10">
        
        <div className="w-4/5 md:w-1/3 p-6 bg-primary rounded py-16 shadow-lg">
     
          <h1 className='text-3xl font-mono text-purple-400  font-bold text-center'>Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-6 rounded-md">
            <input
              className="border border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
              type="text"
              name="phone"
              placeholder="Enter email ..."
            />
            <input
              className="border border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
              type="password"
              name="password"
              placeholder="Enter password ....."
            />
            <button
              className="text-white bg-purple-600 p-2  rounded lg:p-3"
              type="submit"
            >
              Log In
            </button>
          </form>
          <p className={`${error ? 'text-red-500 p-2 rounded-lg bg-red-100 text-center' : ''}`}>{error ? error : ''}</p>
          <div className="text-center">
            <Link to='/register' className="text-center mx-auto text-gray-400">Do not have any account? <span className="underline text-purple-400"> Register</span> </Link>
          </div>
          <div className="text-center mt-4">
            <button className="text-center text-sm mx-auto text-gray-400 hover:underline">Forgot password ?</button>
          </div>
        </div>
      </div>
    </div>
  );
}
