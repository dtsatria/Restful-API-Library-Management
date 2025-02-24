import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Petugas {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    
    const user = auth.user

    if (user?.role === 'petugas'){

      await next()

    } else {
  
      return response.unauthorized({
        message : 'Hanya Petugas'
      })
    }
    }
  }

