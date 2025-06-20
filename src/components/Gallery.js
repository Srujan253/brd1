import React, { useState } from "react";
import Ethnic from "../photo/Ethnic.jpg";
import Cossplay from "../photo/Cossplay.jpg";
import Drama from "../photo/Drama.jpg";
import Best_frds from "../photo/Best_frd.jpg";
import farewell from "../photo/Farewell.jpg";

const photos = [
  { src: Ethnic, desc: "Celebrating Ethnic day in SDM Ujire back in a golden days." },
  { src: Cossplay, desc: "Winning a cossplay award was best moment in collage" },
  { src: Drama, desc: "Acting as a child in front of 1000 people makes me feel like a star." },
  { src: Best_frds, desc: "the one frd who stay for a long time and never leave me alone." },
  { src: farewell, desc: "Ending an era with a farewell party, but the memories will last forever." },
];

function Gallery() {
  const [centerIdx, setCenterIdx] = useState(2);
  const [previewIdx, setPreviewIdx] = useState(null);
  let longPressTimer = null;

  const getPosition = (idx) => {
    const angle = ((idx - centerIdx) * 72) * (Math.PI / 180);
    const radius = 120;
    return {
      transform: `translate(${Math.sin(angle) * radius}px, ${-Math.cos(angle) * radius}px) scale(${idx === centerIdx ? 1.5 : 0.8})`,
      zIndex: idx === centerIdx ? 2 : 1,
      cursor: idx === centerIdx ? "default" : "pointer",
      transition: "transform 0.4s",
      position: "absolute",
      left: "50%",
      top: "50%",
      marginLeft: "-60px",
      marginTop: "-60px",
      boxShadow: idx === centerIdx ? "0 4px 20px rgba(255,224,102,0.3)" : "none",
      border: idx === centerIdx ? "4px solid #ffe066" : "2px solid #fff",
      background: "#22223b",
      borderRadius: "50%",
      width: "120px",
      height: "120px",
      objectFit: "cover",
    };
  };

  // Handle long press for mobile
  const handleTouchStart = (idx) => {
    longPressTimer = setTimeout(() => setPreviewIdx(idx), 400); // 400ms for long press
  };
  const handleTouchEnd = () => {
    clearTimeout(longPressTimer);
  };
  const handleClosePreview = () => setPreviewIdx(null);

  return (
    <section className="flex flex-col items-center py-8 bg-[#22223b]" id="gallery">
      <h2 className="text-2xl font-bold mb-12 text-white">Gallery</h2>
      <div className="relative w-[320px] h-[320px] mx-auto mb-6">
        {photos.map((photo, idx) => (
          <img
            key={idx}
            src={photo.src}
            alt={`Gallery ${idx + 1}`}
            style={getPosition(idx)}
            onClick={() => {
              if (idx === centerIdx) setPreviewIdx(idx); // Only enlarge if it's the top image
              else setCenterIdx(idx); // Otherwise, move it to the top
            }}
            draggable={false}
            onTouchStart={() => handleTouchStart(idx)}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          />
        ))}
      </div>
      <div className="text-center max-w-md bg-[#22223b] rounded shadow p-4 border-2 border-yellow-200">
        <p className="font-semibold mb-2 text-white">Photo {centerIdx + 1}</p>
        <p className="text-white">{photos[centerIdx].desc}</p>
      </div>
      {/* Modal for enlarged preview */}
      {previewIdx !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={handleClosePreview}
        >
          <img
            src={photos[previewIdx].src}
            alt="Preview"
            className="w-[90vw] max-w-md h-auto rounded-xl object-contain border-4 border-yellow-200 shadow-2xl bg-[#22223b]"
          />
        </div>
      )}
    </section>
  );
}

export default Gallery;