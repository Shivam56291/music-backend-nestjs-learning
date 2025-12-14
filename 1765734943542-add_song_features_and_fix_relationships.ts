import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSongFeaturesAndFixRelationships1765734943542 implements MigrationInterface {
    name = 'AddSongFeaturesAndFixRelationships1765734943542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_54cf41bc33d524b206b93581950"`);
        await queryRunner.query(`CREATE TABLE "songs_playlists" ("songsId" integer NOT NULL, "playlistsId" integer NOT NULL, CONSTRAINT "PK_ea21996b44cd84f5d4229bff291" PRIMARY KEY ("songsId", "playlistsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a9c4ba119a52a27ffea39690ac" ON "songs_playlists" ("songsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7ce702189cd4577e057ea3d100" ON "songs_playlists" ("playlistsId") `);
        await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "playListId"`);
        await queryRunner.query(`ALTER TABLE "songs" ADD "url" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "songs" ADD "playCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "songs_playlists" ADD CONSTRAINT "FK_a9c4ba119a52a27ffea39690acf" FOREIGN KEY ("songsId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "songs_playlists" ADD CONSTRAINT "FK_7ce702189cd4577e057ea3d1004" FOREIGN KEY ("playlistsId") REFERENCES "playlists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs_playlists" DROP CONSTRAINT "FK_7ce702189cd4577e057ea3d1004"`);
        await queryRunner.query(`ALTER TABLE "songs_playlists" DROP CONSTRAINT "FK_a9c4ba119a52a27ffea39690acf"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "playCount"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "songs" ADD "playListId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7ce702189cd4577e057ea3d100"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9c4ba119a52a27ffea39690ac"`);
        await queryRunner.query(`DROP TABLE "songs_playlists"`);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_54cf41bc33d524b206b93581950" FOREIGN KEY ("playListId") REFERENCES "playlists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
