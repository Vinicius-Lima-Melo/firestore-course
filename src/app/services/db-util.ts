export function convertSnaps<T>(snaps){
    return snaps.map(snap =>{
        return <unknown> {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as {}
        }
    })
} 