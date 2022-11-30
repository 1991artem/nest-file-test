import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { readFileSync } from 'node:fs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
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
        await mkdir(filePath, { recursive: true });
      }
      const writeableStream = fs.createWriteStream(
        path.join(filePath, fileName),
      );
      writeableStream.write(file.buffer);

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
      const user = await this.userService.findUserByEmail(email);
      const fileName = 'PDF' + uuid.v4() + '.pdf';
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      const imagePath = path.join(filePath, user.image);

      const destPath = path.join(filePath, fileName);
      await this.formPdfFile(imagePath, destPath, user);

      setTimeout(() => {
        fs.readFile(destPath, 'hex', async (err, data) => {
          if (err) throw err;
          const buffer = Buffer.from(data, 'binary').toString();
          await this.userService.updateUserById(user.id, {
            ...user,
            ...{ pdf: buffer },
          });
        });
      }, 1000);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async formPdfFile(imagePath: string, destPath: string, user: User) {
    try {
      const doc = new PDFDocument({ font: 'Courier' });

      doc.pipe(fs.createWriteStream(destPath));

      doc.image(imagePath, {
        fit: [100, 100],
        align: 'center',
        valign: 'center',
      });

      doc.moveDown();
      doc.text(user.lastName, {
        width: 410,
        align: 'justify',
      });

      doc.moveDown();
      doc.text(user.firstName, {
        width: 410,
        align: 'justify',
      });

      doc.end();
    } catch (e) {
      throw new HttpException(
        'Create file has been failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
