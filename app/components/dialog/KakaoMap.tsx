import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'
// import { useEffect, useState } from 'react';
// import axios from 'axios'

interface KakaoMapInterface {
    mapCenter: {
        lat: number
        lng: number
    };
}

const KakaoMap: React.FC<KakaoMapInterface> = ({ mapCenter }) => {
    // const [apiKey, setApiKey] = useState<string | null>(null);

    // useEffect(() => {
    //     const getKakaoMapApikey = async () => {    
    //         try {
    //             const apiKeyResponse = await axios.get('/api/kakao-map-key');
    //             console.log(apiKeyResponse.data);
    //             setApiKey(apiKeyResponse.data);
    //         } catch(error) {
    //             console.log('Kakao Map error: ', error);
    //         }
    //     };

    //     getKakaoMapApikey();
    // }, []);

    const { loading, error } = useKakaoLoader({
        appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || '',
        libraries: ['services'],
    }) as unknown as { loading: boolean; error: ErrorEvent | undefined };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading map: {error.message}</div>;

    return (
        <Map
            center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
            style={{ height: '150px' }}
            level={5}
            draggable={true}
        >
            <MapMarker position={{ lat: mapCenter.lat, lng: mapCenter.lng }} />
        </Map>
    )
}

export default KakaoMap;