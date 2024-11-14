import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const WeatherScreen = ({ route }) => {
  const { city } = route.params;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = '90b375c40f7c05cf097a359ed6433ae1'; 
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setError('لا يوجد نتائج لهذه المدينة، الرجاء إدخال مدينة صحيحة.');
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const currentWeather = weatherData?.list[0];
  const upcomingWeather = weatherData?.list.filter((_, index) => index % 8 === 0).slice(1, 6); 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.cityName}>{weatherData.city.name}</Text>
      <Text style={styles.currentDate}>اليوم: {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
      
      {/* Current Weather */}
      <View style={styles.currentWeatherContainer}>
        <Text style={styles.weatherDesc}>{currentWeather.weather[0].description}</Text>
        <Text style={styles.tempText}>{Math.round(currentWeather.main.temp)}°C</Text>
      </View>
      
      {/* Weather for Upcoming Days */}
      <Text style={styles.forecastTitle}>الطقس للأيام القادمة:</Text>
      {upcomingWeather.map((day, index) => (
        <View key={index} style={styles.forecastContainer}>
          <Text style={styles.forecastDate}>
            {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}
          </Text>
          <Text style={styles.forecastTemp}>درجة الحرارة: {Math.round(day.main.temp)}°C</Text>
          <Text style={styles.forecastDesc}>{day.weather[0].description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  currentDate: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  currentWeatherContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#007BFF',
    padding: 20,
    borderRadius: 10,
  },
  tempText: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weatherDesc: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  forecastTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  forecastContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#E1E8ED',
    borderRadius: 8,
  },
  forecastDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  forecastTemp: {
    fontSize: 18,
    color: '#333',
  },
  forecastDesc: {
    fontSize: 16,
    color: '#555',
  },
});

export default WeatherScreen;
