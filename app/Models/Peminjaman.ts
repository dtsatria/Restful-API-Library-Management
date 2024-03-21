import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Buku from './Buku'

export default class Peminjaman extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tanggal_pinjam : string

  @column()
  public tanggal_kembali : string

  @column()
  public user_id : number

  @column()
  public buku_id : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User,{
    foreignKey: 'user_id'
  })
  public User: BelongsTo<typeof User>

  @belongsTo(() => Buku,{
    foreignKey: 'buku_id'
  })
  public Buku: BelongsTo<typeof Buku>
}
