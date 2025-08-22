import { type ReactNode } from 'react';
import LoginImage from '../../../src/assets/login-pg-img/login-video.mp4'; // adjust the path as needed

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className="relative flex items-center justify-end min-h-screen p-4 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={LoginImage} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-md shadow-2xl rounded-3xl p-10 border border-white/30 bg-white/25 backdrop-blur-md transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-white text-center tracking-wide mb-6">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
