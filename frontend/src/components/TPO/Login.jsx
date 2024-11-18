import { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import nitaLogo from "../../../public/nita.png";
import { PiPassword } from "react-icons/pi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  const handleSendVerification = async () => {
    try {
      if (!email) {
        toast.error("Please enter Email first!");
        return;
      }

      const resp = await axios.post(
        "http://localhost:4000/api/v1/tpo/generate-code",
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
      if (!email || !password || !verificationCode) {
        toast.error("Please fill all fields");
        return;
      }

      const resp = await axios.post(
        "http://localhost:4000/api/v1/tpo/login",
        { email, password, verificationCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { data } = resp;
      if (data.user) {
        setUser(data.user);
        toast.success(data.message);
        setEmail("");
        setPassword("");
        setVerificationCode("");
        setIsAuthorized(true);
      } else {
        toast.error("Login failed");
      }
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
            <img src={nitaLogo} alt="logo" />
            <h3>Login as TPO</h3>
          </div>
          <form onSubmit={handleLogin}>
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
            <button type="button" onClick={handleSendVerification}>
              {showVerification ? "Resend Code" : "Send Verification Code"}
            </button>
            <button type="submit">Login</button>
            <Link to={"/tpo/register"}>Register</Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
