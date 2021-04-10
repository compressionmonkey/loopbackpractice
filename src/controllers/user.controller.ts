// Uncomment these imports to begin using these cool features!
import {getJsonSchemaRef, post, requestBody} from '@loopback/openapi-v3';
import {repository} from '@loopback/repository';
import * as _ from "lodash";
import {User} from '../models';
import {UserRepository} from '../repositories';
import {validateCredentials} from '../services/validator';

// import {inject} from '@loopback/core';


export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) { }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(User)
        }
      }
    }
  })
  async signup(@requestBody() userData: User) {
    validateCredentials(_.pick(userData, ['email','password']))
    const model = {
      email: null,
      firstName: null,
      lastName: null
    };
    await this.userRepository.create(userData);
    const result = _.pick(userData, _.keys(model));
    console.log('test', result)
    return result;
  }
}
