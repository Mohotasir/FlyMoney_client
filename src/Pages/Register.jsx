import { Link } from "react-router-dom";
import { useState } from "react";
import useAxiosSequre from "../Hooks/axiosSecqure/useAxiosSequre";

export default function Register() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const axiosSequre = useAxiosSequre();

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const password = form.password.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const nid = form.nid.value;
    const role = form.acType.value;

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
      role,
      nid,
    };

    axiosSequre
      .post("/users", userInfo)
      .then((response) => {
        const { success, message, token, data } = response.data;

        if (success) {
          setSuccess(message || "Registration successful!");
          setError("");
          console.log("Data sent successfully:", data);

          // Store token in localStorage
          localStorage.setItem("token", token);
        } else {
          setError(message);
          setSuccess("");
        }
      })
      .catch((error) => {
        if (error.response) {
          // Error response from server
          const { message } = error.response.data;
          setError(
            message || "An error occurred while sending data. Please try again."
          );
        } else if (error.request) {
          // No response from server
          setError(
            "No response from server. Please check your network connection."
          );
        } else {
          // Other errors
          setError("An unexpected error occurred. Please try again.");
        }
        console.error("Error sending data:", error);
        setSuccess("");
      });

    form.reset();
  };

  return (
    <div className="w-full overflow-hidden font-roboto">
      <div className="flex min-h-[100vh] w-full flex-col justify-center items-center md:flex-row gap-4 mx-2 md:mx-6 z-10">
        <div className="w-4/5 md:w-1/2 p-6 bg-primary rounded py-6 shadow-lg">
          <h1 className="text-3xl font-mono text-purple-400  font-bold text-center">
            Register Account
          </h1>
          <form
            onSubmit={handleForm}
            className="flex flex-col gap-3 p-6 rounded-md"
          >
            <div className="flex gap-3 flex-col md:flex-row">
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="First  Name.."
              />
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="Last  Name.."
              />
            </div>
            <div className="">
            <input
            className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
            type="text"
            name="phone"
            placeholder="Full  Name.."
          />       
            </div>
            <div className="flex gap-3 flex-col md:flex-row">
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="User Name.."
              />
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="date"
                name="phone"
                placeholder="Date of Birth.."
              />
            </div>
            <div className="flex gap-3 flex-col md:flex-row">
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="Father's  Name.."
              />
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="Mother's  Name.."
              />
            </div>
            <div>
            <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="Enter NID / Passport number.."
              />
            </div>
            {/* border divider */}
            <div className=" flex justify-between my-8">
                 <div className="border-b w-full border-gray-600"></div>
                 <div className="w-full text-center text-gray-500 text-xs font-semibold">PRESENT ADDRESS</div>
                 <div className="border-b border-gray-600 w-full"></div>
            </div>
            {/* present address inputs */}
            <div className="flex gap-3 flex-col md:flex-row">
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="First  Name.."
              />
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="Last  Name.."
              />
            </div>
            <div className="flex gap-3 flex-col md:flex-row">
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="First  Name.."
              />
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="Last  Name.."
              />
            </div>
            <div className="flex gap-3 flex-col md:flex-row">
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="First  Name.."
              />
             
            </div>
            {/* border divider */}
            <div className=" flex justify-between my-8">
                 <div className="border-b w-full border-gray-600"></div>
                 <div className="w-full text-center text-gray-500 text-xs font-semibold">PARMANENT ADDRESS</div>
                 <div className="border-b border-gray-600 w-full"></div>
            </div>
            {/* inputs of parmanent address */}
            <div className="flex gap-3 flex-col md:flex-row">
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="First  Name.."
              />
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="Last  Name.."
              />
            </div>
            <div className="flex gap-3 flex-col md:flex-row">
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="First  Name.."
              />
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="Last  Name.."
              />
            </div>
            <div className="flex gap-3 flex-col md:flex-row">
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="First  Name.."
              />
             
            </div>
            {/* border divider */}
            <div className=" flex justify-between my-8">
                 <div className="border-b w-full border-gray-600"></div>
                 <div className="w-full text-center text-gray-500 text-xs font-semibold">Academic Qualification</div>
                 <div className="border-b border-gray-600 w-full"></div>
            </div>
            {/* border divider */}
            <div className=" flex justify-between my-8">
                 <div className="border-b w-full border-gray-600"></div>
                 <div className="w-full text-center text-gray-500 text-xs font-semibold">Password</div>
                 <div className="border-b border-gray-600 w-full"></div>
            </div>
            {/* password field */}
            <div className="flex gap-3 flex-col ">
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="Enter Password .."
              />
              <input
                className="border w-full border-gray-700 bg-gray-700 p-3 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="text"
                name="phone"
                placeholder="Confirm Password .."
              />
            </div>
            <button
              className="text-white bg-purple-600 p-2  rounded lg:p-3 hover:bg-purple-700 transition duration-300"
              type="submit"
            >
              REGISTER
            </button>
          </form>
          <p
            className={`${
              error ? "text-red-500 p-2 rounded-lg bg-red-100 text-center" : ""
            }`}
          >
            {error ? error : ""}
          </p>
          <div className="text-center">
            <Link to="/" className="text-center mx-auto text-gray-400">
              Already have an account?{" "}
              <span className="underline text-purple-400"> Log In</span>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
