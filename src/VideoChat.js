import React, { useRef, useState, useEffect } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useNavigate, useParams } from "react-router-dom";
import { Home, MessageSquare, HelpCircle, Menu, X } from "lucide-react";

const VideoChat = ({ userInfo }) => {
  const { roomName } = useParams();
  const apiRef = useRef(null);
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(null); // Track meeting start time
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

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

  // Navbar styles
  const navbarStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "white",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    zIndex: 50
  };

  const navbarContentStyles = {
    maxWidth: "1152px",
    margin: "0 auto",
    padding: "12px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const logoContainerStyles = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  };

  const logoImageStyles = {
    height: "40px",
    width: "40px",
    marginRight: "12px",
    borderRadius: "50%"
  };

  const logoTextStyles = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#1e40af"
  };

  // Video container styles (adjusted to account for navbar)
  const containerStyles = {
    margin: "0 auto",
    maxWidth: "1024px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    paddingTop: "70px" // Add padding to account for navbar
  };

  const jitsiContainerStyles = {
    width: "100%",
    maxWidth: "800px", 
    height: "500px",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  };

  // Mobile menu styles
  const mobileMenuButtonStyles = {
    color: "#4b5563",
    cursor: "pointer",
    display: "block"
  };

  const desktopNavStyles = {
    display: "none",
    gap: "24px",
    alignItems: "center"
  };

  // Media query simulation for desktop
  if (window.innerWidth >= 768) {
    desktopNavStyles.display = "flex";
    mobileMenuButtonStyles.display = "none";
  }

  const navLinkStyles = {
    display: "flex",
    alignItems: "center",
    color: "#374151",
    textDecoration: "none"
  };

  const iconMarginStyles = {
    marginRight: "4px"
  };

  const mobileDropdownStyles = {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "white",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    display: isMenuOpen ? "block" : "none"
  };

  const mobileMenuStyles = {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    gap: "8px"
  };

  const mobileNavLinkStyles = {
    display: "flex",
    alignItems: "center",
    padding: "8px 0",
    color: "#374151",
    textDecoration: "none"
  };

  const mobileIconMarginStyles = {
    marginRight: "8px"
  };

  return (
    <>
      {/* Navbar */}
      <nav style={navbarStyles}>
        <div style={navbarContentStyles}>
          <div 
            style={logoContainerStyles} 
            onClick={() => navigate("/")}
          >
            <img
              src="/api/placeholder/50/50"
              alt="Telemedicine Logo"
              style={logoImageStyles}
            />
            <span style={logoTextStyles}>Telemedicine</span>
          </div>

          {/* Mobile Menu Toggle */}
          <div style={mobileMenuButtonStyles}>
            <button
              onClick={toggleMenu}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div style={desktopNavStyles}>
            <a href="/" style={navLinkStyles}>
              <Home size={20} style={iconMarginStyles} /> Home
            </a>
            <a href="/services" style={navLinkStyles}>
              <MessageSquare size={20} style={iconMarginStyles} /> Services
            </a>
            <a href="/support" style={navLinkStyles}>
              <HelpCircle size={20} style={iconMarginStyles} /> Support
            </a>
          </div>

          {/* Mobile Dropdown Menu */}
          <div style={mobileDropdownStyles}>
            <div style={mobileMenuStyles}>
              <a href="/" style={mobileNavLinkStyles}>
                <Home size={20} style={mobileIconMarginStyles} /> Home
              </a>
              <a href="/services" style={mobileNavLinkStyles}>
                <MessageSquare size={20} style={mobileIconMarginStyles} /> Services
              </a>
              <a href="/support" style={mobileNavLinkStyles}>
                <HelpCircle size={20} style={mobileIconMarginStyles} /> Support
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Video Container */}
      <div style={containerStyles}>
        <div style={jitsiContainerStyles}>
          <JitsiMeeting
            domain="call.bloomattires.com/" // Use your self-hosted Jitsi domain
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
    </>
  );
};

export default VideoChat;