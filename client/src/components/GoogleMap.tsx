import { useEffect, useRef, useState } from 'react';

interface GoogleMapProps {
  apiKey: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  className?: string;
  address?: string;
  companyName?: string;
}

export default function GoogleMap({ 
  apiKey, 
  center, 
  zoom = 15, 
  className = '', 
  address = '',
  companyName = 'DOMREALCE'
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if ((window as any).google && (window as any).google.maps) {
      initializeMap();
      return;
    }

    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsLoaded(true);
      initializeMap();
    };
    
    script.onerror = () => {
      setError('Erro ao carregar o Google Maps');
    };
    
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [apiKey, center.lat, center.lng, zoom]);

  const initializeMap = () => {
    if (!mapRef.current || !(window as any).google) return;

    try {
      const map = new (window as any).google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{ "color": "#212121" }]
          },
          {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#757575" }]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#212121" }]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{ "color": "#212121" }]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{ "color": "#181818" }]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#2c2c2c" }]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#8a8a8a" }]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{ "color": "#373737" }]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{ "color": "#3c3c3c" }]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [{ "color": "#4e4e4e" }]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#616161" }]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#757575" }]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{ "color": "#000000" }]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#3d3d3d" }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'cooperative'
      });

      // Add custom marker
      const marker = new (window as any).google.maps.Marker({
        position: center,
        map: map,
        title: companyName,
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          fillColor: '#FFD700',
          fillOpacity: 1,
          strokeColor: '#FF6B35',
          strokeWeight: 3,
          scale: 12
        }
      });

      // Add info window
      const infoWindow = new (window as any).google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; color: #333; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #FFD700; font-size: 16px;">${companyName}</h3>
            <p style="margin: 0; font-size: 14px; line-height: 1.4;">
              ${address}<br>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}" 
                 target="_blank" 
                 style="color: #00d4aa; text-decoration: none; font-weight: bold;">
                🗺️ Ver direções
              </a>
            </p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      // Open info window by default
      infoWindow.open(map, marker);

    } catch (err) {
      setError('Erro ao inicializar o mapa');
      console.error('Google Maps error:', err);
    }
  };

  if (error) {
    return (
      <div className={`bg-gray-900 rounded-lg border-2 border-red-500/30 p-8 ${className}`}>
        <div className="text-center text-red-400">
          <p className="text-lg font-semibold mb-2">❌ {error}</p>
          <p className="text-sm">Por favor, tente recarregar a página</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-lg overflow-hidden border-2 border-brand-yellow/30 ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-center text-brand-yellow">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mx-auto mb-4"></div>
            <p>A carregar mapa...</p>
          </div>
        </div>
      )}
    </div>
  );
}