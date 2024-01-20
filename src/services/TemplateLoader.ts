import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

export class TemplateLoader {
  public static loadBase64(base64Str: string): Docxtemplater<PizZip> {
    const zip = new PizZip(base64Str, {
      base64: true,
    });
    
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    return doc;
  }
}