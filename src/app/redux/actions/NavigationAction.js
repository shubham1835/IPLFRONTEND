export const SET_USER_NAVIGATION = 'SET_USER_NAVIGATION'

const getfilteredNavigations = (navList = [], role) => {
    console.log('[Role]' + role)
    return navList.reduce((array, nav) => {
        if (nav.auth) {
            if (nav.auth.includes(role)) {
                array.push(nav)
            }
        } else {
            if (nav.children) {
                nav.children = getfilteredNavigations(nav.children, role)
                array.push(nav)
            } else {
                array.push(nav)
            }
        }
        return array
    }, [])
}

export const getNavigationByUser = (navigationState) => (dispatch) => {
    console.log('[Here it reached]' + JSON.stringify(navigationState))
    let { user, navigations = [] } = navigationState
    // const navigations = []
    let filteredNavigations = getfilteredNavigations(navigations, user.role)
    console.log('[Role]' + user.role)
    console.log('[filteredNavigations]' + JSON.stringify(filteredNavigations))
    dispatch({
        type: SET_USER_NAVIGATION,
        payload: [...filteredNavigations],
    })
}
