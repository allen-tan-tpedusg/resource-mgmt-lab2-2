const fs = require('fs').promises;
const path = require('path');

const RESOURCES_FILE = path.join('utils', 'resources.json');

async function deleteResource(req, res) {
  try {
    const { id } = req.params;
    
    let resources = [];
    try {
      // Read the existing resources from the file
      const data = await fs.readFile(RESOURCES_FILE, 'utf8');
      resources = JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({ message: 'No resources found to delete.' });
      } else {
        throw err;
      }
    }

    // Find the resource index by ID
    const resourceIndex = resources.findIndex(r => r.id == id);
    if (resourceIndex === -1) {
      return res.status(404).json({ message: 'Resource not found.' });
    }

    // Delete the resource and store the deleted resource for response
    const deletedResource = resources.splice(resourceIndex, 1)[0];

    // Write the updated resources back to the file
    await fs.writeFile(RESOURCES_FILE, JSON.stringify(resources, null, 2), 'utf8');

    // Send success response with a message
    return res.status(200).json({ message: 'Resource deleted successfully!' });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { deleteResource };