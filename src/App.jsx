import { useState } from 'react';
import './App.css';
import { fetchRecommendation } from './api';
import RecommendationCard from './components/RecommendationCard';

function App() {
  const [location, setLocation] = useState('');
  const [activityType, setActivityType] = useState('restaurant');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await fetchRecommendation(location, activityType);
      setResult(data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="hero animate-fade-in">
        <h1>Weather<span>Go</span></h1>
        <p>AI-powered personalized local activity recommendations based on real-time weather.</p>
      </header>

      <main className="main-content">
        <div className="glass-panel form-container animate-fade-in delay-100">
          <form onSubmit={handleSubmit} className="search-form">
            <div className="form-group">
              <label htmlFor="location">Where are you?</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. London, Tokyo, Central Park"
                autoComplete="off"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="activityType">What do you want to do?</label>
              <select 
                id="activityType" 
                value={activityType} 
                onChange={(e) => setActivityType(e.target.value)}
              >
                <option value="restaurant">Dining / Restaurant</option>
                <option value="cafe">Cafe</option>
                <option value="park">Park / Outdoors</option>
                <option value="museum">Museum</option>
                <option value="cinema">Cinema</option>
                <option value="shopping">Shopping</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className={`submit-btn ${loading ? 'loading' : ''}`}>
              {loading ? (
                <span className="spinner"></span>
              ) : (
                'Get Recommendations'
              )}
            </button>
          </form>

          {error && (
            <div className="error-message animate-fade-in">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {error}
            </div>
          )}
        </div>

        {result && !loading && (
          <div className="animate-fade-in delay-200 result-wrapper">
            <RecommendationCard data={result} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
