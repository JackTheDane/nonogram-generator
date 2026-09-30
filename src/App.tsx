import { useState } from "react";
import { FileUpload } from "./components/FileUpload";
import { RasteredCanvas } from "./components/RasteredCanvas";

export const App = () => {
  const [nonogramWidth, setNonogramWidth] = useState<number>(20);
  const [nonogramHeight, setnonogramHeight] = useState<number>(20);
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div>
          <label htmlFor="nonogramHeight">Height</label>
          <input
            type="number"
            name="nonogramHeight"
            id="nonogramHeight"
            value={nonogramHeight}
            onChange={(event) => {
              setnonogramHeight(Number(event.target.value));
            }}
          />
        </div>

        <div>
          <label htmlFor="nonogramWidth">Width</label>
          <input
            type="number"
            name="nonogramWidth"
            id="nonogramWidth"
            value={nonogramWidth}
            onChange={(event) => {
              setNonogramWidth(Number(event.target.value));
            }}
          />
        </div>

        <FileUpload selectedImage={file} setSelectedImage={setFile} />
      </form>

      <RasteredCanvas nonogramHeight={nonogramHeight} nonogramWidth={nonogramWidth} selectedImage={file} />
    </div>
  );
};
