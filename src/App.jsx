import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";

export default function App() {
  const [text, setText] = useState("");
  const svgRef = useRef();

  const downloadQR = () => {
    const svg = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qr_code.png";
      downloadLink.click();
    };

    img.src = url;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">QR Code Generator 🧾</h1>
        <input
          type="text"
          placeholder="Enter text or URL..."
          className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {text && (
          <>
            <div className="bg-white p-4 inline-block rounded-xl" ref={svgRefWrapper => {
              if (svgRefWrapper) {
                const svg = svgRefWrapper.querySelector('svg');
                if (svg) svgRef.current = svg;
              }
            }}>
              <QRCode value={text} size={200} />
            </div>
            <button
              onClick={downloadQR}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
            >
              Download
            </button>
          </>
        )}
      </div>
    </div>
  );
}
