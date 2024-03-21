import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Kategori from './Kategori'
import User from './User'

export default class Buku extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public judul : string

  @column()
  public ringkasan : string

  @column()
  public tahun_terbit : string

  @column()
  public halaman : number

  @column()
  public kategori_id : number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Kategori,{
    foreignKey: 'kategori_id'
  })
  public kategori: BelongsTo<typeof Kategori>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'buku_id',
  })
  public peminjam: ManyToMany<typeof User>
}
