import { Injectable } from '@nestjs/common';
import { FieldPacket } from 'mysql2';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { GetMembershipDto } from './dto/get-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Injectable()
export class MembershipService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createMembershipDto: CreateMembershipDto) {
    const con = await this.databaseService.getConnection();
    try {
      const code = await this.databaseService.genCode();
      await con.query(`
      INSERT INTO membership
      (code, level, point_rage)
      VALUES ("${code}", "${createMembershipDto.level}", "${createMembershipDto.point_rage}");
      `);
      return true;
    } catch (error) {
      throw error;
    } finally {
      con.release();
    }
  }

  async findAll(): Promise<GetMembershipDto[]> {
    try {
      const con = await this.databaseService.getConnection();
      const membershipsRowData = (
        await con.query(
          `
      select * from membership;
      `
        )
      )[0];
      const memberships = [];
      for (const i in membershipsRowData) {
        memberships.push(membershipsRowData[i]);
      }
      const getMembershipDtos: GetMembershipDto[] = memberships;

      return getMembershipDtos;
    } catch (error) {
      throw error;
    }
  }

  async findOne(code: string) {
    try {
      const con = await this.databaseService.getConnection();
      const membershipRowData = (
        await con.query(`
      select * from membership where code="${code}";
      `)
      )[0];
      const membership: GetMembershipDto = membershipRowData[0];
      return membership;
    } catch (error) {
      throw error;
    }
  }

  async update(code: string, updateMembershipDto: UpdateMembershipDto) {
    try {
      const con = await this.databaseService.getConnection();
      const existingData = (
        await con.query(`
      SELECT level, point_rage FROM membership WHERE code="${code}";
      `)
      )[0][0];
      console.log(existingData);
      const level = updateMembershipDto.level
        ? updateMembershipDto.level
        : existingData.level;
      const point_rage = updateMembershipDto.point_rage
        ? updateMembershipDto.point_rage
        : existingData.point_rage;

      await con.query(`
      UPDATE membership
      SET
      level="${level}",
      point_rage="${point_rage}"
      WHERE code="${code}";
      `);
      con.release();
      return true;
    } catch (error) {
      throw error;
    }
  }

  async remove(code: string) {
    try {
      const con = await this.databaseService.getConnection();
      con.query(
        `
      DELETE from membership
      WHERE code="${code}";
      `
      );
      return true;
    } catch (error) {
      throw error;
    }
  }
}
