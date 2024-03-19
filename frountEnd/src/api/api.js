// api.js

const apiUrl = 'http://hitprojback.hasthiya.org/api/HIT';

// Function to update project by ID
export const updateProjectById = async (projectId, description, startDate, endDate) => {
  try {
    const response = await fetch(`${apiUrl}/updateProjectById/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description, start_date: startDate, end_date: endDate })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Function to add project data
export const addProjectData = async (description, startDate, endDate) => {
  try {
    const response = await fetch(`${apiUrl}/project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description, start_date: startDate, end_date: endDate })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

// Function to get all projects
export const getAllProjects = async () => {
  try {
    const response = await fetch(`${apiUrl}/allProjects`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting all projects:', error);
    throw error;
  }
};

// Function to delete project by ID
export const deleteProjectById = async (projectId) => {
  try {
    const response = await fetch(`${apiUrl}/deleteProjectById/${projectId}`, {
      method: 'DELETE'
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
