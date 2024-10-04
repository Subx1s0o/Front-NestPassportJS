"use client";
import { instance } from "@/instance";
import Image from "next/image";
import { useEffect, useState } from "react";

interface user {
  name: string;
  email: string;
  avatar: string;
  surname: string;
}

export default function Home() {
  const [data, setData] = useState<user | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/user/me");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <h2>{data.surname}</h2>
      <p>{data.email}</p>

      {data.avatar && (
        <Image src={data.avatar} alt={data.name} width={100} height={100} />
      )}
    </div>
  );
}
