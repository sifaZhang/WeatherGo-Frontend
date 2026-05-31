const API_BASE_URL = '';

export async function fetchRecommendation(location, activityType) {
  try {
    const response = await fetch(`${API_BASE_URL}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: location,
        activity_type: activityType,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error((errorData && errorData.error) || `Backend error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchRecommendation Error:", error);
    throw error;
  }
}
