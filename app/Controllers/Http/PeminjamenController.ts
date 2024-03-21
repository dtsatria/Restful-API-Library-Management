import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Peminjaman from 'App/Models/Peminjaman'


export default class PeminjamenController {
    public async store({params, request, response, auth} : HttpContextContract){
        const userData = auth.user?.id

        const pinjamValidator = schema.create({
            tanggal_pinjam : schema.string(),
            tanggal_kembali : schema.string()
        })

        await request.validate({ schema : pinjamValidator})

        await Peminjaman.create({
            buku_id : params.id,
            user_id : userData,
            tanggal_pinjam : request.input('tanggal_pinjam'),
            tanggal_kembali : request.input('tanggal_kembali')

        })

        response.ok({
            message : `Berhasil meminjam Buku dengan ID ${params.id}`
        })
    }

    public async index({response}:HttpContextContract){
        const dataPinjam = await Peminjaman.query().preload('User').preload('Buku')

        response.ok({
            message: 'Data Peminjam Buku',
            data : dataPinjam
        })
    }

    public async show ({response, params}:HttpContextContract){
        const detailPinjam = await Peminjaman.query().where('id', params.id).preload('User').preload('Buku').first()


        response.ok({
            message: 'Data Detail Peminjam Buku',
            data : detailPinjam
        })
    }
}
