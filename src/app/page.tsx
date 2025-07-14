// File: src/app/page.tsx (Landing Page)
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1f2937] to-[#111827] text-white flex items-center justify-center p-4">
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-3xl font-semibold text-center">
          <span className="bg-gradient-to-r from-[#BEC1CF] via-[#D5D8EA] to-[#D5D8EA] bg-clip-text text-transparent">
            Rencontrez le
          </span>
          <br />
          <span className="font-bold bg-gradient-to-r from-[#BEC1CF] via-[#D5D8EA] to-[#D5D8EA] bg-clip-text text-transparent text-4xl">
            ESTIN CHATBOX
          </span>
        </h1>

        {/* Chat Bubble */}
        <div className="relative px-6 py-3 rounded-2xl text-sm max-w-xs shadow-lg">
  <div className="bubble">
    Bonjour! Comment puis-je vous aider?
  </div>
  <div className="absolute left-8 top-full w-4 h-4 bg-[#334155] rotate-45 -mt-2"></div> {/* match la nouvelle couleur ! */}
</div>
{/* Bulles latérales animées */}
<div className="bubble-side bubble-side-left">
  Pose-moi toutes tes questions !
</div>

<div className="bubble-side bubble-side-right">
  Disponible 24h/24 – 100% ESTIN
</div>

<div className="floating-dot" style={{ top: "30%", left: "10%" }} />
<div className="floating-dot" style={{ top: "60%", right: "8%" }} />
<div className="floating-dot" style={{ top: "90%", left: "20%" }} />
<div className="floating-dot" style={{ top: "30%", right: "30%" }} />

<div
  className="absolute w-32 h-32 bg-[#BEC1CF] rounded-full opacity-10 blur-2xl floating-soft"
  style={{ top: '30%', right: '5%' }}
/>






        <img
          src="/mascotte.png"
          alt="ESTIN Bot"
          className="w-44 drop-shadow-xl"
        />

       <a href="/chat" className="button-wrapper">
  <button className="custom-button">
    Commencer!
  </button>
</a>




      </div>
    </main>
  );
}
