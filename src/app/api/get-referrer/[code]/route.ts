import { NextResponse } from 'next/server';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    // Suche Referrer in Firebase
    const q = query(
      collection(db, 'referrers'), 
      where('referralCode', '==', code),
      where('isActive', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: 'Referrer not found' },
        { status: 404 }
      );
    }

    const referrerDoc = querySnapshot.docs[0];
    const referrer = {
      id: referrerDoc.id,
      ...referrerDoc.data()
    };

    return NextResponse.json({ 
      success: true, 
      referrer 
    });
  } catch (error) {
    console.error('Error finding referrer:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
} 