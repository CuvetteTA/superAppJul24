import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NYTAPIKEY, OPENWEATHERMAP_KEY } from "../secrets";
import styles from "./dashboard.module.css";

const DashboardPage = () => {
  const navigate = useNavigate();

  // User State
  const [user, setUser] = useState({
    name: "Not logged in",
    username: "guest",
    email: "guest@example.com",
    mobile: "",
    shareData: false,
    categories: ["Horror", "Thriller", "Action"],
  });

  // Weather State
  const [weather, setWeather] = useState(null);
  const [weatherDate, setWeatherDate] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // News State
  const [news, setNews] = useState({});
  const [newsLoading, setNewsLoading] = useState(true);

  // Timer State
  const [timerTime, setTimerTime] = useState({
    hours: 0,
    minutes: 1,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Refs related to the timer
  const totalTime = useRef(0);
  const timerRef = useRef(null);

  // handle the logout functionality
  const signOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Navigate Away to the next page
  const browseEntertainment = () => {
    navigate("/entertainment");
  };

  // Data fetching for weather

  // Data fetchign for news articles
  const fetchNewsData = async () => {
    try {
      const response = await fetch(
        `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${NYTAPIKEY}`
      );
      const data = await response.json();
      setNews(data.results[0]);
    } catch (error) {
      console.error("Error fetching news data", error);
    } finally {
      setNewsLoading(false);
    }
  };

  // get my current location
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  // fetchign put weather data
  const fetchWeatherData = async () => {
    try {
      const position = await getCurrentPosition(); // get the current position

      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHERMAP_KEY}`
      );

      const data = await response.json();
      setWeather(data);
      setWeatherDate(new Date(data.dt * 1000));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    totalTime.current =
      timerTime.hours * 3600 + timerTime.minutes * 60 + timerTime.seconds;
  }, [timerTime]);

  useEffect(() => {
    // if it is running
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevElapsed) => {
          if (prevElapsed >= totalTime.current) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return totalTime.current;
          }
          return prevElapsed + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current); 
    }

    return () => clearInterval(timerRef.current);
    // else clear the prev interval if any
  }, [isRunning]);

  // First Find the user in your loacal storage, if  it is present set the sate, else navigate to login page
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      setUser(JSON.parse(user));
    } else {
      navigate("/login");
    }
  }, []);

  return <div>dashboard</div>;
};

export default DashboardPage;
