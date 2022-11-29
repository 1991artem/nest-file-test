import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as PdfPrinter from 'pdfmake';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { UserService } from 'src/user/user.service';
import { CreateFileDto } from './dto/create-file.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FileService {
  constructor(private userService: UserService) {}

  async uploadFile({ email }, file: any) {
    try {
      const user: User = await this.userService.findUserByEmail(email);

      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      await this.userService.updateUserById(user.id, {
        ...user,
        ...{ image: fileName },
      });
      return { message: `File has been writed` };
    } catch (e) {
      throw new HttpException(
        'Upload has been failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createPdfFile({ email }: CreateFileDto) {
    try {
      const { image, lastName, firstName } =
        await this.userService.findUserByEmail(email);
      const fileName = 'PDF' + uuid.v4() + '.pdf';
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      const fonts = {
        Helvetica: {
          normal: 'Helvetica',
          bold: 'Helvetica-Bold',
          italics: 'Helvetica-Oblique',
          bolditalics: 'Helvetica-BoldOblique',
        },
      };
      const printer = new PdfPrinter(fonts);

      const docDefinition = {
        content: [
          { text: 'Artem Puzik', fontSize: 25 },
          {
            layout: 'lightHorizontalLines', // optional
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', 'auto', '*'],
              body: [
                ['Avatar', 'FirstName', 'LastName', 'Git'],
                [
                  {
                    image: filePath + '/' + image,
                    width: 50,
                    height: 50,
                  },
                  { text: `${firstName}`, bold: true },
                  { text: `${lastName}`, bold: true },
                  {
                    qr: 'https://github.com/1991artem/nest-file-test.git',
                    foreground: 'black',
                    background: 'white',
                    fit: '50',
                  },
                ],
              ],
            },
          },
        ],
        defaultStyle: {
          font: 'Helvetica',
        },
      };
      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      pdfDoc.pipe(fs.createWriteStream(filePath + '/' + fileName));
      pdfDoc.end();

      return { message: `File ${fileName}  has been created` };
    } catch (e) {
      throw new HttpException(
        'Create file has been failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
