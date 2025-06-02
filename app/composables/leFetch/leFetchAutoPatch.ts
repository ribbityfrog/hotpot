
const apContents: Record<string, ToasterContent> = {
    default: {
        title: 'Updated',
        description: 'The item has been updated successfuly'
    },
    '/admin/users/update': {
        title: 'User updated',
        description: 'The user has been updated.'
    }
}

export function leFetchAutoPatch(endpoint: string, params: Record<string, Basic> & { id: Alphanum }) {
    leFetch.patch(endpoint, params, {
        success: [() => toaster.success(apContents?.[endpoint] ?? apContents.default!)],
        fail: [() => toaster.error(toasterContents.internalError)]
    })
}
