import React, { useRef, useState, useEffect } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useNavigate, useParams } from "react-router-dom";

const VideoChat = ({ userInfo }) => {
  const { roomName } = useParams();
  const apiRef = useRef(null);
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(null); // Track meeting start time

  const handleApiReady = (api) => {
    apiRef.current = api;

    // Record the meeting start time
    const startTime = new Date(); // Set the start time when the meeting begins
    setStartTime(startTime);

    // Listen for the hangup button click
    api.on("toolbarButtonClicked", (button) => {
      if (button.key === "hangup") {
        console.log("Cancel button clicked. Ending meeting forcefully...");

        // Calculate meeting duration
        const endTime = new Date();
        const durationInSeconds = Math.round((endTime - startTime) / 1000); // Duration in seconds
        const minutes = Math.floor(durationInSeconds / 60); // Convert to minutes
        const seconds = durationInSeconds % 60; // Remaining seconds

        // End the meeting immediately
        api.executeCommand("hangup");

        // Hide the Jitsi Meet iframe
        const iframe = document.querySelector("iframe");
        if (iframe) {
          iframe.style.display = "none"; // Hide the iframe
        }

        // Navigate to the Success component with duration
        navigate("/success", {
          state: {
            duration: `${minutes} minutes ${seconds} seconds`, // Pass duration in minutes and seconds
          },
        });
      }
    });

    // Fallback: Listen for the readyToClose event
    api.on("readyToClose", () => {
      console.log("Meeting ended. Navigating to Success component...");

      // Calculate meeting duration
      const endTime = new Date();
      const durationInSeconds = Math.round((endTime - startTime) / 1000); // Duration in seconds
      const minutes = Math.floor(durationInSeconds / 60); // Convert to minutes
      const seconds = durationInSeconds % 60; // Remaining seconds

      // Hide the Jitsi Meet iframe
      const iframe = document.querySelector("iframe");
      if (iframe) {
        iframe.style.display = "none"; // Hide the iframe
      }

      // Navigate to the Success component with duration
      navigate("/success", {
        state: {
          duration: `${minutes} minutes ${seconds} seconds`, // Pass duration in minutes and seconds
        },
      });
    });
  };

  // Forcefully end the meeting if the component unmounts (e.g., user navigates away)
  useEffect(() => {
    return () => {
      if (apiRef.current) {
        apiRef.current.executeCommand("hangup"); // End the meeting
      }
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl flex justify-center items-center h-screen ">
      <div
        style={{
          width: "100%",
          maxWidth: "800px", // Adjust the max width as needed
          height: "500px", // Set the height to 500px
          borderRadius: "8px", // Add border radius of 4px
          overflow: "hidden", // Ensure the iframe corners are rounded
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow for better UI
        }}
      >
        <JitsiMeeting
          domain="call.bloomattires.com" // Use your self-hosted Jitsi domain
          roomName={roomName}
          getIFrameRef={(iframe) => {
            iframe.style.height = "100%"; // Fill the container height
            iframe.style.width = "100%"; // Fill the container width
            iframe.style.border = "none"; // Remove the iframe border
          }}
          onApiReady={handleApiReady}
          configOverwrite={{
            disableScreenSharing: true, // Disable screen sharing
            disableModeratorIndicator: true,
            disableProfile: true,
            disableRemoteMute: true,
            enableWelcomePage: false, // Disable the welcome page
            prejoinPageEnabled: false, // Disable the pre-join page
            startWithAudioMuted: false, // Start with audio enabled
            startWithVideoMuted: false, // Start with video enabled
            hideConferenceSubject: true,
            hideConferenceTimer: true,
            toolbarButtons: [
              "microphone",
              "camera",
              "hangup", // Keep the hangup button
              "fullscreen",
              "settings",
            ],
          }}
          interfaceConfigOverwrite={{
            SHOW_JITSI_WATERMARK: false, // Hide the Jitsi watermark
            SHOW_WATERMARK_FOR_GUESTS: false, // Hide the watermark for guests
            SHOW_BRAND_WATERMARK: false, // Hide the brand watermark
            SHOW_POWERED_BY: false, // Hide the "Powered by Jitsi" text
            APP_NAME: "Telemedicine", // Set your custom app name
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true, // Disable join/leave notifications
            TOOLBAR_BUTTONS: [
              "microphone",
              "camera",
              "hangup", // Keep the hangup button
              "fullscreen",
              "settings",
            ],
          }}
          userInfo={{
            displayName: userInfo.displayName,
            email: userInfo.email,
            avatarUrl: userInfo.avatarUrl,
          }}
        />
      </div>
    </div>
  );
};

export default VideoChat;
