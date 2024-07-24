import { Link } from "react-router-dom";
import img from "../../public/assets/register.svg";
import { useState } from "react";
import useAxiosSequre from "../Hooks/axiosSecqure/useAxiosSequre";

export default function Register() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const axiosSequre = useAxiosSequre();

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const password = form.password.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const passwordPattern = /^[0-9]+$/;
    if (!passwordPattern.test(password)) {
      setError("Password must contain only numbers");
      return;
    } else {
      setError("");
    }

    const userInfo = {
      name,
      email,
      phone,
      password,
      status: "pending",
      role: 'user'
    };

    axiosSequre.post("/users", userInfo)
      .then(response => {
        if (response.status === 200) {
          setSuccess("Registration successful!");
          setError("");
          console.log("Data sent successfully:", response.data);

          // Store the token in localStorage
          localStorage.setItem("token", response.data.token);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.message);
          setSuccess("");
        } else {
          setError("An error occurred while sending data. Please try again.");
          console.error("Error sending data:", error);
          setSuccess("");
        }
      });

    form.reset();
  };

  return (
    <div className="md:h-[80vh] flex flex-col justify-center md:flex-row gap-4 mx-2 md:mx-6">
      <div className="lg:w-1/2">
        <img className="lg:p-24" src={img} alt="Register" />
      </div>
      <div className="md:w-1/2 lg:p-24">
        <h1 className="text-3xl font-mono text-purple-900 font-bold text-center">
          REGISTER
        </h1>
        <p className={`${error ? 'text-red-500 p-2 rounded-lg bg-red-100 text-center' : ''}`}>{error ? error : ''}</p>
        <p className={`${success ? 'text-green-500 p-2 rounded-lg bg-green-100 text-center' : ''}`}>{success ? success : ''}</p>
        <form onSubmit={handleForm} className="flex flex-col gap-3 p-6 rounded-md">
          <input required className="border border-[#bb89c7] p-2 lg:text-xl lg:p-4 rounded-tl-3xl rounded-br-3xl mb-2 outline-none" type="text" name="name" placeholder="Name" />
          <input required className="border border-[#b37fc0] p-2 rounded-tl-3xl rounded-br-3xl mb-2 lg:text-xl lg:p-4 outline-none" type="password" name="password" placeholder="Password" />
          <input required className="border border-[#9e74a8] p-2 rounded-tl-3xl rounded-br-3xl mb-2 lg:text-xl lg:p-4 outline-none" type="email" name="email" placeholder="Email" />
          <input required className="border border-[#85638e] p-2 rounded-tl-3xl rounded-br-3xl mb-2 lg:text-xl lg:p-4 outline-none" type="text" name="phone" placeholder="Phone number" />
          <button className="text-white text-xl bg-purple-900 p-2 rounded-tl-3xl rounded-br-3xl lg:p-4" type="submit">Register</button>
        </form>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="underline text-purple-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
