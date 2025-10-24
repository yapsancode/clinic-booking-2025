// src/app/api/google-reviews/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    // console.log('=== API Route Debug ===');
    // console.log('Place ID exists:', !!placeId);
    // console.log('API Key exists:', !!apiKey);
    // console.log(process.env)

    if (!placeId || !apiKey) {
      console.error('Missing environment variables!');
      return NextResponse.json(
        { 
          error: 'Missing configuration',
          hasPlaceId: !!placeId,
          hasApiKey: !!apiKey 
        },
        { status: 500 }
      );
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${apiKey}`;
    console.log('Fetching from Google Places API...');

    const response = await fetch(url);

    if (!response.ok) {
      console.error('Google API fetch failed:', response.status);
      throw new Error('Failed to fetch from Google Places API');
    }

    const data = await response.json();
    console.log('Google API response status:', data.status);

    if (data.status !== 'OK') {
      console.error('Google API error:', data);
      throw new Error(`Google Places API error: ${data.status}`);
    }

    console.log('Successfully fetched reviews!');
    return NextResponse.json(data.result);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// Add a simple test endpoint
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}