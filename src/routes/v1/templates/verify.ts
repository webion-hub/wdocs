import { Request, Response } from "express";
import Docxtemplater from 'docxtemplater';
import PizZip from "pizzip";
import { TemplateLoader } from "../../../services/TemplateLoader";
import { ErrorDictionary } from "../../common/ErrorDictionary";


export function verify(req: Request, res: Response) {
  const template = req.body.template;
  const errors = new ErrorDictionary();
  
  errors.addIf(!template, 'template', 'Template is required');

  if (errors.any()) {
    return res.status(400).send(errors.describe());
  }

  try {
    const _ = TemplateLoader.loadBase64(template);

    return res.status(200).send();
  }
  catch (e: any) {
    return res.status(400).send(ErrorDictionary
      .single('template', e.message)
      .describe()
    );
  }
}