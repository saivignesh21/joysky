import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";

export default function VideoChat() {
  const videoRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [message, setMessage] = useState("");
  const [matchStatus, setMatchStatus] = useState("🔍 Searching...");
  const [partnerConnected, setPartnerConnected] = useState(false);

  const interest =
    localStorage.getItem("joysky_interest") || "General";

  const [messages, setMessages] = useState([
    {
      text: "Welcome to JoySky 👋",
      sender: "other",
    },
  ]);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera Error:", error);
      }
    }

    startCamera();

    if (socket.connected) {
      setConnected(true);
      socket.emit("join-queue", interest);
    }

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join-queue", interest);
    });

    socket.on("disconnect", () => {
      setConnected(false);
      setPartnerConnected(false);
      setMatchStatus("🔴 Disconnected");
    });

    socket.on("online-users", (count) => {
      setOnlineUsers(count);
    });

    socket.on("matched", () => {
      setPartnerConnected(true);
      setMatchStatus("🟢 Connected");

      setMessages([
        {
          text: "You are now connected with a stranger 👋",
          sender: "other",
        },
      ]);
    });

    socket.on("receive-message", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          text: data.text,
          sender: "other",
        },
      ]);
    });

    socket.on("partner-left", () => {
      setPartnerConnected(false);
      setMatchStatus("🔍 Searching...");

      setMessages((prev) => [
        ...prev,
        {
          text: "Stranger disconnected.",
          sender: "other",
        },
      ]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("online-users");
      socket.off("matched");
      socket.off("receive-message");
      socket.off("partner-left");
    };
  }, [interest]);

  function sendMessage() {
    if (!message.trim()) return;

    socket.emit("send-message", message);

    setMessages((prev) => [
      ...prev,
      {
        text: message,
        sender: "me",
      },
    ]);

    setMessage("");
  }

  function nextUser() {
    setPartnerConnected(false);
    setMatchStatus("🔍 Searching...");

    setMessages([
      {
        text: "Searching for another stranger...",
        sender: "other",
      },
    ]);

    socket.emit("next-user");
    socket.emit("join-queue", interest);
  }

  return (
    <div className="h-screen bg-[#070707] text-white flex flex-col overflow-hidden">

      {/* HEADER */}
      <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>

          <h1 className="font-bold text-2xl">
            JoySky
          </h1>
        </div>

        <div className="flex gap-8">

          <div className="text-green-400">
            🟢 {onlineUsers} Online
          </div>

          <div className="text-blue-400">
            {connected ? "🟢 Connected" : "🔴 Offline"}
          </div>

        </div>

      </header>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">

        {/* VIDEO SECTION */}
        <div className="w-[70%] p-4">

          <div className="h-full rounded-3xl border border-zinc-800 bg-zinc-900 relative overflow-hidden">

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <div className="text-7xl mb-6">
                👤
              </div>

              <h2 className="text-5xl font-bold text-zinc-500">
                Stranger Video
              </h2>

              <p className="mt-4 text-xl text-purple-400">
                {matchStatus}
              </p>

              <div className="mt-4 px-5 py-2 rounded-full bg-purple-600/20 border border-purple-500/20 text-purple-300">
                Interest: {interest}
              </div>

              <div className="mt-4 text-zinc-400">
                {partnerConnected
                  ? "🟢 Stranger Connected"
                  : "⏳ Waiting For Stranger"}
              </div>

            </div>

            {/* YOUR CAMERA */}
            <div className="absolute bottom-5 right-5 w-80 h-52 rounded-2xl overflow-hidden border border-zinc-700 bg-black">

              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>

        {/* CHAT SECTION */}
        <div className="w-[30%] border-l border-zinc-800 flex flex-col">

          <div className="p-5 border-b border-zinc-800">

            <h2 className="font-bold text-2xl">
              Conversation
            </h2>

            <p className="text-zinc-500">
              Real-Time Chat
            </p>

          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "me"
                    ? "bg-blue-600 p-3 rounded-2xl ml-auto max-w-[80%]"
                    : "bg-zinc-800 p-3 rounded-2xl max-w-[80%]"
                }
              >
                {msg.text}
              </div>
            ))}

          </div>

          {/* BUTTONS */}
          <div className="px-4">

            <div className="grid grid-cols-2 gap-2 mb-4">

              <button
                onClick={nextUser}
                className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-medium"
              >
                Next
              </button>

              <button className="bg-red-600 hover:bg-red-700 py-3 rounded-xl font-medium">
                Report
              </button>

              <button className="bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl font-medium">
                Mute
              </button>

              <button className="bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl font-medium">
                Translate
              </button>

            </div>

          </div>

          {/* INPUT */}
          <div className="p-4 border-t border-zinc-800">

            <div className="flex gap-2">

              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none"
              />

              <button
                onClick={sendMessage}
                className="px-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600"
              >
                Send
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}