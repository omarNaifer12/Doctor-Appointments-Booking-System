import { useEffect, useRef } from "react";

const VideoBox = ({ stream, userId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="overflow-hidden rounded-2xl bg-slate-800 shadow-lg border border-slate-700">
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-64 w-full bg-black object-cover"
        />
      ) : (
        <div className="flex h-64 flex-col items-center justify-center bg-slate-700 text-white">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold">
            {userId?.slice(0, 2)?.toUpperCase()}
          </div>

          <p className="text-lg font-medium">No Camera</p>
        </div>
      )}

      <div className="border-t border-slate-700 bg-slate-800 px-4 py-3 text-center text-sm font-medium text-white">
        {userId}
      </div>
    </div>
  );
};

export default VideoBox;