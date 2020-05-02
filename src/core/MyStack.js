import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from "../screens/Auth/Auth";
import SharePlaceScreen from "../screens/SharePlace/SharePlace";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="mobile_client_rel.AuthScreen"
                    component={AuthScreen}
                    options={{title: 'AuthScreen'}}
                />
                <Stack.Screen
                    name="mobile_client_rel.SharePlaceScreen"
                    component={SharePlaceScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
