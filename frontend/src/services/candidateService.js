import { initialCandidates } from '../data/mockData';

const STORAGE_KEY = 'nexushire_candidates';

/**
 * Initialize localStorage with default data if empty
 */
const initializeStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCandidates));
  }
};

/**
 * Get all candidates from localStorage
 * @returns {Promise<Array>} Array of candidate objects
 */
export const getCandidates = async () => {
  // Simulate API delay for realistic behavior
  await new Promise(resolve => setTimeout(resolve, 300));
  
  initializeStorage();
  const stored = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(stored);
};

/**
 * Create a new candidate
 * @param {Object} candidateData - Candidate data without ID
 * @returns {Promise<Object>} Created candidate with ID
 */
export const createCandidate = async (candidateData) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const candidates = await getCandidates();
  
  // Generate unique ID
  const newCandidate = {
    ...candidateData,
    id: Date.now().toString(),
    created_at: new Date().toISOString()
  };
  
  candidates.push(newCandidate);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
  
  return newCandidate;
};

/**
 * Update an existing candidate
 * @param {string} id - Candidate ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated candidate
 */
export const updateCandidate = async (id, updateData) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const candidates = await getCandidates();
  const index = candidates.findIndex(c => c.id === id);
  
  if (index === -1) {
    throw new Error('Candidate not found');
  }
  
  candidates[index] = {
    ...candidates[index],
    ...updateData
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
  
  return candidates[index];
};

/**
 * Delete a candidate
 * @param {string} id - Candidate ID
 * @returns {Promise<Object>} Success message
 */
export const deleteCandidate = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const candidates = await getCandidates();
  const filtered = candidates.filter(c => c.id !== id);
  
  if (filtered.length === candidates.length) {
    throw new Error('Candidate not found');
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  
  return { message: 'Candidate deleted successfully' };
};
