import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from "../screens/Auth/Auth";
import HomeScreen from "../screens/Home/HomeScreen";

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
                    name="mobile_client_rel.HomeScreen"
                    component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
