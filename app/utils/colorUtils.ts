import { colord } from "colord";
import { toast } from "sonner";
import ColorThief from "colorthief";

export const getColorFormats = (color: string) => {
  const c = colord(color);
  const hsv = c.toHsv();
  
  // Ensure HSV values are within proper ranges and format correctly
  const h = Math.round(hsv.h) % 360; // Hue: 0-359
  const s = Math.max(0, Math.min(100, Math.round(hsv.s))); // Saturation: 0-100
  const v = Math.max(0, Math.min(100, Math.round(hsv.v))); // Value: 0-100
  
  // Format HSV as a proper string with commas and degree symbol
  const hsvString = `HSV(${h}°, ${s}%, ${v}%${hsv.a !== 1 ? ` / ${hsv.a}` : ""})`;
  
  return {
    hex: c.toHex(),
    rgb: c.toRgbString(),
    hsl: c.toHslString(),
    hsv: hsvString,
    oklch: c.toLchString(),
  };
};

export const generateCssVariables = (
  colors: string[],
  format: "hex" | "rgb" | "hsl" | "hsv" | "oklch",
) => {
  if (colors.length === 0) return "";

  const formatColor = (color: string) => {
    const c = colord(color);
    switch (format) {
      case "hex":
        return c.toHex();
      case "rgb":
        return c.toRgbString();
      case "hsl":
        return c.toHslString();
      case "hsv":
        const hsv = c.toHsv();
        const h = Math.round(hsv.h) % 360;
        const s = Math.max(0, Math.min(100, Math.round(hsv.s)));
        const v = Math.max(0, Math.min(100, Math.round(hsv.v)));
        return `HSV(${h}°, ${s}%, ${v}%${hsv.a !== 1 ? ` / ${hsv.a}` : ""})`;
      case "oklch":
        const lch = c.toLch();
        return `oklch(${lch.l} ${lch.c} ${lch.h}${
          lch.a !== 1 ? ` / ${lch.a}` : ""
        })`;
      default:
        return c.toHex();
    }
  };

  const cssLines = colors.map((color, index) => 
    `  --color-${index + 1}: ${formatColor(color)};`
  );

  return `:root {\n${cssLines.join('\n')}\n}`;
};

export const generateTailwindConfig = (colors: string[]) => {
  if (colors.length === 0) return "";

  const colorEntries = colors.map((color, index) => 
    `        color${index + 1}: "${colord(color).toHex()}"`
  );

  return `module.exports = {
  theme: {
    extend: {
      colors: {
${colorEntries.join(',\n')}
      },
    },
  },
}`;
};

interface FileUploadHandlers {
  setIsExtracting: (value: boolean) => void;
  setUploadedImage: (value: string) => void;
  colors: string[];
  addColor: (color: string) => void;
}

export const handleFileUpload = (
  file: File,
  handlers: FileUploadHandlers,
) => {
  const { setIsExtracting, setUploadedImage, colors, addColor } = handlers;
  setIsExtracting(true);
  toast.loading("Extracting colors...");

  // Create URL for image preview
  const imageUrl = URL.createObjectURL(file);
  setUploadedImage(imageUrl);

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const img = new Image();

      img.onload = () => {
        try {
          const colorThief = new ColorThief();
          const palette = colorThief.getPalette(img, 8);

          // Calculate color distance using Euclidean distance in RGB space
          const calculateColorDistance = (color1: string, color2: string) => {
            const c1 = colord(color1).toRgb();
            const c2 = colord(color2).toRgb();
            return Math.sqrt(
              Math.pow(c1.r - c2.r, 2) +
                Math.pow(c1.g - c2.g, 2) +
                Math.pow(c1.b - c2.b, 2)
            );
          };

          const newColors = palette
            .map(([r, g, b]) => colord({ r, g, b }).toHex())
            .filter((color) => {
              return !colors.some((existingColor: string) => 
                calculateColorDistance(color, existingColor) < 30
              );
            });

          let addedCount = 0;
          newColors.forEach((color) => {
            if (!colors.includes(color)) {
              addColor(color);
              addedCount++;
            }
          });

          toast.dismiss();
          toast.success(`extracted ${addedCount} colors from image`);
          setIsExtracting(false);
        } catch (error) {
          console.error("error extracting colors:", error);
          toast.dismiss();
          toast.error("error extracting colors", {
            description: "please try a different image",
          });
          setIsExtracting(false);
        }
      };

      img.onerror = () => {
        toast.dismiss();
        toast.error("error loading image");
        setIsExtracting(false);
      };

      img.crossOrigin = "Anonymous";
      img.src = event.target?.result as string;
    } catch (error) {
      console.error("error processing image:", error);
      toast.dismiss();
      toast.error("error processing image");
      setIsExtracting(false);
    }
  };

  reader.onerror = () => {
    toast.dismiss();
    toast.error("error reading file");
    setIsExtracting(false);
  };

  reader.readAsDataURL(file);
};
