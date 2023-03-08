import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIn, DTOSignUp } from './dto';
import { GoogleOauthGuard } from './guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SignIn) {
    return this.authService.signIn(dto);
  }

  @Post('signup')
  signup(@Body() dto: DTOSignUp) {
    return this.authService.signUp(dto);
  }

  @Post('signup-as-technician')
  signupAsTechnician(@Body() dto: DTOSignUp) {
    return this.authService.signUpAsTechnician(dto);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req) {
    return this.authService.signInWithGoogle(req.user);
  }
}
