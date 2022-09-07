import { Injectable } from '@nestjs/common';
import { query } from 'express';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
import { DatabaseService } from 'src/database/database.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { GetSiteDto } from './dto/get-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SiteService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createSiteDto: CreateSiteDto): Promise<boolean> {
    try {
      const [con, code] = await Promise.all([
        this.databaseService.getConnection(),
        this.databaseService.genCode(),
      ]);
      await con.query(`
      INSERT INTO site
      (code, name)
      VALUES ("${code}","${createSiteDto.name}");
      `);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<GetSiteDto[]> {
    try {
      const con = await this.databaseService.getConnection();
      const sitesRowData:
        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket
        | OkPacket[]
        | ResultSetHeader = (
        await con.query(`
      SELECT idx, code, name, created_time, updated_time 
      FROM site;
      `)
      )[0];
      const sites: GetSiteDto[] = [];
      for (let i in sitesRowData) {
        sites.push(sitesRowData[i]);
      }
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
      FROM site 
      WHERE code="${code}";
      `)
      )[0];
      return site[0];
    } catch (error) {
      throw error;
    }
  }

  async update(code: string, updateSiteDto: UpdateSiteDto): Promise<boolean> {
    try {
      const con: PoolConnection = await this.databaseService.getConnection();
      const existingData = await con.query(`
      UPDATE site
      SET name="${updateSiteDto.name}"x
      WHERE code="${code}";
      `);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async remove(code: string): Promise<boolean> {
    try {
      const con: PoolConnection = await this.databaseService.getConnection();

      await con.query(`
          DELETE from site
          WHERE code="${code}"
          `);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
