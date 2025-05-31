import { NextResponse } from 'next/server';
import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: Request) {
  try {
    const { referralCode } = await request.json();

    // Finde den Referrer anhand des Codes
    const q = query(
      collection(db, 'referrers'), 
      where('referralCode', '==', referralCode),
      where('isActive', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const referrerDoc = querySnapshot.docs[0];
      
      // Erhöhe den Visit-Counter
      await updateDoc(doc(db, 'referrers', referrerDoc.id), {
        visitCount: increment(1),
        lastVisit: new Date()
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking visit:', error);
    return NextResponse.json(
      { error: 'Failed to track visit' },
      { status: 500 }
    );
  }
} 