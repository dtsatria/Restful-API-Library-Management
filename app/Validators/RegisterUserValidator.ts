import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    nama: schema.string([
      rules.alpha({
        allow : ['space']
      }),
      rules.maxLength(45),
    ]),

    email : schema.string({},[
      rules.email(),
      rules.maxLength(45),
      rules.unique({
        table: "users",
        column: "email"
      })
    ]),

    password : schema.string({},[
      rules.maxLength(45),
      rules.minLength(6)
    ]),

    role : schema.enum.optional(
      [
        "user","petugas"
      ]
    )

  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    required : '{{ field }} tidak boleh kosong',
    'nama.alpha': 'Nama  Harus Di Isi',
    'email.email': 'Email  Harus Di Isi',
    'password': 'Password  Harus Di Isi'

  }
}
