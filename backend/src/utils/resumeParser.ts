import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export const extractResumeText = async (file?: Express.Multer.File): Promise<string | undefined> => {
  if (!file) return undefined;
  if (file.mimetype === 'application/pdf') {
    const result = await pdf(file.buffer);
    return result.text;
  }
  if (
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.originalname.endsWith('.docx')
  ) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value;
  }
  return file.buffer.toString('utf-8');
};
