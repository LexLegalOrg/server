module.exports = (res,err) => {
    res.status(500).json({
        success: false,
        msg: err.message ? err.message : err
    })
}
