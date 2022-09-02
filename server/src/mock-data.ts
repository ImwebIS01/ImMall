import { GetMembershipDto } from './membership/dto/get-membership.dto';
import { GetUserDto } from './user/dto/get-user.dto';

export const UserMockData: GetUserDto[] = [
  {
    idx: 1,
    code: 'test_code_1',
    passwd: 'test_passwd_1',
    updated_time: new Date('2022-09-01T17:54:55.000Z'),
    email: 'test_user1@imweb.me',
    name: 'test_user1',
    callnum: '010-1234-5678',
    created_time: new Date('2022-09-01T17:54:55.000Z'),
    fk_membership_code: 'test_membership_code1',
    fk_site_code: 'test_site_code1',
  },
  {
    idx: 2,
    code: 'test_code_2',
    passwd: 'test_passwd_2',
    updated_time: new Date('2022-09-01T17:54:55.000Z'),
    email: 'test_user2@imweb.me',
    name: 'test_user2',
    callnum: '010-1234-5678',
    created_time: new Date('2022-09-01T17:54:55.000Z'),
    fk_membership_code: 'test_membership_code2',
    fk_site_code: 'test_site_code2',
  },
  {
    idx: 3,
    code: 'test_code_3',
    passwd: 'test_passwd_3',
    updated_time: new Date('2022-09-01T17:54:55.000Z'),
    email: 'test_user3@imweb.me',
    name: 'test_user3',
    callnum: '010-1234-5678',
    created_time: new Date('2022-09-01T17:54:55.000Z'),
    fk_membership_code: 'test_membership_code3',
    fk_site_code: 'test_site_code3',
  },
];

export const MembershipsMockData: GetMembershipDto[] = [
  {
    idx: 1,
    code: 'test_code_number1',
    level: 1,
    point_rage: 1,
  },
  {
    idx: 2,
    code: 'test_code_number2',
    level: 2,
    point_rage: 2,
  },
  {
    idx: 3,
    code: 'test_code_number3',
    level: 3,
    point_rage: 3,
  },
];
