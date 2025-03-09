import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Video,
  Shield,
  Clock,
  Heart,
  Mic,
  Menu,
  X,
  Home as HomeIcon,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    alignItems: "center"
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

  const mobileMenuButtonStyles = {
    color: "#4b5563",
    cursor: "pointer"
  };

  const mobileMenuButtonHoverStyles = {
    color: "#2563eb"
  };

  const desktopNavStyles = {
    display: "none",
    gap: "24px",
    alignItems: "center",
    "@media (min-width: 768px)": {
      display: "flex"
    }
  };

  const navLinkStyles = {
    display: "flex",
    alignItems: "center",
    color: "#374151",
    textDecoration: "none"
  };

  const navLinkHoverStyles = {
    color: "#2563eb"
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
    display: isOpen ? "block" : "none"
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

  const mobileNavLinkHoverStyles = {
    backgroundColor: "#eff6ff"
  };

  const mobileIconMarginStyles = {
    marginRight: "8px"
  };

  return (
    <nav style={navbarStyles}>
      <div style={navbarContentStyles}>
        <div style={logoContainerStyles}>
          <img
            src="/api/placeholder/50/50"
            alt="Telemedicine Logo"
            style={logoImageStyles}
          />
          <span style={logoTextStyles}>Telemedicine</span>
        </div>

        {/* Mobile Menu Toggle */}
        <div style={{ display: "block", "@media (min-width: 768px)": { display: "none" } }}>
          <button
            onClick={toggleMenu}
            style={mobileMenuButtonStyles}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, mobileMenuButtonHoverStyles)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, mobileMenuButtonStyles)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div style={desktopNavStyles}>
          <a
            href="/"
            style={navLinkStyles}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, {...navLinkStyles, ...navLinkHoverStyles})}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, navLinkStyles)}
          >
            <HomeIcon size={20} style={iconMarginStyles} /> Home
          </a>
          <a
            href="/services"
            style={navLinkStyles}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, {...navLinkStyles, ...navLinkHoverStyles})}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, navLinkStyles)}
          >
            <MessageSquare size={20} style={iconMarginStyles} /> Services
          </a>
          <a
            href="/support"
            style={navLinkStyles}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, {...navLinkStyles, ...navLinkHoverStyles})}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, navLinkStyles)}
          >
            <HelpCircle size={20} style={iconMarginStyles} /> Support
          </a>
        </div>

        {/* Mobile Dropdown Menu */}
        <div style={mobileDropdownStyles}>
          <div style={mobileMenuStyles}>
            <a
              href="/"
              style={mobileNavLinkStyles}
              onMouseOver={(e) => Object.assign(e.currentTarget.style, {...mobileNavLinkStyles, ...mobileNavLinkHoverStyles})}
              onMouseOut={(e) => Object.assign(e.currentTarget.style, mobileNavLinkStyles)}
            >
              <HomeIcon size={20} style={mobileIconMarginStyles} /> Home
            </a>
            <a
              href="/services"
              style={mobileNavLinkStyles}
              onMouseOver={(e) => Object.assign(e.currentTarget.style, {...mobileNavLinkStyles, ...mobileNavLinkHoverStyles})}
              onMouseOut={(e) => Object.assign(e.currentTarget.style, mobileNavLinkStyles)}
            >
              <MessageSquare size={20} style={mobileIconMarginStyles} /> Services
            </a>
            <a
              href="/support"
              style={mobileNavLinkStyles}
              onMouseOver={(e) => Object.assign(e.currentTarget.style, {...mobileNavLinkStyles, ...mobileNavLinkHoverStyles})}
              onMouseOut={(e) => Object.assign(e.currentTarget.style, mobileNavLinkStyles)}
            >
              <HelpCircle size={20} style={mobileIconMarginStyles} /> Support
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const handleVideoCallClick = () => {
    const roomName = `telemedicine-room-${Math.random()
      .toString(36)
      .substring(7)}`;
    navigate(`/video-call/${roomName}`);
  };

  const handleAudioCallClick = () => {
    const roomName = `telemedicine-audio-${Math.random()
      .toString(36)
      .substring(7)}`;
    navigate(`/audio-call/${roomName}`);
  };

  const containerStyles = {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #eff6ff, #dbeafe)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    paddingTop: "96px"
  };

  const cardStyles = {
    maxWidth: "36rem",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    padding: "32px",
    textAlign: "center"
  };

  const titleStyles = {
    fontSize: "2.25rem",
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: "24px"
  };

  const featuresContainerStyles = {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    marginBottom: "24px"
  };

  const featureItemStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const featureTextStyles = {
    fontSize: "0.875rem",
    color: "#4b5563"
  };

  const buttonContainerStyles = {
    display: "flex",
    gap: "16px",
    marginBottom: "16px"
  };

  const buttonBaseStyles = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 24px",
    color: "white",
    fontWeight: "600",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: "background-color 0.3s",
    border: "none",
    cursor: "pointer"
  };

  const videoButtonStyles = {
    ...buttonBaseStyles,
    backgroundColor: "#2563eb"
  };

  const videoButtonHoverStyles = {
    ...buttonBaseStyles,
    backgroundColor: "#1d4ed8"
  };

  const audioButtonStyles = {
    ...buttonBaseStyles,
    backgroundColor: "#16a34a"
  };

  const audioButtonHoverStyles = {
    ...buttonBaseStyles,
    backgroundColor: "#15803d"
  };

  const subtitleStyles = {
    fontSize: "0.875rem",
    color: "#6b7280",
    fontStyle: "italic"
  };

  const secondCardStyles = {
    marginTop: "32px",
    textAlign: "center",
    maxWidth: "36rem",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    padding: "24px"
  };

  const secondCardTitleStyles = {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1d4ed8",
    marginBottom: "16px"
  };

  const listStyles = {
    gap: "8px",
    textAlign: "left",
    color: "#4b5563"
  };

  const listItemStyles = {
    display: "flex",
    alignItems: "center"
  };

  const checkmarkStyles = {
    marginRight: "8px",
    color: "#10b981"
  };

  return (
    <>
      <Navbar />
      <div style={containerStyles}>
        <div style={cardStyles}>
          <h1 style={titleStyles}>
            Welcome to Telemedicine
          </h1>

          <div style={featuresContainerStyles}>
            <div style={featureItemStyles}>
              <Shield style={{ color: "#10b981", marginBottom: "8px" }} size={40} />
              <p style={featureTextStyles}>Secure</p>
            </div>
            <div style={featureItemStyles}>
              <Clock style={{ color: "#3b82f6", marginBottom: "8px" }} size={40} />
              <p style={featureTextStyles}>Convenient</p>
            </div>
            <div style={featureItemStyles}>
              <Heart style={{ color: "#ef4444", marginBottom: "8px" }} size={40} />
              <p style={featureTextStyles}>Professional</p>
            </div>
          </div>

          <div style={buttonContainerStyles}>
            <button
              onClick={handleVideoCallClick}
              style={videoButtonStyles}
              onMouseOver={(e) => Object.assign(e.currentTarget.style, videoButtonHoverStyles)}
              onMouseOut={(e) => Object.assign(e.currentTarget.style, videoButtonStyles)}
            >
              <Video style={{ marginRight: "8px" }} size={24} />
              Video Call
            </button>
            <button
              onClick={handleAudioCallClick}
              style={audioButtonStyles}
              onMouseOver={(e) => Object.assign(e.currentTarget.style, audioButtonHoverStyles)}
              onMouseOut={(e) => Object.assign(e.currentTarget.style, audioButtonStyles)}
            >
              <Mic style={{ marginRight: "8px" }} size={24} />
              Audio Call
            </button>
          </div>

          <p style={subtitleStyles}>
            Connecting you with healthcare professionals
          </p>
        </div>

        <div style={secondCardStyles}>
          <h2 style={secondCardTitleStyles}>
            Why Choose Telemedicine?
          </h2>
          <ul style={listStyles}>
            <li style={listItemStyles}>
              <span style={checkmarkStyles}>✓</span>
              Convenient consultations from anywhere
            </li>
            <li style={listItemStyles}>
              <span style={checkmarkStyles}>✓</span>
              Reduced waiting times
            </li>
            <li style={listItemStyles}>
              <span style={checkmarkStyles}>✓</span>
              High-quality, secure video consultations
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;