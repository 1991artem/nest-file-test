import {
  Body,
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-token.guard';
import { CreateFileDto } from './dto/create-file.dto';
import { FileService } from './file.service';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Upload image' })
  @Post(':id/file')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(
    @Body() body: CreateFileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.uploadFile(body, file);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create PDF file' })
  @Get()
  createPdfFile(@Body() body: CreateFileDto) {
    return this.fileService.createPdfFile(body);
  }
}
