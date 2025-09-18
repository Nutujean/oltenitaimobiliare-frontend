import React from "react";

function Contact() {
  return (
    <div className="container">
      <h2>📞 Contact</h2>
      <p>Ne poți contacta folosind datele de mai jos:</p>

      <ul>
        <li><strong>Email:</strong> contact@oltenitaimobiliare.ro</li>
        <li><strong>Telefon:</strong> +40 7XX XXX XXX</li>
        <li><strong>Adresă:</strong> Strada Exemplu 10, Oltenița, România</li>
      </ul>

      <h3>Formular de contact</h3>
      <form className="form-styled" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Nume" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Mesajul tău" rows="4" required></textarea>
        <button type="submit" className="btn">Trimite</button>
      </form>
    </div>
  );
}

export default Contact;
