const create = async(req,res) => {
    console.log('create');
    res.json(req.user)
}
const getAll = async(req,res) => {
    res.send('get all')
}
const update = async(req,res) => {
    res.send('update')
}
const getOne = async(req,res) => {
    res.send('get one')
}
const deleteOne = async(req,res) => {
    res.send('delete')
}

module.exports = {create, getAll, getOne, update, deleteOne}
