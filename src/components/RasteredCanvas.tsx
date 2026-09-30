import { useEffect, useRef } from "react";
import { usePreviewUrl } from "../hooks/usePreviewUrl";

export type RasteredCanvasProps = {
  selectedImage: File | null;
  nonogramHeight: number;
  nonogramWidth: number;
};

const getResizedImageAsCanvas = (imageUrl: string, targetSizeX: number, targetSizeY: number) => new Promise<HTMLCanvasElement>((resolve) => {
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = targetSizeX;
  offscreenCanvas.height = targetSizeY;
  const offscreenCtx = offscreenCanvas.getContext('2d')!;

  const tempImage = new Image();

  function drawImageToCanvas() {
    offscreenCtx.drawImage(tempImage, 0, 0, targetSizeX, targetSizeY);
    resolve(offscreenCanvas);
  }

  tempImage.onload = drawImageToCanvas;
  tempImage.src = imageUrl;
});

export const RasteredCanvas = ({
  selectedImage,
  nonogramHeight,
  nonogramWidth
}: RasteredCanvasProps) => {
  const previewUrl = usePreviewUrl(selectedImage);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseSize = 300;
  const aspectRatio = nonogramHeight / nonogramWidth;

  useEffect(() => {
    const execute = async () => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = false; // Needed to avoid blurring pixel borders

      if (!previewUrl) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const smallerCanvas = await getResizedImageAsCanvas(previewUrl, nonogramWidth, nonogramHeight);



      ctx.drawImage(smallerCanvas, 0, 0, canvas.width, canvas.height);
    }

    // TODO: Clean up race conditions
    void execute();
  }, [previewUrl, nonogramHeight, nonogramWidth])

  return (
    <canvas ref={canvasRef} width={baseSize} height={baseSize * aspectRatio} style={{ border: '1px solid gray' }} />
  );
};
