'use client';

import React, { useState, useRef } from 'react';
import axios from 'axios';
import useToastStore from '@/app/store/toast';

import AddrSearchSkeleton from './AddrSearchSkeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faMapLocationDot, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface KakaoAddrSearchFormInterface {
    selectedColor: string;
    handleSetKoreaAddr: (y: string, x: string, place_name: string, road_address_name: string, address_name: string) => void;
}

interface KaKaoSearchedAddrInterface {
    address_name: string;
    category_group_code: string;
    category_group_name: string;
    category_name: string;
    distance: string;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: string;
    y: string;
}

const KakaoAddrSearchForm: React.FC<KakaoAddrSearchFormInterface> = ({ selectedColor, handleSetKoreaAddr }) => {
    const [searchedAddr, setSearchedAddr] = useState<Array<KaKaoSearchedAddrInterface>>([]);
    const [isSearchEnd, setIsSearchEnd] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const { showToast } = useToastStore()

    const searchAddr = async () => {
        const searchKeyword = (searchInputRef.current as HTMLInputElement).value;

        if (!searchKeyword.trim()) {
            showToast('검색어를 입력해주세요.', { type: 'error' });
            return;
        }

        setSearchedAddr([]);
        setIsSearchEnd(false);
        setIsLoading(true);

        if (!(searchInputRef.current as HTMLInputElement).value) {
            return;
        }

        try {
            const addrSearchResponse = await axios.get(`/api/kakao-api?searchKeyword=${searchKeyword}`);

            if (addrSearchResponse.status === 200) {
                setSearchedAddr(addrSearchResponse.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('AxiosError: ', error.response?.data.error, error.response?.status);
            }
        } finally {
            setIsSearchEnd(true);
            setIsLoading(false);
        }
    };

    const handleOnEnter = (key: React.KeyboardEvent<HTMLInputElement>) => {
        if (key.key === 'Enter' || key.code === 'Enter') {
            searchInputRef.current?.blur();
            searchAddr();
        }
    };

    return (
        <div className="w-full h-80 p-2">
            <div className="w-full h-10 border rounded flex items-center">
                <input
                    type="text"
                    placeholder="장소를 검색하세요."
                    style={{
                        padding: "4px",
                        width: "calc(100% - 28px)",
                        outline: "none"
                    }}
                    ref={searchInputRef}
                    onKeyUp={(e) => handleOnEnter(e)}
                />
                <button className="w-6" onClick={searchAddr}>
                    <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} style={{ color: "rgb(166 167 169)" }} />
                </button>
            </div>
            <div className="w-full my-2 overflow-y-auto" style={{ height: "calc(100% - 3.5rem)" }}>
                {
                    searchedAddr.length === 0 && !isSearchEnd && !isLoading &&
                    <div className="w-full h-full flex justify-center items-center">
                        <FontAwesomeIcon icon={faMapLocationDot as IconProp} style={{ color: "rgb(220 223 228)", fontSize: "40px" }} />
                    </div>
                }
                {
                    searchedAddr.length === 0 && isSearchEnd && !isLoading &&
                    <div className="w-full h-full flex justify-center items-center">검색 결과가 없습니다.</div>
                }
                {
                    searchedAddr.length > 0 && isSearchEnd && !isLoading &&
                    <ul>
                        {searchedAddr.map((l) => (
                            <li key={l.id} className="p-2 border-b cursor-pointer hover:bg-stone-100" onClick={() => handleSetKoreaAddr(l.y, l.x, l.place_name, l.road_address_name, l.address_name)}>
                                <p className="text-xs pb-1">{l.address_name}</p>
                                <p className="text-xs pb-1">{l.road_address_name}</p>
                                <p className="text-sm"><FontAwesomeIcon icon={faLocationDot as IconProp} style={{ color: selectedColor }} />{` ${l.place_name}`}</p>
                            </li>
                        ))}
                    </ul>
                }
                {
                    isLoading &&
                    <AddrSearchSkeleton />
                }
            </div>
        </div>
    )
}

export default KakaoAddrSearchForm;