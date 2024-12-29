import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const FileUploader = ({
  name,
  onFileUpload,
  progress,
  acceptedFileTypes,
  setSelectedFile,
  selectedFile,
  isEdited = false,
  imagePath = null,
  videoPath = null,
  handleRemoveFile,
}) => {
  const [fileType, setFileType] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    onFileUpload(file);
    setFileType(file.type.split('/')[0]);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFileType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    clearFile();
    handleRemoveFile(e);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor={`dropzone-file-${name}`}
        className="flex flex-col items-center justify-center w-full h-49 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-white"
      >
        <div className="flex flex-col items-center justify-center pb-6 h-48">
          {!selectedFile ? (
            <>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG, or GIF (MAX. 800x400px)
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-end w-full">
                <button
                  onClick={handleClear}
                  className="text-white bg-red-500 focus:outline-none w-8 h-8 rounded-full hover:bg-red-400"
                >
                  x
                </button>
              </div>
              <p className="text-xl">{selectedFile?.name}</p>
              {(isEdited && imagePath) || fileType === 'image' ? (
                <div className="object-contain">
                  <img
                    src={
                      isEdited && !fileType
                        ? imagePath
                        : URL.createObjectURL(selectedFile)
                    }
                    className="w-full h-24"
                  />
                </div>
              ) : null}
              {(isEdited && videoPath) || fileType === 'video' ? (
                <>
                  <video controls className="w-full h-24">
                    <source
                      src={
                        isEdited ? videoPath : URL.createObjectURL(selectedFile)
                      }
                    />
                    Your browser does not support the video tag.
                  </video>
                  {progress} %
                </>
              ) : null}
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          id={`dropzone-file-${name}`}
          type="file"
          name={name}
          className="hidden"
          onChange={handleFileChange}
          accept={acceptedFileTypes}
        />
      </label>
    </div>
  );
};

FileUploader.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
  progress: PropTypes.number,
  name: PropTypes.string.isRequired,
  acceptedFileTypes: PropTypes.string,
  setSelectedFile: PropTypes.string,
  selectedFile: PropTypes.string,
  isEdited: PropTypes.bool,
  imagePath: PropTypes.string,
  videoPath: PropTypes.string,
  handleRemoveFile: PropTypes.func,
};

export default FileUploader;
