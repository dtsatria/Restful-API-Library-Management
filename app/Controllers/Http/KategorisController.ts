import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KategoriValidator from 'App/Validators/KategoriValidator'
import Kategori from 'App/Models/Kategori'

export default class KategorisController {
    //POST TAMBAH DATA
    public async store({response, request} : HttpContextContract ) {

       
        const payload = await request.validate(KategoriValidator)

      if(!payload){
          return response.badRequest({
              message : " Gagal Validasi"
          })
      }
     
      //menggunakan ORM
      const newCategory = await Kategori.create(
            payload
        )

          if(!newCategory){
              return response.badRequest({
                  message : "Gagal Kategori"
              })
          }

      return response.ok({
          message : "Kategori berhasil ditambahkan!"
      })
    }

   // GET READ/TAMPIL SEMUA DATA
   public async index({response}: HttpContextContract){
 
     //menggunakan ORM
     const kategorisIndex = await Kategori.query().preload('buku')
     
     if(!kategorisIndex){
     return response.badRequest({
     message : "Gagal Tampil Kategori"
    })
    }
    
    return response.ok({
     message : "Kategori berhasil ditampilkan!",
     data : kategorisIndex
    })
 }

  //GET TAMPIL DATA SESUAI INDEX
  public async show({response, params}:HttpContextContract){
    //MENGGUNAKAN QUERY BUILDER
    // const category = await Database
    // .from('kategoris')
    // .where('id', params.id)
    // .first();

    //MENGGUNAKAN ORM
    const category = await Kategori.query().where('id',params.id).preload('buku').first()

    if(!category){
        return response.notFound({
        message : "ID tidak ditemukan"
        })
    }
        return response.ok({
        message : "ID berhasil ditampilkan!",
        data : category
        })
}

//UPDATE DATA
public async update({response, request, params}:HttpContextContract){
            
    const payload = await request.validate(KategoriValidator)

    //MENGGUNAKAN ORM
    const updateKategori = await Kategori
    .query()
    .where('id', params.id)
    .update(payload)

    if(!updateKategori){
        return response.badRequest({
            message : "Gagal Update Kategori"
        })
    }

    return response.ok({
        message : "Berhasil Update",
        // data : newUpdateKategori
    })
}


 // DEL DELETE DATA
 public async destroy({response, params}: HttpContextContract){
    // MENGGUNAKAN QUERY BUILDER
    // const deleteData = await Database
    // .from('kategoris')
    // .where('id', params.id)
    // .delete()

    //MENGGUNAKAN ORM
    const deleteData = await Kategori.findOrFail(params.id)
    await deleteData.delete()

    if(!deleteData){
        return response.badRequest({
            message : "Gagal Delete Kategori"
        })
    }

    return response.ok({
        message : "Berhasil Delete",
        
    })
}
}
