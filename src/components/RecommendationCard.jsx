import './RecommendationCard.css';

export default function RecommendationCard({ data }) {
  if (!data) return null;

  const { location, weather, places, recommendation } = data;

  return (
    <div className="glass-panel recommendation-card">
      <div className="card-header">
        <h2>Results for {location}</h2>
      </div>
      
      <div className="weather-section">
        <div className="weather-item">
          <span className="weather-label">Weather:</span>
          <span className="weather-value capitalize">{weather?.status || 'Unknown'}</span>
        </div>
        <div className="weather-item">
          <span className="weather-label">Temperature:</span>
          <span className="weather-value">{weather?.temperature ? `${weather.temperature}°C` : 'N/A'}</span>
        </div>
      </div>

      <div className="ai-recommendation">
        <h3>AI Recommendation</h3>
        <p className="recommendation-text">{recommendation || 'No recommendation available.'}</p>
      </div>

      {places && places.length > 0 && (
        <div className="places-section">
          <h3>Nearby Candidate Places</h3>
          <ul className="places-list">
            {places.map((place, index) => (
              <li key={index} className="place-item">{place}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
