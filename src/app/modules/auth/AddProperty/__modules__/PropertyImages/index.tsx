import React, { useState } from 'react';
import ImageVector from 'app/modules/__modules__/_vectors/imageVector';
import placeholderImg from 'app/static/images/placeholder.jpg';
import Title from '../Title';

const AddPropertyImages = () => {
  const [startCoverProcess, setStartCoverProcess] = useState(false);
  const [imageCoverProcess, setImageCoverProcess] =
    useState<Blob | null>(null);
  const [previewCover, setPreviewCover] = useState<string | null>(
    null,
  );

  const [startImagesProcess, setStartImagesProcess] = useState(false);
  const [imagesProcess, setImagesProcess] = useState<Blob | null>(
    null,
  );
  const [previewImages, setPreviewImages] = useState<string | null>(
    null,
  );
  const [othersImages, setOthersImages] = useState<any>();

  const uploadCoverImage = ({ target }) => {
    console.log('Yeah');
    

    const image = target.files[0];
    setPreviewCover(URL.createObjectURL(image));
    setStartCoverProcess(true);
    setImageCoverProcess(image);
  };

  const uploadImages = ({ target }) => {
    console.log('Files ===>', target.files);
    const image = target.files[0];
    setPreviewImages(URL.createObjectURL(image));
    setStartImagesProcess(true);
    setImagesProcess(image);

    // const image = target.files[0];
    // setOthersImages(image);
    // setStartImagesProcess(true);
  };

  const cancelCoverProcess = async () => {
    setStartCoverProcess(false);
    setPreviewCover(null);
  };

  const cancelImagesProcess = async () => {
    setStartImagesProcess(false);
    setPreviewImages(null);
  };

  const uploadingProcess = async () => {
    setStartCoverProcess(false);
    console.log('Here we gooooooo !!!!!');
  };

  console.log('OthersImages', othersImages);
return (
    <div className="pt-20 sm:pt-7 mx-2 sm:mx-0">
      <Title name="Les images de l' immobilier" />
      <div className="w-full flex items-center justify-center p-0 px-2 py-5 sm:px-16 sm:py-16 mt-8 pb-8 bg-white border border-gray-100 rounded-xl">
        <div className="w-full sm:w-full md:w-full xl:w-4/5">
          <div className="w-full flex flex-wrap content-center items-center justify-between">
            <div className="relative w-full sm:w-[57%] md:w-[66%]">
              <img
                src={
                  (previewCover as string) ||
                  (placeholderImg as string)
                }
                className="w-full h-[18rem] mb-3 object-cover rounded-xl"
                alt="Cover"
              />
              {startCoverProcess ? (
                <div className="w-full h-16 bg-gradient-to-b from-black/10 to-black/50 absolute bottom-[4%] rounded-b-xl flex justify-center items-center">
                  <div className=" w-2/4 flex justify-between items-center">
                    <button
                      className="p-1 text-sm text-red-500"
                      type="button"
                      onClick={cancelCoverProcess}
                    >
                      Annuler
                    </button>
                    <button
                      className="p-1 text-sm text-blue-500"
                      type="button"
                      onClick={uploadingProcess}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              ) : (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label>
                  <div className="flex items-center justify-center bg-black/60 absolute bottom-[8%] right-[5%] cursor-pointer hover:bg-white text-white hover:text-black hover:border-black text-xs rounded-lg p-2 px-5">
                    <ImageVector className="w-5 h-5" />
                    <span className="pl-2">
                      Image de couverture
                    </span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    disabled={startCoverProcess}
                    onChange={uploadCoverImage}
                  />
                </label>
              )}
            </div>
            <div className="relative w-full sm:w-[40%] md:w-[31%] hidden sm:block">
              <img
                src={
                  (previewImages as string) ||
                  (placeholderImg as string)
                }
                className="w-full  h-[18rem] mb-3 object-cover rounded-xl"
                alt="Cover"
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <div className="flex items-center justify-center bg-black/60 absolute bottom-[8%] right-[5%] cursor-pointer hover:bg-white text-white hover:text-black hover:border-black text-xs rounded-lg p-2 px-5 md:px-2">
                  <ImageVector className="w-5 h-5" />
                  <span className="pl-2">
                    Autres images
                  </span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  disabled={startImagesProcess}
                  onChange={uploadImages}
                  multiple
                />
              </label>
            </div>
          </div>
          <div className="w-full mt-5 mb-8 sm:mb-12 flex items-center justify-between overflow-x-scroll no-scrollbars overflow-hidden whitespace-nowrap">
            <img
              src={
                (previewImages as string) ||
                (placeholderImg as string)
              }
              className="w-[33%] sm:w-[32%] h-[8rem] sm:h-[10rem] mr-4 object-cover rounded-xl flex-none"
              alt="Cover"
            />
            {/* <img
              src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/150253158.jpg?k=d"
              className="w-[33%] sm:w-[32%] h-[8rem] sm:h-[10rem] mr-4 object-cover rounded-xl"
              alt="Cover"
            />
            <img
              src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/150253158.jpg?k=dd3618acde216533634ad3774c1e172e93f3903a35c2edde768051e936a65624&o="
              className="w-[33%] sm:w-[32%] h-[8rem] sm:h-[10rem] mr-4 object-cover rounded-xl"
              alt="Cover"
            />
            <img
              src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/150253158.jpg?k=dd3618acde216533634ad3774c1e172e93f3903a35c2edde768051e936a65624&o="
              className="w-[33%] sm:w-[32%] h-[8rem] sm:h-[10rem] mr-4 object-cover rounded-xl"
              alt="Cover"
            />
            <img
              src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/150253158.jpg?k=dd3618acde216533634ad3774c1e172e93f3903a35c2edde768051e936a65624&o="
              className="w-[33%] sm:w-[30%] h-[8rem] sm:h-[10rem] mr-4 object-cover rounded-xl"
              alt="Cover"
            />
            <img
              src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/150253158.jpg?k=dd3618acde216533634ad3774c1e172e93f3903a35c2edde768051e936a65624&o="
              className="w-[33%] sm:w-[30%] h-[8rem] sm:h-[10rem] mr-4 object-cover rounded-xl"
              alt="Cover"
            /> */}
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-brand-bold text-white text-sm rounded-md"
            >
              Ajouter l&apos;immobilier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyImages;