const logRequest = (req,res, next) => {
    console.log('Log terjadi request ke PATH :', req.path);
    next();
}

module.exports = logRequest