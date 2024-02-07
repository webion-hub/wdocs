import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import expressionParser from "docxtemplater/expressions.js";

export class TemplateLoader {
  public static loadBase64(base64Str: string): Docxtemplater<PizZip> {
    const zip = new PizZip(base64Str, {
      base64: true,
    });
    
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      parser: expressionParser,
    });

    return doc;
  }
}