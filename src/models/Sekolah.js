const dbPool = require('../config/database');

const createNewSekolah = (body) => {
    const SQLQuery = `INSERT INTO sekolah (NamaSekolah, Alamat) VALUES ('${body.NamaSekolah}', '${body.Alamat}')`;
    return dbPool.execute(SQLQuery);
}

const getAllSekolah = (startIndex, maxRecords, search, sortBy, sortOrder) => {
    let SQLQuery = `SELECT * FROM sekolah WHERE NamaSekolah LIKE '%${search}%' OR Alamat LIKE '%${search}%'`;
    if (sortBy) {
        SQLQuery += ` ORDER BY ${sortBy} ${sortOrder || 'ASC'}`;
    }
    SQLQuery += ` LIMIT ${startIndex}, ${maxRecords}`;
    console.log(SQLQuery);
    return dbPool.execute(SQLQuery);
}

const updateSekolah = (idSekolah, body) => {
    const SQLQuery = `UPDATE sekolah SET NamaSekolah = '${body.NamaSekolah}', Alamat = '${body.Alamat}' WHERE id = ${idSekolah}`;
    return dbPool.execute(SQLQuery);
}

const deleteSekolah = (id) => {
    const SQLQuery = `DELETE FROM sekolah WHERE id = ${id}`;
    return dbPool.execute(SQLQuery);
}

const isSekolahDuplicate = async (NamaSekolah) => {
    const SQLQuery = `SELECT COUNT(*) as count FROM sekolah WHERE NamaSekolah='${NamaSekolah}'`;
    const [rows] = await dbPool.execute(SQLQuery);
    return rows[0].count > 0;
}

module.exports = {
    createNewSekolah,
    getAllSekolah,
    isSekolahDuplicate,
    updateSekolah,
    deleteSekolah
}