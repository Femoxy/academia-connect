const classModel = require('../models/classModel')


exports.createClass = async (req, res) => {
    try {
        const { type,  } = req.body;

        const classes = await classModel.create({
            type
        })
        // console.log('category', category)
        await category.save();

        res.status(201).json({
            message: 'class created successfully',
            data: classes 
        })
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
};


exports.getOneClass = async (req, res) => {
    try {
        const id = req.params.id;
        const clasx = await classModel.findById(id).populate('students')
        if(!clasx){
            return res.status(404).json({
                message: 'class not found'
            })
        }
        res.status(200).json({
            message: "This is your class populated by students  ",
            data:clasx
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteOneClas  = async (req, res) => {
    try {
        const id = req.params.id;
        const clasx = await classModel.findByIdAndDelete(id);
        if(!clasx){
            return res.status(404).json({
                message: 'Class does not exist'
            })
        }
        res.status(200).json({
            message: 'Class deleted'
        })
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}