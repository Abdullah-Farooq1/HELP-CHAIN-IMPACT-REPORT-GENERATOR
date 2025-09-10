
import { GoogleGenAI, Type } from "@google/genai";
import { ImpactReportData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const reportSchema = {
  type: Type.OBJECT,
  properties: {
    reportTitle: { type: Type.STRING, description: "A concise title for the impact report." },
    executiveSummary: { type: Type.STRING, description: "A 2-3 sentence summary of the overall impact." },
    keyMetrics: {
      type: Type.OBJECT,
      properties: {
        totalDonations: { type: Type.NUMBER, description: "Total monetary donations in USD." },
        requestsFulfilled: { type: Type.NUMBER, description: "Total number of aid requests successfully fulfilled." },
        volunteerHours: { type: Type.NUMBER, description: "Total number of hours contributed by volunteers." },
      },
      required: ["totalDonations", "requestsFulfilled", "volunteerHours"],
    },
    donationsByCategory: {
      type: Type.ARRAY,
      description: "Breakdown of donations by category.",
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          value: { type: Type.NUMBER, description: "Amount in USD" },
          unit: { type: Type.STRING, description: "Should be 'USD'" },
        },
      },
    },
    requestsByCategory: {
      type: Type.ARRAY,
      description: "Breakdown of fulfilled requests by category.",
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          value: { type: Type.NUMBER, description: "Number of requests" },
          unit: { type: Type.STRING, description: "Should be 'requests'" },
        },
      },
    },
    volunteerHoursByCategory: {
        type: Type.ARRAY,
        description: "Breakdown of volunteer hours by activity category.",
        items: {
            type: Type.OBJECT,
            properties: {
                category: { type: Type.STRING },
                value: { type: Type.NUMBER, description: "Number of hours" },
                unit: { type: Type.STRING, description: "Should be 'hours'" },
            },
        },
    },
    achievements: {
      type: Type.ARRAY,
      description: "A list of 3-5 key achievements or positive outcomes.",
      items: { type: Type.STRING },
    },
    suggestions: {
      type: Type.ARRAY,
      description: "A list of 2-3 actionable suggestions for future improvements.",
      items: { type: Type.STRING },
    },
  },
  required: ["reportTitle", "executiveSummary", "keyMetrics", "donationsByCategory", "requestsByCategory", "volunteerHoursByCategory", "achievements", "suggestions"],
};

export const generateImpactReport = async (rawData: string): Promise<ImpactReportData> => {
  const prompt = `
    Analyze the following raw operational data for our non-profit organization, HelpChain.
    The data includes information on donations, fulfilled aid requests, and volunteer activities.
    Based on this data, generate a comprehensive impact report in a structured JSON format.
    The categories are typically Food, Medicine, Shelter, Education, and other humanitarian aid.
    Infer the categories and aggregate the data accordingly.

    Raw Data:
    ---
    ${rawData}
    ---

    Please provide a complete JSON object matching the defined schema. Ensure all fields are populated with sensible data derived from the input.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reportSchema,
      },
    });

    const jsonText = response.text.trim();
    const reportData = JSON.parse(jsonText);

    // Basic validation
    if (!reportData.reportTitle || !reportData.keyMetrics) {
      throw new Error("Generated report is missing required fields.");
    }

    return reportData as ImpactReportData;
  } catch (error) {
    console.error("Error generating impact report:", error);
    throw new Error("Failed to generate report from Gemini API. Please check the console for details.");
  }
};
