import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {User} from "../user/user.model";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (await this.verifyPassword(pass, user.password)) {
      return user;
    }
    return null;
  }

  createUserAccount(param: {
    email: string;
    password: string;
  }): Promise<User | null> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
        bcrypt.hash(param.password, salt, async (err: any, hash: any) => {
          if (err) reject(err);
          resolve(
            await this.usersService.create({
              email: param.email,
              password: hash,
              roles: ['owner'],
            }),
          );
        });
      });
    });
  }

  verifyPassword(password: string, hash: string): Promise<boolean> {
    console.log(password);
    console.log(hash);
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const bcrypt = require('bcrypt');

      bcrypt.compare(password, hash, function (err, result) {
        console.log(result);
        if (err) resolve(false);
        resolve(result);
      });
    });
  }
}
