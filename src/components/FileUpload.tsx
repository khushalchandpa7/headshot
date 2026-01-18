import { useState, useCallback, useEffect } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  disabled?: boolean;
}

const FileUpload = ({
  onFileSelect,
  selectedFile,
  onClear,
  disabled,
}: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragOver(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file);
      }
    },
    [disabled, onFileSelect],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file);
      }
    },
    [onFileSelect],
  );

  return (
    <div className="w-full">
      {!selectedFile ? (
        <label
          className={cn(
            "relative flex flex-col items-center justify-center w-full min-h-[320px] border-2 border-dashed cursor-pointer transition-all duration-200",
            isDragOver
              ? "border-foreground bg-accent"
              : "border-muted-foreground/30 hover:border-foreground hover:bg-accent/50",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            disabled={disabled}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-4 p-8">
            <div className="p-4 border-2 border-foreground bg-background">
              <Upload className="w-8 h-8" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-medium text-lg">Drop your photo here</p>
              <p className="text-sm text-muted-foreground">
                or click to browse
              </p>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              PNG, JPG, WEBP up to 10MB
            </p>
          </div>
        </label>
      ) : (
        <div className="relative w-full min-h-[320px] border-2 border-foreground bg-secondary">
          <button
            onClick={onClear}
            disabled={disabled}
            className={cn(
              "absolute top-3 right-3 z-10 p-2 bg-background border-2 border-foreground shadow-xs hover:shadow-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all",
              disabled && "opacity-50 cursor-not-allowed",
            )}
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={previewUrl!}
              alt="Preview"
              className="max-w-full max-h-[280px] object-contain border-2 border-foreground"
            />
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-background border-2 border-foreground">
            <ImageIcon className="w-3 h-3" />
            <span className="text-xs font-mono truncate max-w-[150px]">
              {selectedFile.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
