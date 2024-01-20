import { Request, Response } from "express";
import { TemplateLoader } from "../../../services/TemplateLoader";
import { ErrorDictionary } from "../../common/ErrorDictionary";

export function render(req: Request, res: Response) {
  const {template, data } = req.body;
  const errors = new ErrorDictionary();

  errors.addIf(!template, 'template', 'Template is required');
  errors.addIf(!data, 'data', 'Data is required');

  if (errors.any()) {
    return res.status(400).send(errors.describe());
  }

  console.log('request data', data);

  try {
    const doc = TemplateLoader.loadBase64(template);

    doc.setData(data);
    doc.render();
    const buffer = doc
      .getZip()
      .generate({ type: 'nodebuffer' });

    return res
      .status(200)
      .header('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
      .header('Content-Disposition', 'attachment; filename=generated.docx')
      .header('Content-Length', buffer.length.toString())
      .write(buffer);
  }
  catch (e: any) {
    console.error(e);

    return res.status(400).send(ErrorDictionary
      .single('template', e.message)
      .describe()
    );
  }
}