const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// راستے (Paths)
const DATA_DIR = path.join(__dirname, '..', 'data');
const META_FILE = path.join(DATA_DIR, 'meta', 'meta.json');

/**
 * 1. Get Metadata (App Info & Modules List)
 * URL: /api/meta
 */
router.get('/meta', (req, res) => {
    fs.readFile(META_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to load metadata file." });
        }
        try {
            const metaData = JSON.parse(data);
            res.json(metaData);
        } catch (parseErr) {
            res.status(500).json({ error: "Error parsing meta.json file." });
        }
    });
});

/**
 * 2. Get Module Data Dynamic
 * URL: /api/module/:moduleId
 * Example: /api/module/durood
 */
router.get('/module/:moduleId', (req, res) => {
    const moduleId = req.params.moduleId;

    // پہلے میٹا فائل پڑھیں تاکہ فائل کا نام معلوم ہو سکے
    fs.readFile(META_FILE, 'utf8', (err, metaDataStr) => {
        if (err) {
            return res.status(500).json({ error: "Failed to load meta data." });
        }

        try {
            const metaData = JSON.parse(metaDataStr);
            // مطلوبہ ماڈیول تلاش کریں
            const moduleInfo = metaData.modules.find(m => m.id === moduleId);

            if (!moduleInfo) {
                return res.status(404).json({ error: `Module with ID '${moduleId}' not found.` });
            }

            // ماڈیول کی مخصوص فائل کا راستہ
            const moduleFilePath = path.join(DATA_DIR, moduleInfo.file);

            // فائل پڑھیں
            fs.readFile(moduleFilePath, 'utf8', (fileErr, moduleDataStr) => {
                if (fileErr) {
                    return res.status(500).json({ error: `Failed to read data file: ${moduleInfo.file}` });
                }
                
                const moduleData = JSON.parse(moduleDataStr);
                res.json(moduleData);
            });

        } catch (parseErr) {
            res.status(500).json({ error: "Internal Server Error while parsing data." });
        }
    });
});

/**
 * 3. Get Specific Chapter from a Module
 * URL: /api/module/:moduleId/chapter/:chapterId
 * Example: /api/module/durood/chapter/1
 */
router.get('/module/:moduleId/chapter/:chapterId', (req, res) => {
    const { moduleId, chapterId } = req.params;

    fs.readFile(META_FILE, 'utf8', (err, metaDataStr) => {
        if (err) return res.status(500).json({ error: "Failed to load meta data." });

        try {
            const metaData = JSON.parse(metaDataStr);
            const moduleInfo = metaData.modules.find(m => m.id === moduleId);

            if (!moduleInfo) return res.status(404).json({ error: "Module not found." });

            const moduleFilePath = path.join(DATA_DIR, moduleInfo.file);

            fs.readFile(moduleFilePath, 'utf8', (fileErr, moduleDataStr) => {
                if (fileErr) return res.status(500).json({ error: "Failed to read module file." });

                const moduleData = JSON.parse(moduleDataStr);
                const chapter = moduleData.chapters.find(c => c.chapter_id === parseInt(chapterId));

                if (!chapter) {
                    return res.status(404).json({ error: `Chapter ${chapterId} not found in this module.` });
                }

                res.json({
                    module_title: moduleData.title,
                    language: moduleData.language,
                    chapter: chapter
                });
            });

        } catch (parseErr) {
            res.status(500).json({ error: "Error processing request." });
        }
    });
});

module.exports = router;