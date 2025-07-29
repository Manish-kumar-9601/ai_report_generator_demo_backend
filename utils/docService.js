import DocFile from "../models/docFile.model.js";


async function createDocFile(title, size, file_data, file, uploadedBy) {
  try {
    await DocFile.sync({ alter: true }); // Alters table to match model

    const doc = await DocFile.create({
      title,
      size,
      file_data,
      file,
      uploadedBy,
    });
    return doc.id;
  } catch (err) {
    console.error("Insert failed:", err.message);
    throw err;
  }
}

async function findDocFileById(id) {
  try {
    const doc = await DocFile.findByPk(id);
    return doc;
  } catch (err) {
    console.error("Fetch failed:", err.message);
    throw err;
  }
}

export  { createDocFile, findDocFileById };
