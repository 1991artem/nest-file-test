import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { FileController } from './file.controller';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
  exports: [FileService],
})
export class FileModule {}
