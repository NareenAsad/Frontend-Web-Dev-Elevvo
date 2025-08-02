import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") // Changed from 'location' to 'query' to be more flexible
  const apiKey = process.env.WEATHER_API_KEY // Your API key from WeatherAPI.com

  if (!query) {
    return NextResponse.json({ error: "Query parameter (location or lat,lon) is required" }, { status: 400 })
  }

  if (!apiKey) {
    return NextResponse.json({ error: "Weather API key is not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(query)}`,
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("WeatherAPI error:", errorData)
      return NextResponse.json(
        { error: errorData.error?.message || "Failed to fetch weather data" },
        { status: response.status },
      )
    }

    const data = await response.json()
    const weatherDescription = `${data.current.condition.text}, ${data.current.temp_c}°C`
    const locationName = `${data.location.name}, ${data.location.country}` // Get actual location name

    return NextResponse.json({ weather: weatherDescription, location: locationName })
  } catch (error) {
    console.error("Error fetching weather:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
