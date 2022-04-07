import { useEffect, useState } from "react";
import FiltersNav from "./FiltersNav";
import ImageSection from "./ImageSection";
import BasicsNav from "./BasicsNav";
import { createContext } from "react";

export const AppContext = createContext(null);
const PhotoEditor = () => {
  const defaultImageBasics = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    blur: 0,
    opacity: 100,
  };

  const [editImage, setEditImage] = useState(
    localStorage.getItem("image") ? localStorage.getItem("image") : ""
  );
  const [imageBasics, setImageBasics] = useState(defaultImageBasics);
  const [isCheckedHorizontal, setIsCheckedHorizontal] = useState(false);
  const [isCheckedVertical, setIsCheckedVertical] = useState(false);
  const [finalImageURL, setFinalImageURL] = useState("");
  const [finishedEditing, setFinishedEditing] = useState(false);
  const [format, setFormat] = useState("png");
  const [filtersImage, setFiltersImage] = useState({
    grayscale: false,
    sepia: false,
    inverted: false,
    noneFilter: true,
    vivid: false,
  });

  useEffect(() => {
    setFinishedEditing(false);
  }, [
    imageBasics,
    isCheckedHorizontal,
    isCheckedVertical,
    filtersImage,
    format,
  ]);

  const imageStyle = {
    color: "transparent",
    filter:
      "contrast(" +
      imageBasics.contrast +
      "%)" +
      " brightness(" +
      imageBasics.brightness +
      "%)" +
      " saturate(" +
      imageBasics.saturation +
      "%)" +
      " hue-rotate(" +
      imageBasics.hue +
      "deg)" +
      " opacity(" +
      imageBasics.opacity +
      "%)" +
      " blur(" +
      imageBasics.blur +
      "px)" +
      (filtersImage.grayscale ? " grayscale(100%)" : "") +
      (filtersImage.sepia ? " sepia(100%)" : "") +
      (filtersImage.inverted ? " invert(100%)" : "") +
      (filtersImage.noneFilter ? "" : ""),
    transform:
      "" +
      (isCheckedHorizontal ? "scaleX(-1)" : "") +
      (isCheckedVertical ? "scaleY(-1)" : ""),
  };

  useEffect(() => {
    setFinishedEditing(false);
  }, []);

  return (
    <div className="flex h-[93%]">
      <AppContext.Provider
        value={{
          editImage,
          setEditImage,
          imageBasics,
          filtersImage,
          setFiltersImage,
          defaultImageBasics,
          setImageBasics,
          imageStyle,
        }}
      >
        <FiltersNav />
        <ImageSection />
        <BasicsNav
          isCheckedHorizontal={isCheckedHorizontal}
          setIsCheckedHorizontal={setIsCheckedHorizontal}
          setIsCheckedVertical={setIsCheckedVertical}
          isCheckedVertical={isCheckedVertical}
          format={format}
          setFormat={setFormat}
          finalImageURL={finalImageURL}
          finishedEditing={finishedEditing}
          setFinalImageURL={setFinalImageURL}
          setFinishedEditing={setFinishedEditing}
        />
      </AppContext.Provider>
    </div>
  );
};

export default PhotoEditor;
