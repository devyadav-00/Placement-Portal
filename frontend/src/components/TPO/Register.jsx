import { useContext, useState } from "react";
import { FaPhone, FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import nitaLogo from "../../../public/nita.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const [loader, setLoader] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/tpo/register",
        { firstname, lastname, phone, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setPhone("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src={nitaLogo} alt="logo" />
            <h3>Create a new account as TPO</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>First Name</label>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Last Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="tel"
                  placeholder="98XXXXXXXX"
                  title="Please enter a valid phone number"
                  pattern="[6789][0-9]{9}"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9]{0,10}$/.test(value)) {
                      setPhone(value);
                    }
                  }}
                  required
                />
                <FaPhone />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleRegister} disabled={loader}>
              {loader ? "Loading..." : "Register"}
            </button>
            <Link to={"/tpo/login"}>TPO Login </Link>
          </form>
        </div>
      </section>{" "}
    </>
  );
};

export default Register;