import { create } from "zustand";
import { colord } from "colord";
import { toast } from "sonner";

interface ColorState {
  colors: string[];
  currentColor: string;
  uploadedImage: string | null;
  isExtracting: boolean;
  showExport: boolean;
  setCurrentColor: (color: string) => void;
  addColor: (color: string) => void;
  removeColor: (index: number) => void;
  removeAllColors: () => void;
  setUploadedImage: (image: string | null) => void;
  setIsExtracting: (isExtracting: boolean) => void;
  setShowExport: (show: boolean) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  colors: [],
  currentColor: "",
  uploadedImage: null,
  isExtracting: false,
  showExport: false,

  setCurrentColor: (color: string) => set({ currentColor: color }),

  addColor: (inputColor: string) => {
    let normalizedColor = inputColor.trim();

    try {
      // Handle raw OKLCH values (3 space-separated numbers)
      if (/^\d*\.?\d+\s+\d*\.?\d+\s+\d*\.?\d+$/.test(normalizedColor)) {
        normalizedColor = `oklch(${normalizedColor})`;
      }
      // Handle raw HSL values (hue saturation lightness)
      else if (/^\d+(?:\.\d+)?(?:deg|turn|rad|grad)?\s+\d+(?:\.\d+)?%?\s+\d+(?:\.\d+)?%?$/.test(normalizedColor)) {
        normalizedColor = `hsl(${normalizedColor})`;
      }
      // Handle raw RGB values (3 comma/space-separated numbers)
      else if (/^\d+\s*[,\s]\s*\d+\s*[,\s]\s*\d+$/.test(normalizedColor)) {
        normalizedColor = `rgb(${normalizedColor.replace(/\s+/g, " ").replace(/,/g, "")})`;
      }
      // Handle raw HEX values (3-8 hex characters)
      else if (/^[0-9a-f]{3,8}$/i.test(normalizedColor)) {
        normalizedColor = `#${normalizedColor}`;
      }

      const color = colord(normalizedColor);
      if (!color.isValid()) {
        toast.error("Invalid color", {
          description: "Please enter a valid color code",
        });
        return;
      }

      set((state: ColorState) => {
        if (state.colors.includes(normalizedColor)) {
          toast.info("Color already exists", {
            description: "This color is already in your list",
          });
          return state;
        }
        return { colors: [...state.colors, normalizedColor], currentColor: "" };
      });
    } catch {
      toast.error("Error", { description: "Invalid color format" });
    }
  },

  removeColor: (index: number) =>
    set((state: ColorState) => ({
      colors: state.colors.filter((_, i: number) => i !== index),
    })),

  removeAllColors: () => set({ colors: [], uploadedImage: null }),

  setUploadedImage: (image: string | null) => set({ uploadedImage: image }),

  setIsExtracting: (isExtracting: boolean) => set({ isExtracting }),

  setShowExport: (show: boolean) => set({ showExport: show }),


}));
