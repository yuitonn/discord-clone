import React from 'react'
import { useState, useEffect } from 'react';
import { DocumentData, Query, collection, query } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface channels {
    id: string;
    channel: DocumentData;
};

export const useCollection = (data: string) => {
    const [documents, setDocuments]=useState<channels[]>([]);
    
    const collectionRef: Query<DocumentData> = query(collection(db, data));
    useEffect(() => {
        onSnapshot(collectionRef, (querySnapshot) => {
            const channelsResults: channels[] = [];
            querySnapshot.docs.forEach((doc) => 
                channelsResults.push({
                    id: doc.id,
                    channel: doc.data(),
            })
        );
        setDocuments(channelsResults);
        });
    }, []);
    return { documents };
}
