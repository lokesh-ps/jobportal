import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f1f1f1",
      }}
    >
      <p>@2026 Lokesh P S. All rights reserved.</p>
      <p>
        Powered by <a href="https://github.com/lokesh-ps">Lokesh P S</a>
      </p>
      <div className="flex items-center justify-center gap-2">
        <Link to="/privacy-policy">
          <Button variant="link" className="px-0 text-sm">
            Privacy Policy
          </Button>
        </Link>
        <span>|</span>
        <Link to="/terms-of-service">
          <Button variant="link" className="px-0 text-sm">
            Terms of Service
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
