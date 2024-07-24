import { Link, useNavigate } from "react-router-dom";
import img from "../../public/assets/signin.svg";
import { useState } from "react";
import useAxiosSequre from "../Hooks/axiosSecqure/useAxiosSequre";

export default function Login() {
  const [error, setError] = useState('');
  const axiosSequre = useAxiosSequre();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const phone = form.phone.value;
    const email = phone.includes("@") ? phone : null; //////////////////

    axiosSequre.post("/login", { email, phone, password })
      .then(response => {
        if (response.status === 200) {
          const { token, email } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
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
    <div className="relative md:h-[80vh] w-full overflow-hidden ">
      <div className="absolute inset-0 bg-gradient animate-wave"></div>
      <div className="relative h-full flex flex-col justify-center items-center md:flex-row gap-4 mx-2 md:mx-6 z-10">
        <div className="lg:w-1/2 flex justify-center items-center">
          <img className="lg:p-2 w-2/3" src={img} alt="Sign in" />
        </div>
        <div className="md:w-1/2 lg:p-24">
          <h1 className='text-3xl font-mono text-purple-900 font-bold text-center'>Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-6 rounded-md">
            <input
              className="border border-[#b37fc0] p-2 rounded-tl-3xl rounded-br-3xl mb-2 lg:text-xl lg:p-4 outline-none"
              type="text"
              name="phone"
              placeholder="Phone number or email ..."
            />
            <input
              className="border border-[#b37fc0] p-2 rounded-tl-3xl rounded-br-3xl mb-2 lg:text-xl lg:p-4 outline-none"
              type="password"
              name="password"
              placeholder="password ....."
            />
            <button
              className="text-white text-xl bg-purple-900 p-2 rounded-tl-3xl rounded-br-3xl lg:p-4"
              type="submit"
            >
              Log In
            </button>
          </form>
          <p className={`${error ? 'text-red-500 p-2 rounded-lg bg-red-100 text-center' : ''}`}>{error ? error : ''}</p>
          <div>
            <p className="text-center text-gray-600">Do not have any account? <Link to="/register" className="underline text-purple-600">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
