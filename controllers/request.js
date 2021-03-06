import mongoose from 'mongoose'
import express from 'express'

import Request from '../models/Request.js'


const router = express.Router();


export const createRequest = async (req, res) => {

    const { nomDem, prenomDem, emailDem, themeDem, confDem, etatDem, rmsqDem, dateDem } = req.body;

    const newRequest = new Request({ nomDem, prenomDem, emailDem, themeDem, confDem, etatDem, rmsqDem, dateDem })

    try {
        await newRequest.save();
        res.status(200).json(newRequest);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const getRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getFiltredRequests = async (req, res) => {

    const { filter, word } = req.body;

    try {
        const requests = await Request.find({ filter: word });
        res.status(200).json(requests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const requestStatus = async (req, res) => {
    const { id } = req.params;
    try {

        const request = await Request.findById(id);
        res.status(200).json(request)


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}




export const updateRequest = async (req, res) => {
    const { id } = req.params;
    const { nomDem, prenomDem, emailDem, themeDem, confDem, etatDem, rmsqDem, dateDem } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No request with id: ${id}`);


    const updatedRequest = { nomDem, prenomDem, emailDem, themeDem, confDem, etatDem, rmsqDem, dateDem, _id: id };

    await Request.findByIdAndUpdate(id, updatedRequest, { new: true });

    res.json(updatedRequest);


}

export const deleteRequest = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Request with id: ${id}`);

    await Request.findByIdAndRemove(id);

    res.json({ message: "Request deleted successfully." });
}



export default router;