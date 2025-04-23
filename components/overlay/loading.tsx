/* eslint-disable @next/next/no-img-element */
import React from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
}

const loadingStates = [
  "https://media.tenor.com/Kwq2I-vIuOQAAAAi/downsign-loading.gif",
  "https://media.tenor.com/JwPW0tw69vAAAAAi/cargando-loading.gif",
  "https://media.tenor.com/6gHLhmwO87sAAAAi/gg.gif",
];

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  const randomIndex = Math.floor(Math.random() * loadingStates.length);
  const randomLoadingState = loadingStates[randomIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-neutral-100/50 backdrop-blur-sm" />
      <div className="relative z-10 flex flex-col items-center text-neutral-900">
        <img src={randomLoadingState} alt="" className="h-16" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
