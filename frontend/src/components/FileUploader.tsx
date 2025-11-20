interface FileUploaderProps {
  onUpload: (file: File) => void;
}

export const FileUploader = ({ onUpload }: FileUploaderProps) => (
  <label className="uploader">
    <input
      type="file"
      onChange={(event) => {
        const file = event.target.files?.[0];
        if (file) onUpload(file);
      }}
    />
    <span>Drop resume or click to upload</span>
  </label>
);
