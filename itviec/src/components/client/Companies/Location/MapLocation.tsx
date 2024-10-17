import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 21.028511, // Vĩ độ của vị trí
  lng: 105.804817 // Kinh độ của vị trí
};

const MapLocation = () => {
  return (
    <LoadScript googleMapsApiKey='https://www.google.com/maps/place/tt.+C%C3%A2y+D%C6%B0%C6%A1ng,+Ph%E1%BB%A5ng+Hi%E1%BB%87p,+H%E1%BA%ADu+Giang,+Vi%E1%BB%87t+Nam/@9.7833698,105.7105776,14z/data=!3m1!4b1!4m6!3m5!1s0x31a0f68a0a8c781d:0xa88c255d7d2648f0!8m2!3d9.7807875!4d105.7292491!16s%2Fg%2F11fmqk53bz?hl=vi-VN&entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
            draggable: false
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapLocation;
