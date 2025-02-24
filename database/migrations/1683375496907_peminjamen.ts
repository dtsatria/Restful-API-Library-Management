import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'peminjamen'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')

      table
      .integer('buku_id')
      .unsigned()
      .references('bukus.id')
      .onDelete('CASCADE')

      table.string('tanggal_pinjam')
      table.string('tanggal_kembali')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
