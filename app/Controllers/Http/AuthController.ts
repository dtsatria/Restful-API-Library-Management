import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import User from 'App/Models/User'
import Mail from '@ioc:Adonis/Addons/Mail'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'


export default class AuthController {
    public async register({request, response} : HttpContextContract){

        const dataValidation = await request.validate(RegisterUserValidator)

        const newUser = await User.create(dataValidation)

        const otp_code = Math.floor(100000 + Math.random() * 9000000)


        let saveCode = await Database
        .table('verified_users') // 👈 gives an instance of insert query builder
        .insert({ otp_code : otp_code, user_id: newUser.id })

        
        await Mail.send((message) => {
            message
              .from('dikatresna@node44.com')
              .to(dataValidation.email)
              .subject('Welcome Onboard!')
              .htmlView('emails/otp_verification', { otp_code })
          })

        return response.created({
            message : 'Register Berhasil, Verifikasi Email Anda'
        })

        
    }

    public async login ({request, response, auth} : HttpContextContract){
        const loginValidation = schema.create({
            email : schema.string(),
            password : schema.string()
        })

        await request.validate({ schema : loginValidation})

             const email = request.input('email')
             const password = request.input('password')

        try {
            const token = await auth.use('api').attempt(email, password, {
                expiresIn: '3 Days'
            })
            return response.ok({
                message : 'Login Berhasil',
                token
            })
          } catch {
            return response.unauthorized({
                message : 'Email Atau Password Salah'
            })
          }
    }

    public async otpConfirmation({request, response}: HttpContextContract){
        let otp_code = request.input('otp_code')
        let email = request.input('email')

        let user = await User.findBy('email', email)
        let otpCheck = await Database.query().from('verified_users').where('otp_code', otp_code).first()

        if(user?.id == otpCheck.user_id){
            user.is_Verified = true
            await user?.save()
            return response.ok({
             message :   'Berhasil Konfirmasi OTP'
            })
        } else {
            return response.notFound({
                message : 'Gagal Konfirmasi OTP'
            })
             
        }
    }

    public async updateProfile ({auth, response, request }: HttpContextContract){
        const userData = auth.user

        const profileValidation = schema.create({
            bio : schema.string(),
            alamat : schema.string()
        })

        await request.validate({ schema : profileValidation})

        const bio = request.input('bio') 
        const alamat = request.input('alamat')

        const persistancePayload = {
            bio,
            alamat
        }

        await userData?.related('profile').updateOrCreate({}, persistancePayload)

        response.ok({
            message : 'Berhasil Update/Create Profile'
        })
    }
}
