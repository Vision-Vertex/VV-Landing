import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
      <div className="text-center space-y-6">
        {/* Logo */}
        {/* <div className="relative">
          <Image
            src="/logos/VisionvertexLogo1.svg"
            alt="Vision Vertex"
            width={120}
            height={120}
            className="animate-pulse"
          />
        </div> */}
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Loading{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Vision Vertex
            </span>
          </h2>
          <p className="text-gray-600">Preparing your experience...</p>
        </div>
        
        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}