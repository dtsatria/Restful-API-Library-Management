import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UpdateBukuValidator from 'App/Validators/UpdateBukuValidator'
import BukuValidator from 'App/Validators/BukuValidator'
import Buku from 'App/Models/Buku'


export default class BukusController {
    public async store({response, request} : HttpContextContract ) {

       
        const payload = await request.validate(BukuValidator)

        if(!payload){
            return response.badRequest({
                message : " Gagal Validasi"
            })
        }

        
         //menggunakan ORM
      const newBooks = await Buku.create(
        payload
    )
            if(!newBooks){
                return response.badRequest({
                    message : "Gagal Tambah Buku"
                })
            }

        return response.ok({
            message : "Buku berhasil ditambahkan!"
        })
  }


  public async index({response}: HttpContextContract){
    //menggunakan ORM
    const booksIndex = await Buku.query().preload('kategori')
    
    if(!booksIndex){
    return response.badRequest({
    message : "Gagal Tampil Buku"
})
}
    return response.ok({
    message : "Buku berhasil ditampilkan!",
    data : booksIndex
})

}

public async show({response, params}:HttpContextContract){
     //MENGGUNAKAN ORM
     const booksShow = await Buku.query().where('id',params.id).preload('kategori').first()


    if(!booksShow){
        return response.notFound({
        message : "Buku tidak ditemukan"
    })
}
        return response.ok({
        message : "Buku berhasil ditampilkan!",
        data : booksShow
})

}



public async update({response, request, params}:HttpContextContract){
        
    const payload = await request.validate(UpdateBukuValidator)

    //MENGGUNAKAN ORM
    const updateBooks = await Buku
    .query()
    .where('id', params.id)
    .update(payload)
    // const updateBooks = await Database
    // .from('books')
    // .where('id', params.id)
    // .update(
    //     payload,
       
    // )

    // const newUpdateBooks = await Database
    // .from('books')
    // .where('id', params.id)
    // .first();

    if(!updateBooks){
        return response.badRequest({
            message : "Gagal Update Buku"
        })
    }

    return response.ok({
        message : "Berhasil Update",
        // data : newUpdateBooks
    })



}

public async destroy({response, params}: HttpContextContract){
    //MENGGUNAKAN ORM
    const deleteData = await Buku.findOrFail(params.id)
    await deleteData.delete()

    if(!deleteData){
        return response.badRequest({
            message : "Gagal Delete Buku"
        })
    }

    return response.ok({
        message : "Berhasil Delete",
        
    })

}

}
