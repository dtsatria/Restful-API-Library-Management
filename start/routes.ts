/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'



Route.get('/', async () => {
  return { hello: 'world' }
})





//ROUTE UNTUK ENDPOINT
Route.group(() => {
//ENDPOINT KHUSUS UNTUK PETUGAS
Route.resource('kategori', 'KategorisController').apiOnly().middleware({'*' : ['auth', 'petugas']})

  //ENDPOINT CRUD KATEGORI
// Route.resource('kategori', 'KategorisController').apiOnly()
  
//ENDPOINT CRUD BUKU
Route.resource('buku', 'BukusController').apiOnly().middleware({'*' : ['auth', 'petugas']})

//ENDPOINT AUTHENTICATION
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.post('/otp-confirmation', 'AuthController.otpConfirmation')
Route.post('/profile', 'AuthController.updateProfile').middleware('auth')

//ENDPOINT PEMINJAMAN
Route.post('/buku/:id/peminjaman', 'PeminjamenController.store').middleware('auth')
Route.get('/peminjaman', 'PeminjamenController.index').middleware('auth')
Route.get('/peminjaman/:id', 'PeminjamenController.show').middleware('auth')




}).prefix('/api/v1')