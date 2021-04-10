import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Address, Department, Student, StudentRelations} from '../models';
import {AddressRepository} from './address.repository';
import {DepartmentRepository} from './department.repository';

export class StudentRepository extends DefaultCrudRepository<
  Student,
  typeof Student.prototype.id,
  StudentRelations
> {

  public readonly department: BelongsToAccessor<Department, typeof Student.prototype.id>;
  public readonly address: HasOneRepositoryFactory<Address, typeof Student.prototype.id>;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource,
    @repository.getter('DepartmentRepository')
    protected departmentRepositoryGetter: Getter<DepartmentRepository>,
    @repository.getter('AddressRepository')
    protected addressRepositoryGetter: Getter<AddressRepository>,

  ) {
    super(Student, dataSource);
    this.department = this.createBelongsToAccessorFor('department', departmentRepositoryGetter,);
    this.address = this.createHasOneRepositoryFactoryFor(
      'address',
      addressRepositoryGetter
    )
    this.registerInclusionResolver('department', this.department.inclusionResolver);
  }
}
