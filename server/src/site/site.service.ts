import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
import { DatabaseService } from 'src/database/database.service';
import { MasterDatabaseService } from 'src/database/master.database.service';
import { SlaveDatabaseService } from 'src/database/slave.database.service';

import { CreateSiteDto } from './dto/create-site.dto';
import { GetSiteDto } from './dto/get-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SiteService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly masterDatabaseService: MasterDatabaseService,
    private readonly slaveDatabaseService: SlaveDatabaseService,
    @InjectQueue('message-queue') private readonly queue: Queue
  ) {}

  /** 사이트 등록 */
  async create(createSiteDto: CreateSiteDto): Promise<boolean> {
    try {
      const code: string = await this.slaveDatabaseService.genCode();
      const sql = `
      INSERT INTO sites
      (code, name)
      VALUES ("${code}","${createSiteDto.name}");
      `;
      await this.queue.add('send-query', sql);
      return true;
    } catch (error) {
      throw error;
    }
  }

  /** 사이트 전체 조회 */
  async findAll(): Promise<GetSiteDto[]> {
    try {
      const con = await this.slaveDatabaseService.getConnection();
      const sitesRowData:
        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket
        | OkPacket[]
        | ResultSetHeader = (
        await con.query(`
      SELECT idx, code, name, created_time, updated_time 
      FROM sites;
      `)
      )[0];
      const sites: GetSiteDto[] = [];
      for (const i in sitesRowData) {
        sites.push(sitesRowData[i]);
      }
      con.release();
      return sites;
    } catch (error) {
      throw error;
    }
  }

  async findOne(code: string): Promise<GetSiteDto> {
    try {
      const con: PoolConnection = await this.databaseService.getConnection();
      const site:
        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket
        | OkPacket[]
        | ResultSetHeader = (
        await con.query(`
      SELECT idx, code, name, created_time, updated_time 
      FROM sites 
      WHERE code="${code}";
      `)
      )[0];
      con.release();
      return site[0];
    } catch (error) {
      throw error;
    }
  }

  async update(code: string, updateSiteDto: UpdateSiteDto): Promise<boolean> {
    try {
      const con: PoolConnection = await this.databaseService.getConnection();
      const existingData = await con.query(`
      UPDATE sites
      SET name="${updateSiteDto.name}"x
      WHERE code="${code}";
      `);
      con.release();
      return true;
    } catch (error) {
      throw error;
    }
  }

  async remove(code: string): Promise<boolean> {
    try {
      const con: PoolConnection = await this.databaseService.getConnection();

      await con.query(`
          DELETE from sites
          WHERE code="${code}"
          `);
      con.release();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
