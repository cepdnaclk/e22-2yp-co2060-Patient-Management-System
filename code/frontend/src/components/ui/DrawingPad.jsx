import React, { useRef, useState, useImperativeHandle, useEffect } from "react";
import { Eraser } from "lucide-react";

const DrawingPad = React.forwardRef(({ className = "" }, ref) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // Use the actual internal resolution for clearRect
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fill with white background using the current transform
    ctx.fillStyle = "#ffffff";
    const rect = canvas.getBoundingClientRect();
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  useImperativeHandle(ref, () => ({
    getCanvasBlob: () => {
      return new Promise((resolve) => {
        if (!canvasRef.current) {
          resolve(null);
          return;
        }
        canvasRef.current.toBlob((blob) => {
          resolve(blob);
        }, "image/png");
      });
    },
    clearCanvas
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set actual size in memory (scaled to account for high DPI devices)
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    
    // Fill background with white
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1e293b"; // slate-800
    ctx.lineWidth = 2.5;
    
    // Handle resize to preserve context scaling (simplified for this scope)
    const handleResize = () => {
      // In a full implementation, you'd want to save the canvas data, resize, and restore it
      // Here we just prevent it from completely breaking
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Handle both mouse and touch events
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    // Prevent scrolling when touching the canvas
    if (e.type === "touchstart") {
      document.body.style.overflow = "hidden";
    }
    const { x, y } = getCoordinates(e.nativeEvent || e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault(); // Prevent scrolling on touch devices
    const { x, y } = getCoordinates(e.nativeEvent || e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    if (e && e.type === "touchend") {
      document.body.style.overflow = "auto";
    }
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.closePath();
    setIsDrawing(false);
  };

  return (
    <div className={`relative border border-slate-200 rounded-xl overflow-hidden bg-white ${className}`}>
      <div className="absolute top-2 right-6 z-10">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            clearCanvas();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/80 backdrop-blur-sm hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors shadow-sm border border-slate-200"
        >
          <Eraser className="w-3.5 h-3.5" />
          Clear Pad
        </button>
      </div>
      
      {/* Scrollable Container */}
      <div className="w-full h-full overflow-y-auto overflow-x-hidden relative scroll-smooth custom-scrollbar">
        <div className="min-h-[800px] w-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            onTouchCancel={stopDrawing}
            style={{ height: "800px", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
});

DrawingPad.displayName = "DrawingPad";
export default DrawingPad;
