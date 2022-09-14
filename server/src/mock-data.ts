import { GetMembershipDto } from './membership/dto/get-membership.dto';
import { GetUserDto } from './user/dto/get-user.dto';
import { GetRefundDto } from './refund/dto/get-refund.dto';

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

export const Orders: object[] = [
  {
    idx: 2,
    code: 'test_code_number2',
    order_no: 'test2',
    updated_time: '2022-01-09',
    created_time: '2022-01-01',
    delivered_time: '2022-01-10',
    site_code: 'site_1',
    user_code: 'user2',
    post_number: 112,
    receiver_name: '김테스트2',
    receiver_address: '서울특별시 테스트구 테스트동',
    receiver_phone: '01089887777',
    receiver_phone2: '01077776666',
    status: '배송중',
    total_price: 2000,
  },
  {
    idx: 3,
    code: 'test_code_number3',
    order_no: 'test3',
    updated_time: '2022-01-09',
    created_time: '2022-01-01',
    delivered_time: '2022-01-10',
    site_code: 'site_1',
    user_code: 'user3',
    post_number: 112,
    receiver_name: '김테스트',
    receiver_address: '서울특별시 테스트구 테스트동',
    receiver_phone: '01089887777',
    receiver_phone2: '01077776666',
    status: '배송완료',
    total_price: 3000,
  },
  {
    idx: 1,
    code: 'test_code_number1',
    order_no: 'test1',
    updated_time: '2022-01-09',
    created_time: '2022-01-01',
    delivered_time: '2022-01-10',
    site_code: 'site_1',
    user_code: 'user1',
    post_number: 112,
    receiver_name: '김테스트',
    receiver_address: '서울특별시 테스트구 테스트동',
    receiver_phone: '01089887777',
    receiver_phone2: '01077776666',
    status: '주문완료',
    total_price: 10222,
  },
];

export const RefundMockData: GetRefundDto[] = [
  {
    idx: 1,
    code: `test_code1`,
    amount: 100,
    reason_type: `test_reason_type1`,
    reason_detail: `test_reason_detail1`,
    fk_order_code: `teat_order_code1`,
    fk_site_code: `test_site_code1`,
  },
  {
    idx: 2,
    code: `test_code2`,
    amount: 100,
    reason_type: `test_reason_type2`,
    reason_detail: `test_reason_detail2`,
    fk_order_code: `teat_order_code2`,
    fk_site_code: `test_site_code2`,
  },
  {
    idx: 3,
    code: `test_code3`,
    amount: 100,
    reason_type: `test_reason_type3`,
    reason_detail: `test_reason_detail3`,
    fk_order_code: `teat_order_code3`,
    fk_site_code: `test_site_code3`,
  },
  {
    idx: 4,
    code: `test_code4`,
    amount: 100,
    reason_type: `test_reason_type4`,
    reason_detail: `test_reason_detail4`,
    fk_order_code: `teat_order_code4`,
    fk_site_code: `test_site_code4`,
  },
];
