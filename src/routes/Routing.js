import React  from "react";

import {ProtectedRoutedNaviagtion} from './ProtectedRoute'
import { PublicRoutes } from './PublicRoute';

export const Routing = () => {
    return (
        <>
            <PublicRoutes/>
            <ProtectedRoutedNaviagtion/>
        </>
    )
}