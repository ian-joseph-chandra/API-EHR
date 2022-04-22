function success(bdb, bc, res){
    let response = {
        bdb: bdb,
        bc: bc
    }

    res.status(200).json(response).end()
}

module.exports = {
    success
}
