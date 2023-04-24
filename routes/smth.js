const { Router } = require('express')
const router = Router()
const uuid = require('uuid')
let nameAge = require('../Trash')

// Get name and age
router.get('/', (req, res) => {
    res.json(nameAge)
})

// Get one by id
router.get('/:id', (req, res) => {
    const isExist = nameAge.some(item => item.id === parseInt(req.params.id))

    if (isExist) {
        res.json(nameAge.filter(item => item.id === parseInt(req.params.id)))
    } else {
        res.status(404).json({ message: `This ${req.params.id} id not found😕` })
    }
})

// Post 
router.post('/', (req, res) => {
    const newPerson = {
        id: uuid.v4(),
        name: req.body.name,
        age: req.body.age
    }
    console.log(req.body);
    nameAge.push(newPerson)
    if (!req.body.name || !req.body.age) {
        res.status(400).json({ message: `Please enter all data!!!` })
    } else {
        res.status(400).json({ message: `Succsess`,data:nameAge })
    }

})

// Edit by id
router.put('/:id', (req, res) => {
    const isExist = nameAge.some(item => item.id === parseInt(req.params.id))

    if (isExist) {
        const editPerson = req.body

        nameAge.forEach(item => {
            if (item.id === parseInt(req.params.id)) {
                item.name = editPerson.name ? editPerson.name : item.name
                item.age = editPerson.age ? editPerson.age : item.age

                res.status(200).json({ message: `Data changed...`, item })
            }
        })
    } else {
        res.status(404).json({ message: `This ${req.params.id} id not found😕` })
    }
})

// Delete by id
router.delete('/:id', (req, res) => {
    const isExist = nameAge.some(item => item.id == req.params.id)
    if (isExist) {
        nameAge = nameAge.filter(item => item.id !== req.params.id)
        res.json({
            message: `Deleted...`,
            nameAge
        })
    } else {
        res.status(404).json({ message: `This ${req.params.id} id not found😕` })
    }
})


module.exports = router