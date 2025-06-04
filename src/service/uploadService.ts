// File upload function, maybe move this to a utils file in the future
import multer from "multer";
import {ServiceError} from "../models/serviceError";
import {getLogger} from "../loggerFactory";
import {getActLog} from "../repo/actlogRepo";
import {upload} from "./bucketService";
import {NextFunction} from "express";

const memoryStorage = multer.memoryStorage();

const log = getLogger('service.uploadService')

const uploadPDF = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit, quite spicey! move this to a config
    },
    fileFilter: (req, file, callBack) => {
        // Filter for PDF files
        if (file.mimetype === 'application/pdf') {
            callBack(null, true);
        } else {
            callBack(new ServiceError('Only PDF files are allowed!', 400));
        }
    }
}).single("file");

const uploadActlogPdf = async (req: any, res: any, next: NextFunction) => {
    try {
        uploadPDF(req, res, async (err: any) => {
            if (err) {
                log.warn(`Error uploading file:`, err);
                throw new ServiceError('Error uploading file', 400);
            }

            if (!req.file) {
                log.warn(`Error uploading file`, err);
                throw new ServiceError('No file uploaded!', 400);
            }

            const assignedId = req.params.assignedId;

            if (!assignedId) {
                log.warn(`AssignedId not provided for pdf upload request`, err);
                throw new ServiceError('No assignedId provided!', 400);
            }

            const actlog = await getActLog(assignedId);

            if (!actlog) {
                log.warn(`Actlog not found for assignedId:[${assignedId}]`, err);
                throw new ServiceError('Actlog not found!', 404);
            }

            // Upload here
            const fileName = `${assignedId}.pdf`;
            const path = `actlogs/pdf/${fileName}`;

            try {
                await upload(req.file.buffer, path, req.file.mimetype);
            } catch (error) {
                log.warn(`Error uploading file to bucket:`, error);
                throw new Error('Error uploading file to bucket');
            }

            res.status(200).send("File uploaded successfully!");
        });
    } catch (e) {
        next(e)
    }
}

export {
    uploadActlogPdf
}