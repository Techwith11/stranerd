let intendedRoute = undefined as string | undefined

export const saveIntendedRoute = (route: string) => intendedRoute = route

export const getIntendedRoute = () => {
	const route = intendedRoute
	intendedRoute = undefined
	return route
}

const cachedScrolls :{ [page: string] : number }  = {}

export const addToCachedScrolls = (page: string, position: number) => cachedScrolls[page] = position

export const getCachedScroll = (page: string) => cachedScrolls[page] ?? 0
