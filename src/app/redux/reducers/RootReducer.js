import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import EcommerceReducer from './EcommerceReducer'
import NavigationReducer from './NavigationReducer'
import FormActionReducer from './FormActionReducer'
import ServiceReducer from './ServiceReducer'
import UserActionReducer from './UserActionReducer'
import ConfigReducer from './ConfigReducer'
import BidReducer from './BidReducer'
import IPLReducer from './IPLReducer'

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    scrumboard: ScrumBoardReducer,
    configReducer: ConfigReducer,
    ecommerce: EcommerceReducer,
    services: ServiceReducer,
    formActionReducer: FormActionReducer,
    userReducer: UserActionReducer,
    bidReducer: BidReducer,
    iPLReducer: IPLReducer
})

export default RootReducer
