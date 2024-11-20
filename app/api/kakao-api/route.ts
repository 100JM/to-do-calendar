import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest): Promise<NextResponse> {
    const searchKeyword = request.nextUrl.searchParams.get('searchKeyword');

    if (!searchKeyword) {
        return NextResponse.json({ error: 'searchKeyword is required' }, { status: 400 });
    }

    try {
        const keywordResponse = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
            params: {
                query: searchKeyword,
            },
            headers: {
                Authorization: `KakaoAK ${process.env.NEXT_KAKAO_REST_API_KEY}`,
            }
        });

        return NextResponse.json(keywordResponse.data.documents);
    } catch (error) {
        console.error('kakao search api error: ', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
};