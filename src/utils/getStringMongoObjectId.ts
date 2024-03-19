export const getStringMongoObjectId = (objectId: any): string => {
    return objectId?.$oid || objectId?.toString() || '';
}

export default getStringMongoObjectId;