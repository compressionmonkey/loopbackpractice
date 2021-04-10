import {repository} from '@loopback/repository';
import {param, post, requestBody} from '@loopback/rest';
import {Address, Student} from '../models';
import {StudentRepository} from '../repositories';

export class StudentAddressController {
  constructor(
    @repository(StudentRepository)
    protected studentRepository: StudentRepository
  ) { }

  @post('/students/{id}/address')
  async createAddress(
    @param.path.number('id')
    studentId: typeof Student.prototype.id,
    @requestBody()
    addressData: Address,
  ): Promise<Address> {
    return await this.studentRepository.address(studentId).create(addressData);
  }
}
