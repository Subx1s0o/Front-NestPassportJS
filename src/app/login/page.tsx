"use client";
export default function Home() {
  const GoogleAuth = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
  };

  const LinkedinAuth = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/linkedin`;
  };
  return (
    <div className="flex gap-5">
      <button
        onClick={GoogleAuth}
        className="bg-black text-white py-5 px-10 rounded-2xl"
      >
        Sign with Google
      </button>
      <button
        onClick={LinkedinAuth}
        className="bg-blue-600 text-white py-5 px-10 rounded-2xl"
      >
        Sign with Linkedin
      </button>
    </div>
  );
}
