const axios = require("axios");

exports.gptItzpire = async (q) => {
  try {
    const response = await axios.get("https://itzpire.com/ai/gpt", {
      params: {
        model: "gpt-4",
        q: q
      },
      headers: {
        accept: "application/json"
      }
    });
    return response.data.data.response; // Mengambil respons dari Itzpire
  } catch (error) {
    console.error("Error fetching GPT response from Itzpire:", error);
    throw error;
  }
};

exports.gptWidipe = async (text) => {
  try {
    const response = await axios.get("https://widipe.com/openai", {
      params: { text: text },
      headers: { accept: "application/json" }
    });
    return {
      status: response.data.status,
      creator: response.data.creator,
      result: response.data.result
    }; // Mengambil respons dari Widipe
  } catch (error) {
    console.error("Error fetching GPT response from Widipe:", error);
    throw error;
  }
};
