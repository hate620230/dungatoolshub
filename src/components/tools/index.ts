import { type ComponentType } from "react";

import WordCounter from "./WordCounter";
import CharacterCounter from "./CharacterCounter";
import CaseConverter from "./CaseConverter";
import TextReverser from "./TextReverser";
import RemoveDuplicates from "./RemoveDuplicates";
import LoremIpsum from "./LoremIpsum";
import { UrlEncoder, UrlDecoder, Base64Encoder, Base64Decoder, HtmlEncoder, HtmlDecoder } from "./EncoderTools";
import { AgeCalculator, BmiCalculator, PercentageCalculator, DiscountCalculator, LoanCalculator, GstCalculator } from "./Calculators";
import { PasswordGenerator, Md5Generator, Sha256Generator } from "./SecurityTools";
import { ColorPicker, HexToRgb, RgbToHex } from "./ColorTools";
import { JsonFormatter, JsonValidator, CssMinifier, JsMinifier } from "./DevTools";
import { ImageResizer, ImageCompressor, ImageRotator, ImageFlipper, ImageToBase64, ImageColorPicker } from "./ImageTools";
import QrCodeGenerator from "./QrCodeGenerator";

export const toolComponents: Record<string, ComponentType> = {
  "word-counter": WordCounter,
  "character-counter": CharacterCounter,
  "case-converter": CaseConverter,
  "text-reverser": TextReverser,
  "remove-duplicates": RemoveDuplicates,
  "lorem-ipsum": LoremIpsum,
  "url-encoder": UrlEncoder,
  "url-decoder": UrlDecoder,
  "base64-encoder": Base64Encoder,
  "base64-decoder": Base64Decoder,
  "html-encoder": HtmlEncoder,
  "html-decoder": HtmlDecoder,
  "age-calculator": AgeCalculator,
  "bmi-calculator": BmiCalculator,
  "percentage-calculator": PercentageCalculator,
  "discount-calculator": DiscountCalculator,
  "loan-calculator": LoanCalculator,
  "gst-calculator": GstCalculator,
  "password-generator": PasswordGenerator,
  "md5-generator": Md5Generator,
  "sha256-generator": Sha256Generator,
  "color-picker": ColorPicker,
  "hex-to-rgb": HexToRgb,
  "rgb-to-hex": RgbToHex,
  "json-formatter": JsonFormatter,
  "json-validator": JsonValidator,
  "css-minifier": CssMinifier,
  "js-minifier": JsMinifier,
  "image-resizer": ImageResizer,
  "image-compressor": ImageCompressor,
  "image-rotator": ImageRotator,
  "image-flipper": ImageFlipper,
  "image-to-base64": ImageToBase64,
  "image-color-picker": ImageColorPicker,
  "qr-code-generator": QrCodeGenerator,
};
