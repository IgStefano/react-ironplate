import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../apis/api";
import DeleteModal from "../../components/DeleteModal";
import { Video } from "cloudinary-react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function DetailsFromActivity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activityData, setActivityData] = useState({
    name: "",
    type: "",
    duration: 0,
    description: "",
    instructions: "",
    media: new File([], ""),
    mediaURL: "",
    mediaType: "",
    creatorName: "",
    creatorURL: "",
  });

  const videoIndex = activityData?.mediaURL?.indexOf("/pause/");

  const publicId = activityData?.mediaURL?.slice(videoIndex + 7).split(".")[0];

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await api.get(`/activities/${id}`);

        setActivityData({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchActivity();
  }, [id]);

  return (
    <div>
      <div className="buttons-to mt-3">
        <Link to={`/activitylist`}>
          <ArrowBackIosNewIcon sx={{ color: "white" }} fontSize="large" />
        </Link>
      </div>
      <div className="buttons-to mt-4">
        <Link to={`/activityedit/${activityData._id}`}>
          <button className="btn btn-light btn-lg" style={{ color: "#965353" }}>
            Edit
          </button>
        </Link>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-light btn-lg"
          style={{ color: "#965353" }}
        >
          Delete
        </button>
      </div>
      <div className="admin-container mx-5">
        <div className="admin-list">
          <h1 className="mx-5 my-4">{activityData.name}</h1>
          <h2>{activityData.type}</h2>
          <h2>{activityData.duration} min</h2>
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://${activityData.creatorURL}`}
          >
            <h4 style={{ textDecorationColor: "none", color: "#FFF9F0" }}>
              {activityData.creatorName}
            </h4>
          </a>
          <p className="mt-3" style={{ fontSize: "18px" }}>
            {activityData.description}
          </p>
          <p style={{ fontSize: "18px" }}>{activityData.instructions}</p>

          <section className="d-flex flex-column justify-content-center align-items-center mb-2 pb-2">
            {activityData.media === "image" ? (
              <img
                className=""
                style={{
                  // height: "29vh",
                  width: "79vw",
                  borderRadius: "15px",
                }}
                src={activityData.mediaURL}
                alt={activityData.name}
              />
            ) : null}
            {activityData.media === "video" ? (
              <Video
                cloudName="igor-stefano"
                publicId={`${publicId}`}
                controls={true}
                style={{ width: "79vw", borderRadius: "15px" }}
              />
            ) : null}
          </section>
        </div>
      </div>
      <DeleteModal
        title="Are you sure you would like to delete this activity?"
        variant="danger"
        confirmationText="Delete"
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirmation={() => {
          navigate(`/activitydelete/${id}`);
          setShowModal(false);
        }}
      >
        This action is irreversible. Data from this activity cannot be
        retrieved.
      </DeleteModal>
    </div>
  );
}
