import Work from "../models/workModel.js";

export const getAllWork = async (req, res) => {
    try {
        const works = {
            'status' : 200,
            'message' : 'GET Works successfully!',
            'data' : await Work.findAll()
        };
        res.json(works);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const createWork = async (req, res) => {
    try {
        await Work.create(req.body);
        res.json({
            'status' : 200,
            'message' : 'Work Created Successfully!',
            'data' : []
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateWork = async (req, res) => {
    try {
        await Work.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            'status' : 200,
            'message' : 'Work Updated is Successfully!',
            'data' : []
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deleteWork = async (req, res) => {
    try {
        await Work.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            'status' : 200,
            'message' : 'Work Deleted is Successfully!',
            'data' : []
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}