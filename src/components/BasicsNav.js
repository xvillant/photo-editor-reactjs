import { useRef, useContext } from "react";
import { createCanvas } from "canvas";
import { AppContext } from "./PhotoEditor";

const BasicsNav = ({
  isCheckedHorizontal,
  isCheckedVertical,
  format,
  finishedEditing,
  finalImageURL,
  setFinishedEditing,
  setIsCheckedHorizontal,
  setIsCheckedVertical,
  setFormat,
  setFinalImageURL,
}) => {
  const formatSelect = useRef(null);
  const {
    editImage,
    setEditImage,
    imageBasics,
    setFiltersImage,
    defaultImageBasics,
    setImageBasics,
    imageStyle,
  } = useContext(AppContext);
  const changedFormat = () => {
    setFormat(formatSelect.current.value);
  };
  const handleCheckHorizontal = () => {
    setIsCheckedHorizontal(!isCheckedHorizontal);
  };
  const handleCheckVertical = () => {
    setIsCheckedVertical(!isCheckedVertical);
  };

  function createCanvasImage() {
    var img = new Image();
    img.src = editImage;
    let canvas = createCanvas(img.width, img.height);
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.filter = imageStyle.filter;
    if (isCheckedHorizontal) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    if (isCheckedVertical) {
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
    }

    ctx.save();
    ctx.drawImage(img, 0, 0);

    format === "jpg"
      ? setFinalImageURL(canvas.toDataURL("image/jpeg"))
      : setFinalImageURL(canvas.toDataURL("image/png"));
  }
  return (
    <nav className="flex flex-col w-72 h-full bg-[#363430] text-white px-4 overflow-y-scroll scrollbar-hide">
      <button
        className="bg-gradient-to-r from-[#e6251f] to-[#eb5e28] transition-colors rounded-[8px] px-[15px] py-[4px] text-white mb-2 outline-0 border-transparent hover:border-white border"
        onClick={() => {
          setEditImage("");
          localStorage.removeItem("image");
        }}
      >
        Remove Image
      </button>

      <button
        className="bg-gradient-to-r from-[#e6251f] to-[#eb5e28] transition-colors rounded-[8px] px-[15px] py-[4px] text-white mb-2 outline-0 border-transparent hover:border-white border"
        onClick={() => {
          setImageBasics(defaultImageBasics);
          setIsCheckedHorizontal(false);
          setIsCheckedVertical(false);
          setFiltersImage({
            grayscale: false,
            sepia: false,
            inverted: false,
            noneFilter: true,
            vivid: false,
          });
        }}
      >
        Reset Settings
      </button>
      <div className="flex flex-col gap-2">
        <h2 className="self-start text-2xl">Basic</h2>
        <div className="flex flex-col border-2 rounded-md p-4 border-stone-500">
          <label htmlFor="brightness_filter">brightness</label>
          <input
            id="brightness_filter"
            onChange={(event) => {
              setImageBasics({
                ...imageBasics,
                brightness: event.target.value,
              });
            }}
            min={0}
            max={200}
            value={imageBasics.brightness}
            type="range"
          />
          <p className="flex gap-2 justify-center">{imageBasics.brightness}</p>
          <label htmlFor="contrast_filter">contrast</label>
          <input
            id="contrast_filter"
            onChange={(event) => {
              setImageBasics({
                ...imageBasics,
                contrast: event.target.value,
              });
            }}
            min={0}
            max={200}
            value={imageBasics.contrast}
            type="range"
          />
          <p className="flex gap-2 justify-center">{imageBasics.contrast}</p>
          <label htmlFor="saturation_filter">saturation</label>
          <input
            id="saturation_filter"
            onChange={(event) => {
              setImageBasics({
                ...imageBasics,
                saturation: event.target.value,
              });
            }}
            min={0}
            max={200}
            value={imageBasics.saturation}
            type="range"
          />
          <p className="flex gap-2 justify-center">{imageBasics.saturation}</p>

          <label htmlFor="hue_filter">hue</label>
          <input
            id="hue_filter"
            onChange={(event) => {
              setImageBasics({
                ...imageBasics,
                hue: event.target.value,
              });
            }}
            min={0}
            max={360}
            value={imageBasics.hue}
            type="range"
          />
          <p className="flex gap-2 justify-center">{imageBasics.hue}</p>

          <label htmlFor="blur_filter">blur</label>
          <input
            id="blur_filter"
            onChange={(event) => {
              setImageBasics({
                ...imageBasics,
                blur: event.target.value,
              });
            }}
            min={0}
            max={100}
            value={imageBasics.blur}
            type="range"
          />
          <p className="flex gap-2 justify-center">{imageBasics.blur}</p>

          <label htmlFor="opacity_filter">opacity</label>
          <input
            id="opacity_filter"
            onChange={(event) => {
              setImageBasics({
                ...imageBasics,
                opacity: event.target.value,
              });
            }}
            min={0}
            max={100}
            value={imageBasics.opacity}
            type="range"
          />
          <p className="flex gap-2 justify-center">{imageBasics.opacity}</p>
        </div>
        <h2 className="text-2xl">Transform</h2>
        <div className="flex flex-col gap-5 border-2 rounded-md p-4 border-stone-500">
          <div className="flex gap-2 items-center">
            <label htmlFor="vertical_flip">Vertical Flip</label>
            <input
              id="vertical_flip"
              type="checkbox"
              checked={isCheckedVertical}
              onChange={handleCheckVertical}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="horizontal_flip">Horizontal Flip</label>
            <input
              id="horizontal_flip"
              type="checkbox"
              checked={isCheckedHorizontal}
              onChange={handleCheckHorizontal}
            />
          </div>
        </div>
        <label htmlFor="format">Format</label>
        <select
          className="form-select appearance-none block w-full px-3 py-1.5 text-base text-black bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-white focus:border-black focus:outline-none"
          ref={formatSelect}
          onChange={changedFormat}
          value={format}
          name="format"
        >
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
        </select>
        {finishedEditing ? (
          <button className="bg-gradient-to-r from-[#e6251f] to-[#eb5e28] transition-colors rounded-[8px] px-[15px] py-[4px] text-white mb-2 outline-0 border-transparent hover:border-white border">
            <a href={finalImageURL} download="edited_image">
              Save Image
            </a>
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-[#e6251f] to-[#eb5e28] transition-colors rounded-[8px] px-[15px] py-[4px] text-white mb-2 outline-0 border-transparent hover:border-white border"
            onClick={() => {
              setFinishedEditing(true);
              createCanvasImage();
            }}
          >
            Finish Editing
          </button>
        )}
      </div>
    </nav>
  );
};

export default BasicsNav;
