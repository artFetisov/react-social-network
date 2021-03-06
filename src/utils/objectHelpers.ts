export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {
    // @ts-ignore
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return { ...u, ...newObjProps }
        }
        return u;
    });
}


