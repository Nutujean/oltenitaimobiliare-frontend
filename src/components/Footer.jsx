import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>© {new Date().getFullYear()} OltenitaImobiliare.ro - Toate drepturile rezervate</p>
        <p>
          Dezvoltat cu ❤️ pentru Oltenița | Creat de Jean's
        </p>
      </div>
    </footer>
  );
}

export default Footer;
