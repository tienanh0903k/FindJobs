// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException, Dependencies } from '@nestjs/common';
// import { AuthService } from '../auth.service'; 

// @Injectable()
// @Dependencies(AuthService)
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super();
//   }

//   async validate(username: string, password: string): Promise<any> {
//     console.log(`Validating user with username: ${username}`);
//     const user = await this.authService.validateUser(username, password);
//     if (!user) {
//       console.log('User validation failed');
//       throw new UnauthorizedException();
//     }
//     console.log('User validation succeeded');
//     return user;
//   }
  
// }