import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest): NextResponse {
    if (request.method === 'GET') {
        const apiKey = process.env.NEXT_KAKAO_MAP_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'Kakao Map key is not found' }, { status: 500 });
        } else {
            return NextResponse.json(apiKey);
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 400 });
    }
}