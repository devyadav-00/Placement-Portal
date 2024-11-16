import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How It Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Create an account to get started.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job</p>
              <p>
                Find a job that suits your interests and skills.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job</p>
              <p>
                Apply for the job and get hired.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
