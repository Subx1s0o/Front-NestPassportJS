"use client";

export default function Home() {
  const GoogleAuth = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
  };

  const LinkedinAuth = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/linkedin`;
  };
  return (
    <section className="grid grid-cols-2 h-full">
      <button className="bg-black text-white" onClick={GoogleAuth}>
        Google
      </button>
      <button className="bg-blue-600 text-white" onClick={LinkedinAuth}>
        Linkedin
      </button>
    </section>
  );
}
