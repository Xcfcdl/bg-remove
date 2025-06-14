import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from "react-dropzone";
import { Images } from "./components/Images";
import Footer from "./components/Footer";
import LanguageSelector from "./components/LanguageSelector";
import { useLanguage } from "./i18n/LanguageContext";
import { processImages, initializeModel, getModelInfo } from "../lib/process";

interface AppError {
  message: string;
}

export interface ImageFile {
  id: number;
  file: File;
  processedFile?: File;
}

// Sample images from Unsplash
const sampleImages = [
  "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1513013156887-d2bf241c8c82?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1643490745745-e8ca9a3a1c90?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3"
];

// Check if the user is on mobile Safari
const isMobileSafari = () => {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/OPiOS/i) && !ua.match(/FxiOS/i);
  return iOSSafari && 'ontouchend' in document;
};

export default function App() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const [isWebGPU, setIsWebGPU] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [currentModel, setCurrentModel] = useState<'briaai/RMBG-1.4' | 'Xenova/modnet'>('briaai/RMBG-1.4');
  const [isModelSwitching, setIsModelSwitching] = useState(false);
  const [images, setImages] = useState<ImageFile[]>([]);

  useEffect(() => {
    if (isMobileSafari()) {
      window.location.href = 'https://bg-mobile.addy.ie';
      return;
    }

    // Only check iOS on load since that won't change
    const { isIOS: isIOSDevice } = getModelInfo();
    setIsIOS(isIOSDevice);
    setIsLoading(false);
  }, []);

  const handleModelChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = event.target.value as typeof currentModel;
    setIsModelSwitching(true);
    setError(null);
    try {
      const initialized = await initializeModel(newModel);
      if (!initialized) {
        throw new Error("Failed to initialize new model");
      }
      setCurrentModel(newModel);
    } catch (err) {
      if (err instanceof Error && err.message.includes("Falling back")) {
        setCurrentModel('briaai/RMBG-1.4');
      } else {
        setError({
          message: err instanceof Error ? err.message : "Failed to switch models"
        });
      }
    } finally {
      setIsModelSwitching(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file, index) => ({
      id: Date.now() + index,
      file,
      processedFile: undefined
    }));
    setImages(prev => [...prev, ...newImages]);
    
    // Initialize model if this is the first image
    if (images.length === 0) {
      setIsLoading(true);
      setError(null);
      try {
        const initialized = await initializeModel();
        if (!initialized) {
          throw new Error("Failed to initialize background removal model");
        }
        // Update WebGPU support status after model initialization
        const { isWebGPUSupported } = getModelInfo();
        setIsWebGPU(isWebGPUSupported);
      } catch (err) {
        setError({
          message: err instanceof Error ? err.message : "An unknown error occurred"
        });
        setImages([]); // Clear the newly added images if model fails to load
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    }
    
    for (const image of newImages) {
      try {
        const result = await processImages([image.file]);
        if (result && result.length > 0) {
          setImages(prev => prev.map(img =>
            img.id === image.id
              ? { ...img, processedFile: result[0] }
              : img
          ));
        }
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
  }, [images.length]);


  const handlePaste = async (event: React.ClipboardEvent) => {
    const clipboardItems = event.clipboardData.items;
    const imageFiles: File[] = [];
    for (const item of clipboardItems) {
      if (item.type.startsWith("image")) {
        const file = item.getAsFile();
        if (file) {
          imageFiles.push(file);
        }
      }
    }
    if (imageFiles.length > 0) {
      onDrop(imageFiles);
    }
  };  

  const handleSampleImageClick = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], 'sample-image.jpg', { type: 'image/jpeg' });
      onDrop([file]);
    } catch (error) {
      console.error('Error loading sample image:', error);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".mp4"],
    },
  });

  // Remove the full screen error and loading states

  return (
    <div className="min-h-screen bg-orange-light-gradient" onPaste={handlePaste}>
      <nav className="bg-white shadow-orange border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-orange-gradient">
              {t.nav.title}
            </h1>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              {!isIOS && (
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">{t.nav.model}</span>
                  <select
                    value={currentModel}
                    onChange={handleModelChange}
                    className="bg-white border border-orange-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    disabled={!isWebGPU}
                  >
                    <option value="briaai/RMBG-1.4">RMBG-1.4 (Cross-browser)</option>
                    {isWebGPU && (
                      <option value="Xenova/modnet">MODNet (WebGPU)</option>
                    )}
                  </select>
                </div>
              )}
            </div>
          </div>
          {isIOS && (
            <p className="text-sm text-orange-600 mt-2">
              {t.nav.iosOptimized}
            </p>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid ${images.length === 0 ? 'grid-cols-2 gap-8' : 'grid-cols-1'}`}>
          {images.length === 0 && (
            <div className="flex flex-col justify-center items-start bg-white rounded-xl p-8 shadow-orange">
              <img 
                src="hero.png"
                alt="Hero image"
                className="mb-6 w-full object-cover h-[400px] rounded-lg"
              />
              <h2 className="text-4xl font-bold text-orange-gradient mb-4">
                {t.hero.title}
              </h2>
              <p className="text-xl text-gray-700 mb-4 font-medium">
                {t.hero.subtitle}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t.hero.description}
              </p>
              <div className="text-sm text-gray-500 space-y-2 mb-6">
                {t.hero.features.map((feature, index) => (
                  <p key={index} className="flex items-center">
                    <span className="text-orange-500 mr-2">✓</span>
                    {feature.replace('✓ ', '')}
                  </p>
                ))}
              </div>
              <p className="text-sm text-orange-400 font-medium">
                {t.hero.credit}
              </p>
            </div>
          )}
          
          <div className={images.length === 0 ? '' : 'w-full'}>
            <div
              {...getRootProps()}
              className={`p-8 mb-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 ease-in-out bg-white shadow-orange
                ${isDragAccept ? "border-green-500 bg-green-50 shadow-green-200" : ""}
                ${isDragReject ? "border-red-500 bg-red-50 shadow-red-200" : ""}
                ${isDragActive ? "border-orange-500 bg-orange-50 shadow-orange-lg" : "border-orange-300 hover:border-orange-500 hover:bg-orange-50 hover:shadow-orange-lg"}
                ${isLoading || isModelSwitching ? "cursor-not-allowed" : ""}
              `}
            >
              <input {...getInputProps()} className="hidden" disabled={isLoading || isModelSwitching} />
              <div className="flex flex-col items-center gap-2">
                {isLoading || isModelSwitching ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 spinner-orange mb-2"></div>
                    <p className="text-lg text-gray-600 font-medium">
                      {isModelSwitching ? t.upload.switchingModels : t.upload.loading}
                    </p>
                  </>
                ) : error ? (
                  <>
                    <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-lg text-red-600 font-medium mb-2">{error.message}</p>
                    {currentModel === 'Xenova/modnet' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleModelChange({ target: { value: 'briaai/RMBG-1.4' }} as any);
                        }}
                        className="px-4 py-2 btn-orange rounded-md transition-all"
                      >
                        {t.upload.switchToCrossBrowser}
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-lg text-gray-700 font-medium">
                      {isDragActive
                        ? "Drop the images here..."
                        : t.upload.dragDrop}
                    </p>
                    <p className="text-sm text-orange-600">{t.upload.clickSelect}</p>
                  </>
                )}
              </div>
            </div>

            {images.length === 0 && (
              <div className="bg-white rounded-xl p-6 shadow-orange border border-orange-100">
                <h3 className="text-xl text-gray-800 font-semibold mb-4">{t.samples.title}</h3>
                <p className="text-sm text-orange-600 mb-4 font-medium">{t.samples.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {sampleImages.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => handleSampleImageClick(url)}
                      className="relative aspect-square overflow-hidden rounded-lg hover:opacity-90 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm hover:shadow-orange"
                    >
                      <img
                        src={url}
                        alt={`Sample ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-orange-500 bg-opacity-0 hover:bg-opacity-10 transition-all duration-200"></div>
                    </button>
                  ))}
                </div>
                <div className="mt-6 space-y-2 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-gray-700 flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t.samples.privacy}
                  </p>
                  <p className="text-xs text-orange-600 font-medium">
                    💡 {t.samples.comparison}
                  </p>
                </div>
              </div>
            )}

            <Images images={images} onDelete={(id) => setImages(prev => prev.filter(img => img.id !== id))} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
