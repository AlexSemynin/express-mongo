import * as uuid from 'uuid';
import * as path from 'path';
import fileUpload from 'express-fileupload';

class FileService{
  private _currentDir: string;
  constructor() {
    this._currentDir = path.resolve('./public/static');
    console.log(this._currentDir);
  }

  public saveFile(file: fileUpload.UploadedFile) {
    try{
      let errorMessage: string|undefined;
      const fileExt = file.name.split(".").pop();
      if(!(fileExt === "png" || fileExt === "jpg"))
      {
        errorMessage = "Не удалось записать файл: поддерживаемые расширения: jpg, png";
      }
      const fileName = uuid.v4() + `.${fileExt}`;
      const filePath = path.resolve(this._currentDir, fileName);
      file?.mv(filePath);
      return {fileName, errorMessage};
    } catch(e: any) {
      console.log(e);
    }
  }

  // public async getFile(fileName: string) {

  // }
}

export const fileService = new FileService();
