import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useContext } from "react";
import { AppContext } from "./PhotoEditor";

const ImageSection = () => {
  const {
    editImage,
    setEditImage,
    imageStyle,
    setImageBasics,
    defaultImageBasics,
  } = useContext(AppContext);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ maxFiles: 1 });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      fileUpload(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  const fileUpload = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setEditImage(reader.result);
      setImageBasics(defaultImageBasics);
      localStorage.setItem("image", reader.result);
    };
  };
  return (
    <main className="flex flex-col w-full h-full bg-[#4d4b48] justify-center items-center">
      {editImage && (
        <img
          alt="preview"
          src={editImage}
          style={imageStyle}
          className="relative max-w-[90%] max-h-[90%]"
        />
      )}
      {editImage === "" ? (
        <div
          className={`border-4 w-[50%] text-white py-24 px-48 ${
            isDragActive ? "border-solid" : "border-dashed"
          } rounded-xl cursor-pointer flex flex-col items-center justify-center text-center border-gray-400`}
          {...getRootProps()}
        >
          <FontAwesomeIcon className="mb-2" icon={faUpload} size="3x" />
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center">Drop the file here...</p>
          ) : (
            <p className="text-center text-font">
              Drag 'n' drop file here,
              <br />
              or click to select files
            </p>
          )}
        </div>
      ) : (
        <></>
      )}
    </main>
  );
};

export default ImageSection;
