import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Portfolio from "./components/Portfolio.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import AuthDialog from "./components/AuthDialog.jsx";
import { api } from "./api.js";

export default function App() {
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);

  // On every page load, ask the server who we are. The session cookie is why this survives a refresh.
  useEffect(() => {
    api("/api/auth/me").then(setUser).catch(() => setUser(null));
  }, []);

  async function signOut() {
    await api("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

  return (
    <>
      <Header user={user} onSignIn={() => setAuthOpen(true)} onSignOut={signOut}/>
      <main>
        <Hero />
        <Portfolio user={user} onRequireAuth={() => setAuthOpen(true)}/>
        <About />
        <Contact />
      </main>
      <Footer />
      {authOpen && (
        <AuthDialog
          onClose={() => setAuthOpen(false)}
          onAuthed={(u) => { setUser(u); setAuthOpen(false); }}
        />
      )}
    </>
  );
}