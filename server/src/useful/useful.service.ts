import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';

export class UsefulService {
  packitTransformer(
    packit:
      | RowDataPacket[]
      | RowDataPacket[][]
      | OkPacket
      | OkPacket[]
      | ResultSetHeader
  ) {
    const array = [];
    for (const i in packit) {
      array.push(packit[i]);
    }
    return array;
  }
}
