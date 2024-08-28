import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useAxiosSequre from "../Hooks/axiosSecqure/useAxiosSequre";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
export default function Register() {
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState("");
  const axiosSequre = useAxiosSequre();
  const [selectedAddress, setSelectedAddress] = useState(false);
  const [phone, setPhone] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [district, setdistrict] = useState([]);
  const [upzilla, setUpzilla] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    // Fetch countries when component mounts
    const fetchdistrict = async () => {
      try {
        const response = await axios.get(
          "https://bdapis.com/api/v1.2/districts"
        );
        setdistrict(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchdistrict();
  }, []);
  const fetchUpzilla = async () => {
    try {
      const response = await axios.get(
        `https://bdapis.com/api/v1.2/district/${selectedDistrict}`
      );
      setUpzilla(response.data.data.upazillas);
    } catch (error) {
      console.error("Error fetching upazillas:", error);
    }
  };

  useEffect(() => {
    fetchUpzilla();
  }, [selectedDistrict]);
 
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleOnChange = (value) => {
    setPhone(value);
  };
  const handleSelectChange = (event) => {
    setSelectedAddress(event.target.checked);
  };
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
  const handleFileChanges = (event) => {
    const file = event.target.files[0];
    const maxSize = 200 * 1024; // 200KB

    if (file) {
      if (file.size > maxSize) {
        alert("File size exceeds 200KB. Please select a smaller file.");
        event.target.value = "";
        return;
      } else {
        setSelectedFile(file);
      }
    }
  };
  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };
  console.log(selectedDistrict);
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
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="fName"
                >
                  First Name
                </label>
                <input
                  required
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                  type="text"
                  name="fName"
                  placeholder="First  Name.."
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="lName"
                >
                  Last Name
                </label>
                <input
                  required
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                  type="text"
                  name="lName"
                  placeholder="Last  Name.."
                />
              </div>
            </div>

            <div className="flex gap-3 flex-col md:flex-row">
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="uName"
                >
                  User Name
                </label>
                <input
                  required
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                  type="text"
                  name="uName"
                  placeholder="User Name.."
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="dob"
                >
                  Date of Birth
                </label>
                <input
                  required
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                  type="date"
                  name="dob"
                  placeholder="Date of Birth.."
                />
              </div>
            </div>
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="fName"
                >
                  Father{`'`}s Name
                </label>
                <input
                  required
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                  type="text"
                  name="phone"
                  placeholder="Father's  Name.."
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="mName"
                >
                  Mohter{`'`}s Name
                </label>
                <input
                  required
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                  type="text"
                  name="phone"
                  placeholder="Mother's  Name.."
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="nid"
                >
                  NID/passport
                </label>
                <input
                  required
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                  type="number"
                  name="phone"
                  placeholder="Enter NID / Passport number.."
                />
              </div>
              <div className="w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <div className="phone-input w-full border-gray-600 border rounded py-1">
                  <PhoneInput
                    required
                    country={"bd"}
                    onChange={handleOnChange}
                    placeholder="Enter your mobile number" // Placeholder text
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                    containerClass="w-full" // Full width for the container
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                required
                type="file"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleFileChanges}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <button
                onClick={handleButtonClick}
                className="p-2 px-4 bg-gray-700 text-gray-400 font-bold text-sm rounded hover:bg-gray-800  transitin duration-300"
              >
                Choose File
              </button>
              {selectedFile ? (
                <p className="text-gray-400">{selectedFile.name}</p>
              ) : (
                <p className="text-gray-400 text-sm">No file Chosen</p>
              )}
            </div>
            {/* border divider */}
            <div className=" flex justify-between my-4">
              <div className="border-b w-full border-gray-600"></div>
              <div className="w-full text-center text-gray-500 text-xs font-semibold">
                PRESENT ADDRESS
              </div>
              <div className="border-b border-gray-600 w-full"></div>
            </div>

            {/* present address inputs */}

            <div className="flex gap-3 flex-col md:flex-row">
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="careof"
                >
                  Care Of
                </label>
                <input
                  required
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                  type="text"
                  name="careof"
                  placeholder="Care Of.."
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="district"
                >
                  District
                </label>
                <select
                  name="district"
                  id=""
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                  placeholder="enter district"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                >
                  <option value="null" disabled selected hidden>
                    select District
                  </option>
                  {district.data &&
                    district.data.map((divsn) => (
                      <option key={divsn.district} value={divsn.district}>
                        {divsn.district}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* sub districts.......................................... */}
            <div
              className={`${
                selectedDistrict == null ? "hidden" : "flex"
              } gap-3 flex-col md:flex-row`}
            >
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="district"
                >
                  Upzilla
                </label>
                <select
                  name="upzilla"
                  id=""
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                >
                  <option value="" disabled selected hidden>
                    select upzilla
                  </option>
                  {upzilla &&
                    upzilla.map((divsn) => (
                      <option key={divsn} value={divsn}>
                        {divsn}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="thana"
                >
                  Thana
                </label>
                <select
                  name="thana"
                  id=""
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                >
                  <option value="" disabled selected hidden>
                    select thana
                  </option>
                  {district.data &&
                    district.data.map((divsn) => (
                      <option key={divsn.district} value={divsn.district}>
                        {divsn.district}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* ----------------------------------------------------- */}
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="postoffice"
                >
                  Post Office
                </label>
                <select
                  name="postoffice"
                  id=""
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                >
                  <option value="" disabled selected hidden>
                    select postOffice
                  </option>
                  {district.data &&
                    district.data.map((divsn) => (
                      <option key={divsn.district} value={divsn.district}>
                        {divsn.district}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* border divider */}
            <div className=" flex justify-between my-4">
              <div className="border-b w-full border-gray-600"></div>
              <div className="w-full text-center text-gray-500 text-xs font-semibold">
                PARMANENT ADDRESS
              </div>
              <div className="border-b border-gray-600 w-full"></div>
            </div>
            {/* inputs of parmanent address */}
            <div className="flex gap-3 items-center">
              <input className="text-xl" checked={selectedAddress} onChange={handleSelectChange} type="checkbox" name="isSame" id="isSame" />
              <label htmlFor="isSame" className="text-gray-400 font-semibold">
                Same to Present Address :{" "}
              </label>
            </div>
            <div
              className={`flex
               flex-col gap-3`}
            >
              
              <div className="flex gap-3 flex-col md:flex-row">
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="careof"
                >
                  Care Of
                </label>
                <input
                  required
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                  type="text"
                  name="careof"
                  placeholder="Care Of.."
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="district"
                >
                  District
                </label>
                <select
                  name="district"
                  id=""
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                  placeholder="enter district"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                >
                  <option value="null" disabled selected hidden>
                    select District
                  </option>
                  {district.data &&
                    district.data.map((divsn) => (
                      <option key={divsn.district} value={divsn.district}>
                        {divsn.district}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* sub districts.......................................... */}
            <div
              className={`${
                selectedDistrict == null ? "hidden" : "flex"
              } gap-3 flex-col md:flex-row`}
            >
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="district"
                >
                  Upzilla
                </label>
                <select
                  name="upzilla"
                  id=""
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                >
                  <option value="" disabled selected hidden>
                    select upzilla
                  </option>
                  {/* {upzilla.data &&
                    upzilla.data.map((divsn) => (
                      <option key={divsn.upzilla} value={divsn.upzilla}>
                        {divsn.upzilla}
                      </option>
                    ))} */}
                </select>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="thana"
                >
                  Thana
                </label>
                <select
                  name="thana"
                  id=""
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                >
                  <option value="" disabled selected hidden>
                    select thana
                  </option>
                  {district.data &&
                    district.data.map((divsn) => (
                      <option key={divsn.district} value={divsn.district}>
                        {divsn.district}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* ----------------------------------------------------- */}
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-xs font-semibold text-gray-500"
                  htmlFor="postoffice"
                >
                  Post Office
                </label>
                <select
                  name="postoffice"
                  id=""
                  className="border w-full border-gray-600 bg-primary px-3 py-2 rounded focus:border-gray-500 text-gray-200 outline-none"
                >
                  <option value="" disabled selected hidden>
                    select postOffice
                  </option>
                  {district.data &&
                    district.data.map((divsn) => (
                      <option key={divsn.district} value={divsn.district}>
                        {divsn.district}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            </div>
            {/* border divider */}
            <div className=" flex justify-between my-8">
              <div className="border-b w-full border-gray-600"></div>
              <div className="w-full text-center text-gray-500 text-xs font-semibold">
                Academic Qualification
              </div>
              <div className="border-b border-gray-600 w-full"></div>
            </div>
            {/* border divider */}
            <div className=" flex justify-between my-8">
              <div className="border-b w-full border-gray-600"></div>
              <div className="w-full text-center text-gray-500 text-xs font-semibold">
                Password
              </div>
              <div className="border-b border-gray-600 w-full"></div>
            </div>
            {/* password field */}
            <div className="flex gap-3 flex-col ">
              <div className="relative">
                <input
                  required
                  className="border w-full border-gray-700 bg-gray-700 px-3 py-2 rounded focus:border-gray-600 text-gray-200 outline-none"
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password .."
                />
                <div
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-5 top-3 text-xl text-gray-400"
                >
                  {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
              <input
                required
                className="border w-full border-gray-700 bg-gray-700 px-3 py-2 rounded focus:border-gray-600 text-gray-200 outline-none"
                type="password"
                name="conPassword"
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
