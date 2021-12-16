import { useState } from "react";
import api from "../../apis/api";

export default function ProfiledBlocked(props) {
  const [remover, setRemover] = useState("toggleRemove");
  const [cancel, setCancel] = useState("remove");

  const blockedActivitiesId = props.currentUserObj.blockedActivities.map(
    (currentActivity) => {
      return currentActivity._id;
    }
  );

  async function handleUnblock(currentOption) {
    try {
      if (blockedActivitiesId.includes(currentOption._id)) {
        const response = await api.patch(
          `/profile/${props.loggedInUser.user._id}/${props.loggedInUser.user._id}`,
          currentOption._id
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <section className="mt-5 mx-4 px-4 d-flex justify-content-between align-items-center">
        <h3 style={{ fontSize: "1.5rem", color: "#FBF8F3" }}>
          blocked activities
        </h3>
        {cancel === "remove" ? (
          <small
            onClick={() => {
              setCancel("cancel");
              setRemover("");
            }}
            style={{ fontSize: "1rem", color: "#FBF8F3" }}
          >
            remove
          </small>
        ) : (
          <small
            onClick={() => {
              setCancel("remove");
              setRemover("toggleRemove");
            }}
            style={{ fontSize: "1rem", color: "#FBF8F3" }}
          >
            cancel
          </small>
        )}
      </section>
      <section className="d-flex justify-content-center">
        <div
          className="pt-2"
          style={{
            backgroundColor: "#FFF9F0",
            boxShadow: "0px 4px 20px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "15px",
            width: "90%",
            height: "35vh",
          }}
        >
          <div className="pt-4">
            {props.currentUserObj.blockedActivities
              .slice(0, 7)
              .map((currentActivity, index) => {
                if (
                  index + 1 <
                  props.currentUserObj.blockedActivities.slice(0, 4).length
                ) {
                  return (
                    <div
                      key={currentActivity.id}
                      className="d-flex justify-content-between"
                    >
                      <h3
                        className="ms-4"
                        style={{
                          fontSize: "1.6rem",
                          fontWeight: "bold",
                          paddingBottom: "8px",
                          borderBottom: "1px solid rgba(59, 59, 51, 1)",
                          width: "86%",
                        }}
                      >
                        {currentActivity.name}
                      </h3>
                      <h3
                        key={currentActivity.id}
                        className={`me-4 ${remover}`}
                        onClick={() => {
                          handleUnblock(currentActivity);
                        }}
                      >
                        x
                      </h3>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={currentActivity.id}
                      className="d-flex justify-content-between"
                    >
                      <h3
                        className="ms-4"
                        style={{
                          fontSize: "1.6rem",
                          fontWeight: "bold",
                          paddingBottom: "8px",
                          width: "86%",
                        }}
                      >
                        {currentActivity.name}
                      </h3>
                      <h3
                        onClick={() => {
                          handleUnblock(currentActivity);
                        }}
                        className={`me-4 ${remover}`}
                      >
                        x
                      </h3>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
