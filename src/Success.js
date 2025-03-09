import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircleIcon, HomeIcon } from "lucide-react";

const Success = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { duration } = state || {};

  const handleBackToHome = () => {
    navigate("/");
  };

  const containerStyles = {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #eff6ff, #dbeafe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px"
  };

  const cardStyles = {
    backgroundColor: "white",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    borderRadius: "0.75rem",
    padding: "32px",
    textAlign: "center",
    maxWidth: "28rem",
    width: "100%"
  };

  const iconStyles = {
    margin: "0 auto",
    marginBottom: "24px",
    color: "#10b981"
  };

  const headingStyles = {
    fontSize: "1.875rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "16px"
  };

  const paragraphStyles = {
    marginBottom: "8px",
    color: "#4b5563"
  };

  const buttonStyles = {
    width: "100%",
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    padding: "12px 16px",
    borderRadius: "0.5rem",
    transition: "all 0.3s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    marginTop: "20px"
  };

  const buttonHoverStyles = {
    ...buttonStyles,
    backgroundColor: "#2563eb",
    transform: "scale(1.05)"
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <CheckCircleIcon
          style={iconStyles}
          size={80}
          strokeWidth={1.5}
        />
        <h1 style={headingStyles}>
          Meeting Ended Successfully!
        </h1>
        <p style={paragraphStyles}>Thank you for using our telemedicine service.</p>
        {duration && <p style={paragraphStyles}>Meeting Duration: {duration}</p>}
        <button
          onClick={handleBackToHome}
          style={isHovered ? buttonHoverStyles : buttonStyles}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <HomeIcon style={{ marginRight: "8px" }} size={20} />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;