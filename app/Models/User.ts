import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nama: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: string | null

  @column()
  public rememberMeToken: string | null

  @column()
  public is_Verified : boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasOne(() => Profile,{
    foreignKey: 'user_id',
  })
  public profile: HasOne<typeof Profile>
}
