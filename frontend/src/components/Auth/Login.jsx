import { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { PiPassword } from "react-icons/pi";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleSendVerification = async () => {
    try {
      if (!email) {
        toast.error("Please enter email first");
        return;
      }
      
      const resp = await axios.post(
        "http://localhost:4000/api/v1/user/generate-code",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(resp.data.message);
      setShowVerification(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password || !role) {
        toast.error("Please fill all required fields");
        return;
      }

      if (role === "TNP" && !verificationCode) {
        toast.error("Please enter verification code");
        return;
      }

      const resp = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role, verificationCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = resp.data;
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setVerificationCode("");
      setShowVerification(false);
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
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
            <img src="./nita.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>
          <form onSubmit={handleLogin}>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="">Select Role</option>
                  <option value="TNP">TNPs</option>
                  <option value="Student">Students</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>

            {role === "TNP" && (
              <div className="inputTag">
                <label>Verification Code</label>
                <div>
                  <input
                    type="text"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    required
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <PiPassword />
                </div>
              </div>
            )}
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            {role === "TNP" && (
              <button type="button" onClick={handleSendVerification}>
                {showVerification ? "Resend Code" : "Send Verification Code"}
              </button>
            )}
            <button type="submit">Login</button>
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;