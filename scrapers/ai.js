const axios = require("axios");

exports.itzpireGPT = async (q, username) => {
  try {
    const response = await axios.post("https://api.itzpire.com/gpt-endpoint", { // Ubah ke URL API Itzpire
      prompt: q, // Sesuaikan dengan parameter yang diminta oleh API Itzpire
      user: username, // Jika username diperlukan, tambahkan atau sesuaikan.
    });
    return response.data.response; // Sesuaikan dengan struktur response dari Itzpire API
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};