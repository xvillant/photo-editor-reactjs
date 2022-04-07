import { useContext } from "react";
import { AppContext } from "./PhotoEditor";

const FiltersNav = () => {
  const { editImage, filtersImage, setFiltersImage, imageBasics } =
    useContext(AppContext);
  return (
    <nav className="flex w-72 h-full bg-[#363430] justify-center text-white">
      {editImage && (
        <div className="flex flex-col w-[90%] gap-5 overflow-y-scroll scrollbar-hide border-2 rounded-md p-4 border-stone-500 mb-2">
          <h2 className="text-2xl">Filters</h2>
          <div>
            <p>None</p>
            <img
              alt="nonefilter"
              onClick={() => {
                setFiltersImage({
                  noneFilter: true,
                  sepia: false,
                  grayscale: false,
                  inverted: false,
                  vivid: false,
                });
                imageBasics.saturation = 100;
                imageBasics.contrast = 100;
              }}
              style={{ color: "transparent" }}
              className="cursor-pointer"
              src={editImage}
            />
          </div>
          <div>
            <p>Grayscale</p>
            <img
              alt="grayscale"
              onClick={() => {
                setFiltersImage({
                  noneFilter: false,
                  sepia: false,
                  grayscale: !filtersImage.grayscale,
                  inverted: false,
                  vivid: false,
                });
                imageBasics.saturation = 100;
                imageBasics.contrast = 100;
              }}
              className="cursor-pointer"
              style={{ filter: "grayscale(100%)", color: "transparent" }}
              src={editImage}
            />
          </div>
          <div>
            <p>Sepia</p>
            <img
              className="cursor-pointer"
              style={{ filter: "sepia(100%)", color: "transparent" }}
              onClick={() => {
                setFiltersImage({
                  noneFilter: false,
                  sepia: !filtersImage.sepia,
                  grayscale: false,
                  inverted: false,
                  vivid: false,
                });
                imageBasics.saturation = 100;
                imageBasics.contrast = 100;
              }}
              alt="sepia"
              src={editImage}
            />
          </div>
          <div>
            <p>Vivid</p>
            <img
              className="cursor-pointer"
              alt="vivid"
              style={{
                filter: "saturate(150%) contrast(110%)",
                color: "transparent",
              }}
              src={editImage}
              onClick={() => {
                setFiltersImage({
                  noneFilter: false,
                  sepia: false,
                  grayscale: false,
                  inverted: false,
                  vivid: !filtersImage.vivid,
                });
                imageBasics.saturation = 150;
                imageBasics.contrast = 110;
              }}
            />
          </div>
          <div>
            <p>Inverted</p>
            <img
              className="cursor-pointer"
              alt="inverted"
              style={{ filter: "invert(100%)", color: "transparent" }}
              src={editImage}
              onClick={() => {
                setFiltersImage({
                  noneFilter: false,
                  sepia: false,
                  grayscale: false,
                  inverted: !filtersImage.inverted,
                  vivid: false,
                });
                imageBasics.saturation = 100;
                imageBasics.contrast = 100;
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default FiltersNav;
