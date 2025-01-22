const SekolahModel = require('../models/Sekolah');
const ExcelJS = require('exceljs');

const getAllSekolah = async (req,res) => {
    try {
        const StartIndex = req.query.startIndex;
        const MaxRecord = req.query.maxRecords;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder;
        
        const [data] = await SekolahModel.getAllSekolah(StartIndex, MaxRecord, search, sortBy, sortOrder);
        // res.json({
        //     message: 'GET all sekolah success',
        //     data:data
        // })
        // console.log(Date.now());
        console.log(data);
        res.json(data)
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }

}

const createNewSekolah = async (req,res) => {
    // console.log(req.body);
    const {body} = req;
    
    if (!body.NamaSekolah || !body.Alamat) {
        return res.status(400).json({
            message: 'Nama sekolah dan alamat sekolah harus diisi'
        })
    }

    const duplicate = await SekolahModel.isSekolahDuplicate(body.NamaSekolah);
    console.log(duplicate);
    if (duplicate === true) {
        return res.status(409).json({
            message: 'Nama Sekolah sudah ada di database.',
        });
    } else {

        try {
            await SekolahModel.createNewSekolah(body);
            res.status(201).json({
                message: 'CREATE new sekolah success',
                data:body
            })
        } catch (error) {
            res.status(500).json({
                message: 'Server Error',
                serverMessage: error
            })
        }
    }
}

const exportSekolahToExcel = async (req, res) => {
    try {
        const StartIndex = req.query.startIndex;
        const MaxRecord = req.query.maxRecords;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder;

        const [data] = await SekolahModel.getAllSekolah(StartIndex, MaxRecord, search, sortBy, sortOrder);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sekolah Data');

        worksheet.columns = [
            { header: 'ID', key: 'Id', width: 10 },
            { header: 'Nama Sekolah', key: 'NamaSekolah', width: 30 },
            { header: 'Alamat', key: 'Alamat', width: 30 },
            // Add other columns as needed
        ];

        data.forEach((item) => {
            worksheet.addRow(item);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=sekolah_data.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }
}

module.exports = {
    getAllSekolah,
    createNewSekolah,
    exportSekolahToExcel
}

