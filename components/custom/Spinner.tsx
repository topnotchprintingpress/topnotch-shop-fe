import React from "react";
import Image from "next/image";

const Spinner = () => {
  return (
    <div
      className="flex justify-center items-center h-full w-full min-h-screen"
      style={{ backgroundColor: "#fffcf7" }}
    >
      <div className="relative flex flex-col items-center justify-center space-y-4">
        {/* Spinner Container */}
        <div className="relative w-48 h-48">
          {/* Outer Ring */}
          <div
            className="absolute inset-0 border-8 border-opacity-20 rounded-full animate-pulse"
            style={{ borderColor: "#350203" }}
          />

          {/* Main Spinner */}
          <div
            className="absolute inset-0 border-8 border-t-8 rounded-full animate-spin"
            style={{
              borderColor: "#350203 #350203 #350203 transparent",
              boxShadow: "0 0 20px rgba(53,2,3,0.2)",
            }}
          />

          {/* Inner Decorative Elements */}
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <Image
              src="/logo/Logo1.png"
              width={130}
              height={45}
              alt="Topnotch Logo"
              className="w-auto"
            />
          </div>
        </div>

        {/* Loading Text with Creative Typography */}
        <div
          className="text-2xl font-bold tracking-widest uppercase"
          style={{ color: "#350203" }}
        >
          <span className="animate-pulse">Loading</span>
          <span
            className="inline-block ml-2 text-3xl"
            style={{ color: "#ff8080" }}
          >
            ...
          </span>
        </div>

        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 -z-10 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#350203 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
      </div>
    </div>
  );
};

export default Spinner;
