import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import * as console from 'node:console';

export interface RequestHead {
  headers: { authorization: string };
}

@Injectable()
export class LocalAuthGuard
  extends PassportStrategy(Strategy)
  implements CanActivate
{
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate() {
    /*const authToken = req.headers?.authorization.split(' ')[1];
    console.log(req);
    console.log(authToken);*/
    // const user = await this.authService.validateUser(authToken);
    /*if (!user) {
      throw new UnauthorizedException();
    }
    return user;*/
  }

  canActivate(request: ExecutionContext): boolean {
    const incomeReq: any[] = request.getArgs().splice(0, 1);
    const authToken: string = '';
    const signature: string = '';
    incomeReq.map((value) => {
      return {
        authToken: value.headers?.authorization,
        signature: value.headers.signature,
      };
    });
    console.log(authToken.split(' ')[1], signature);
    return true;
  }
}
