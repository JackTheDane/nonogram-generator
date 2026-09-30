import { type ChangeEvent } from "react";
import { usePreviewUrl } from "../hooks/usePreviewUrl";

export type FileUploadProps = {
  selectedImage: File | null;
  setSelectedImage: (image: File | null) => void;
};

export const FileUpload = ({ selectedImage, setSelectedImage }: FileUploadProps) => {
  const previewUrl = usePreviewUrl(selectedImage);

  // Handle file selection change event
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedImage(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    setSelectedImage(file);
  };

  const clearSelection = () => {
    setSelectedImage(null);
    const input = document.getElementById("file-input") as HTMLInputElement | null;
    if (input) input.value = "";
  };

  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
      <label htmlFor="file-input">Choose Image:</label>
      <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && <button type="button" onClick={clearSelection}>X</button>}
      {previewUrl && (
        <div>
          <p>Preview:</p>
          <img src={previewUrl} alt="Preview" style={{ width: "200px" }} />
        </div>
      )}
    </div>
  );
};
