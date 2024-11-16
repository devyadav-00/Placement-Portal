import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/job/getmyjobs", {
            withCredentials: true,
          })
          .then((res) => {
            console.log("response employer", res);

            setApplications(res.data.myJobs);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            console.log("response", res);

            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  console.log("applications", applications);

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Students</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  // openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {/* {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )} */}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="details">
          <p>
            <span>Job Title:</span> {element?.jobId?.title}
          </p>
          <p>
            <span>Category:</span> {element?.jobId?.category}
          </p>
          <p>
            <span>Country:</span> {element?.jobId?.country}
          </p>
          <p>
            <span>City:</span> {element?.jobId?.city}
          </p>
          <p>
            <span>Location:</span> {element?.jobId?.location}
          </p>
          <p>
            <span>Job Posted On:</span> {element?.jobId?.jobPostedOn}
          </p>
        </div>
        <hr />
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  console.log("element", element);

  return (
    <>
      <div className="job_seeker_card">
        <Link to={"/applications/" + element._id}>
          <div className="detail">
            <p>
              Title: <span> {element.title}</span>
            </p>
            <p>
              Category: <span>{element.category}</span>
            </p>
            <p>
              Country: <span>{element.country}</span>
            </p>
            <p>
              City: <span>{element.city}</span>
            </p>
            <p>
              Location: <span>{element.location}</span>
            </p>
            <p>
              Description: <span>{element.description}</span>
            </p>
            <p>
              Job Posted On: <span>{element.jobPostedOn}</span>
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};
