import { AuthController } from './auth.controller';
import { AuthService } from './shared/auth.service';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module'
import { LocalStrategy } from './shared/local.strategy';
import { JwtStrategy } from './shared/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './shared/constants';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'}
        })
    ],
    controllers: [
        AuthController, ],
    providers: [
        AuthService, 
        LocalStrategy,
        JwtStrategy,
    ],
})
export class AuthModule {}

