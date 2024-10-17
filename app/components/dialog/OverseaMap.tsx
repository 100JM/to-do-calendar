'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import LeafMapChangeView from './LeafMapChangeView';

const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);

interface OverseaMapInterface {
    mapCenter: {
        lat: number
        lng: number
    };
}

const OverseaMap: React.FC<OverseaMapInterface> = ({ mapCenter }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const loadLeaflet = async () => {
            const leafletModule = await import('leaflet');
            
            // Leaflet 관련 설정
            leafletModule.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });
        };
        loadLeaflet();
    }, []);

    if (!isMounted) return null;

    return (
        <MapContainer center={[mapCenter.lat, mapCenter.lng]} zoom={16} style={{ height: '150px', width: '100%' }} attributionControl={false}>
            <LeafMapChangeView center={{lat: mapCenter.lat, lng: mapCenter.lng}}/>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[mapCenter.lat, mapCenter.lng]} />
        </MapContainer>
    );
};

export default OverseaMap;