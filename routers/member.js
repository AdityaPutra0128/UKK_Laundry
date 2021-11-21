const { request, response } = require("express")
const express = require("express")
const app = express()

//membaca request dari body dengan tioe json
app.use(express.json())

//panggil model
const models = require("../models/index")

//panggil model "member"
const member = models.member

//endpoint for get all member 
app.get("/", async (request, response) => {
    let dataMember = await member.findAll()

    return response.json(dataMember)
})

//endpoint add new member 
app.post("/", (request, response) => {
    let newMember = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        jenis_kelamin: request.body.jenis_kelamin,
        telepon: request.body.telepon
    }

    member.create(newMember)
    .then(result => {
        response.json({
            message: "Data berhasil ditambahkan"
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
})

//endpoint update data member
app.put("/:id_member", (request, response) => {
    //tampung data yang akan diubah
    let data = {
        nama : request.body.nama,
        alamat: request.body.alamat,
        jenis_kelamin: request.body.telepon,
        telepon: request.body.telepon
    }

    let parameter = {
        id_member: request.params.id_member
    }

    //proses update 
    member.update(data, {where: parameter})
    .then(result => {
        return response.json({
            message: 'Data Berhasil di ubah',
            data: result
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})

//endpoint hapus data member
app.delete("/:id_member", (request,response) => {
    //tampung data yang akan dihapus
    let parameter = {
        id_member: request.params.id_member
    }

    //proses hapus
    member.destroy({where: parameter})
    .then(result => {
        return response.json({
            message: 'Data berhasil di hapus'
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})
module.exports = app